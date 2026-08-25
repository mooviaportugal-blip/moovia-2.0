#!/usr/bin/env python3
"""
Extract every visible Portuguese string from the public site source and
regenerate src/i18n/dict.auto.ts (PT -> EN).

Pipeline:
  1. Walk src/routes (public routes only) + src/components (site sections).
  2. Collect JSX text nodes and string literals that look like human copy.
  3. Translate PT -> EN via DeepL with the MOOVIA brand glossary.
  4. Run a native-fluency review pass over the DeepL output using the
     Lovable AI Gateway (brand glossary enforced, no acronyms).
  5. Write src/i18n/dict.auto.ts.

Env: DEEPL_API_KEY, DEEPL_GLOSSARY_ID_PT_EN (optional), LOVABLE_API_KEY.
Usage: python scripts/extract-i18n.py
"""
from __future__ import annotations

import json
import os
import re
import sys
from pathlib import Path

import requests

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / "src"
OUT = SRC / "i18n" / "dict.auto.ts"

SKIP_DIRS = {"integrations", "i18n"}
SKIP_FILE_PAT = re.compile(r"(admin|__root|api|routeTree|\.gen\.)")

PT_HINT = re.compile(
    r"[ãõáéíóúâêôàçÃÕÁÉÍÓÚÂÊÔÀÇ]"
    r"|\b(o|a|os|as|de|da|do|das|dos|para|com|que|não|uma|um|é|são|no|na|se|por|mais|sua|seu|nos|ao|à|e)\b",
    re.IGNORECASE,
)
# things that are clearly code, not copy
CODE_LIKE = re.compile(
    r"^(#|/|\.|https?:|mailto:|tel:|data:)"
    r"|@|[{}<>$=|\\]|\bconst\b|\breturn\b|=>|&&|\|\|"
    r"|\bclassName\b|--[a-z]|\bpx\b|\.current\b"
)
# tailwind / css utility detection
TAILWIND = re.compile(
    r"(^|\s)(hover|focus|group|active|disabled|peer|dark|sm|md|lg|xl|2xl|data)[-:]"
    r"|(^|\s)(bg|text|border|flex|grid|w|h|p|m|px|py|pt|pb|pl|pr|mx|my|mt|mb|ml|mr|gap|max|min|"
    r"absolute|relative|fixed|sticky|opacity|rounded|transition|font|tracking|leading|uppercase|"
    r"lowercase|capitalize|items|justify|self|space|shrink|grow|z|top|left|right|bottom|object|"
    r"overflow|inline|block|hidden|whitespace|cursor|select|shadow|ring|order|col|row|aspect|"
    r"backdrop|animate|duration|ease|delay|scale|translate|rotate|origin|list|underline|antialiased)-"
)

STR_LIT = re.compile(r'"((?:[^"\\\n]|\\.){2,400})"' r"|'((?:[^'\\\n]|\\.){2,400})'")
JSX_TEXT = re.compile(r">([^<>{}\n][^<>{}]{1,400})<")


def is_copy(s: str) -> bool:
    s = s.strip()
    if len(s) < 2 or len(s) > 400:
        return False
    if CODE_LIKE.search(s) or TAILWIND.search(s):
        return False
    if re.fullmatch(r"[a-z0-9 _.:%/\[\]#-]+", s):
        return False
    if re.fullmatch(r"[MmLlHhVvCcSsQqTtAaZz0-9\s,.-]+", s):  # svg path data
        return False
    if re.search(r"(gradient|rgba?|calc|url|var)\(|React\.|\bprops\b", s):
        return False
    if not re.search(r"[A-Za-zÀ-ÿ]", s):
        return False
    if not PT_HINT.search(s) and len(s.split()) < 2:
        return False
    return True


def collect() -> list[str]:
    found: list[str] = []
    seen: set[str] = set()
    for path in sorted(SRC.rglob("*.tsx")):
        rel = path.relative_to(SRC).as_posix()
        if any(part in SKIP_DIRS for part in path.relative_to(SRC).parts[:-1]):
            continue
        if SKIP_FILE_PAT.search(rel):
            continue
        text = path.read_text(encoding="utf-8")
        text = re.sub(r"^\s*import .*$", "", text, flags=re.MULTILINE)
        cands = []
        for m in STR_LIT.finditer(text):
            cands.append(m.group(1) or m.group(2) or "")
        for m in JSX_TEXT.finditer(text):
            cands.append(m.group(1))
        for c in cands:
            c = re.sub(r"\s+", " ", c).strip()
            c = c.replace('\\"', '"').replace("\\'", "'")
            if is_copy(c) and c not in seen:
                seen.add(c)
                found.append(c)
    return found


BRAND_TERMS = [
    "MOOVIA",
    "MAIA",
    "Global Mobility Assurance",
    "Human Mobility Assurance",
    "Global Mobility Success",
    "Global Mobility Strategy",
    "Human Mobility Risk",
    "Human Mobility Assessment",
    "Risk Intelligence",
    "Revenue Assurance",
    "Mission Readiness Index",
    "Strategic Assessment",
    "Trusted Partners",
    "Framework Owner",
    "Lead Strategist",
]

DEEPL_KEY = os.environ.get("DEEPL_API_KEY", "")
GLOSSARY = os.environ.get("DEEPL_GLOSSARY_ID_PT_EN", "")
DEEPL_HOST = (
    "https://api-free.deepl.com" if DEEPL_KEY.endswith(":fx") else "https://api.deepl.com"
)


def deepl(batch: list[str]) -> list[str]:
    if not DEEPL_KEY:
        raise SystemExit("DEEPL_API_KEY missing")
    data = [("text", t) for t in batch]
    data += [("source_lang", "PT"), ("target_lang", "EN-GB"), ("preserve_formatting", "1")]
    if GLOSSARY:
        data.append(("glossary_id", GLOSSARY))
    r = requests.post(
        f"{DEEPL_HOST}/v2/translate",
        headers={"Authorization": f"DeepL-Auth-Key {DEEPL_KEY}"},
        data=data,
        timeout=120,
    )
    if r.status_code != 200:
        raise SystemExit(f"DeepL {r.status_code}: {r.text[:300]}")
    return [t["text"] for t in r.json()["translations"]]


AI_URL = "https://ai.gateway.lovable.dev/v1/chat/completions"
AI_MODEL = "google/gemini-3-flash"
SYSTEM = (
    "You are a native British-English copy editor for a premium global mobility "
    "consultancy (MOOVIA). You receive a JSON array of objects {pt, en} where `en` is a "
    "raw machine translation of the Portuguese `pt`. Rewrite each `en` so it reads like it "
    "was written by a native English speaker: natural word order, idiomatic phrasing, "
    "standard HR / global mobility industry terminology. Keep the same meaning, tone "
    "(institutional, sober, no hype) and approximate length. Preserve punctuation style, "
    "leading/trailing spaces and separators such as ·.\n"
    "NEVER translate or abbreviate these brand terms, always keep them in full, never as "
    "acronyms: " + ", ".join(BRAND_TERMS) + ".\n"
    "Never introduce acronyms of any kind (no GMA, HMA, GMS, MRI).\n"
    "Return ONLY a JSON array of strings, same length and order as the input."
)


def fluency(pairs: list[tuple[str, str]]) -> list[str]:
    key = os.environ.get("LOVABLE_API_KEY")
    if not key:
        return [en for _, en in pairs]
    payload = {
        "model": AI_MODEL,
        "messages": [
            {"role": "system", "content": SYSTEM},
            {
                "role": "user",
                "content": json.dumps(
                    [{"pt": pt, "en": en} for pt, en in pairs], ensure_ascii=False
                ),
            },
        ],
    }
    r = requests.post(
        AI_URL,
        headers={"Authorization": f"Bearer {key}", "Content-Type": "application/json"},
        json=payload,
        timeout=300,
    )
    if r.status_code != 200:
        print(f"  ! AI gateway {r.status_code}, keeping DeepL output", file=sys.stderr)
        return [en for _, en in pairs]
    content = r.json()["choices"][0]["message"]["content"]
    content = re.sub(r"^```(?:json)?|```$", "", content.strip(), flags=re.MULTILINE).strip()
    try:
        out = json.loads(content)
    except json.JSONDecodeError:
        print("  ! AI returned non-JSON, keeping DeepL output", file=sys.stderr)
        return [en for _, en in pairs]
    if not isinstance(out, list) or len(out) != len(pairs):
        print("  ! AI length mismatch, keeping DeepL output", file=sys.stderr)
        return [en for _, en in pairs]
    return [str(x) for x in out]


def load_dom_strings() -> list[str]:
    """Strings captured from the rendered DOM (scripts dump), so keys match
    exactly what the runtime walker sees, including DB-driven copy."""
    path = os.environ.get("DOM_STRINGS", "/tmp/pt_strings.json")
    if not Path(path).exists():
        return []
    raw = json.loads(Path(path).read_text(encoding="utf-8"))
    out = []
    for s in raw:
        s = re.sub(r"\s+", " ", s).strip()
        if not s or len(s) > 600:
            continue
        if "@" in s or s.startswith(("http", "+351", "www.")):
            continue
        if not re.search(r"[A-Za-zÀ-ÿ]", s):
            continue
        out.append(s)
    return out


def existing_entries() -> dict[str, str]:
    if not OUT.exists():
        return {}
    found = {}
    for m in re.finditer(r'^  ("(?:[^"\\]|\\.)*"): \{ en: ("(?:[^"\\]|\\.)*") \},$', OUT.read_text(encoding="utf-8"), re.MULTILINE):
        found[json.loads(m.group(1))] = json.loads(m.group(2))
    return found


def main() -> None:
    keep = {} if "--reset" in sys.argv else existing_entries()
    strings = collect() + load_dom_strings()
    seen: set[str] = set()
    strings = [s for s in strings if not (s in seen or seen.add(s))]
    strings = [s for s in strings if s not in keep]
    print(f"extracted {len(strings)} Portuguese strings")

    translated: dict[str, str] = dict(keep)
    B = 40
    for i in range(0, len(strings), B):
        batch = strings[i : i + B]
        raw = deepl(batch)
        polished = fluency(list(zip(batch, raw)))
        for pt, en in zip(batch, polished):
            translated[pt] = en
        print(f"  {min(i + B, len(strings))}/{len(strings)}")

    lines = [
        "// AUTO-GENERATED by scripts/extract-i18n.py - do not edit by hand.",
        "// PT -> EN via DeepL (MOOVIA glossary) + native-fluency review pass.",
        "export const DICT_AUTO: Record<string, { en: string }> = {",
    ]
    for pt in sorted(translated):
        en = translated[pt]
        if not en or en == pt:
            continue
        lines.append(f"  {json.dumps(pt, ensure_ascii=False)}: {{ en: {json.dumps(en, ensure_ascii=False)} }},")
    lines.append("};\n")
    OUT.write_text("\n".join(lines), encoding="utf-8")
    print(f"wrote {OUT} ({len(translated)} entries)")


if __name__ == "__main__":
    main()
