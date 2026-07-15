import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import {
  Bold, Italic, Strikethrough, Heading2, Heading3, List, ListOrdered,
  Quote, Link as LinkIcon, Image as ImageIcon, Undo, Redo, Code,
} from "lucide-react";
import { useEffect } from "react";

interface Props {
  value: string;
  onChange: (html: string) => void;
}

export function RichEditor({ value, onChange }: Props) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({ openOnClick: false, HTMLAttributes: { class: "text-gold underline" } }),
      Image,
      Placeholder.configure({ placeholder: "Escreva o conteúdo do artigo…" }),
    ],
    content: value || "",
    editorProps: {
      attributes: {
        class:
          "prose prose-invert max-w-none font-urbanist text-white/85 leading-relaxed min-h-[400px] focus:outline-none px-6 py-6 prose-headings:font-sora prose-headings:text-white prose-a:text-gold prose-strong:text-white prose-blockquote:border-l-gold prose-blockquote:text-gold-l",
      },
    },
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
  });

  useEffect(() => {
    if (editor && value !== editor.getHTML()) {
      editor.commands.setContent(value || "", { emitUpdate: false });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, editor]);

  if (!editor) return null;

  const btn = (active: boolean) =>
    `p-2 rounded transition-colors ${active ? "bg-gold text-black" : "text-white/60 hover:text-gold hover:bg-white/5"}`;

  return (
    <div className="border border-border rounded-lg bg-black-3 overflow-hidden">
      <div className="flex flex-wrap items-center gap-1 border-b border-border bg-black-2 px-3 py-2">
        <button type="button" onClick={() => editor.chain().focus().toggleBold().run()} className={btn(editor.isActive("bold"))} title="Negrito"><Bold size={16} /></button>
        <button type="button" onClick={() => editor.chain().focus().toggleItalic().run()} className={btn(editor.isActive("italic"))} title="Itálico"><Italic size={16} /></button>
        <button type="button" onClick={() => editor.chain().focus().toggleStrike().run()} className={btn(editor.isActive("strike"))} title="Tachado"><Strikethrough size={16} /></button>
        <span className="w-px h-5 bg-border mx-1" />
        <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={btn(editor.isActive("heading", { level: 2 }))} title="H2"><Heading2 size={16} /></button>
        <button type="button" onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} className={btn(editor.isActive("heading", { level: 3 }))} title="H3"><Heading3 size={16} /></button>
        <span className="w-px h-5 bg-border mx-1" />
        <button type="button" onClick={() => editor.chain().focus().toggleBulletList().run()} className={btn(editor.isActive("bulletList"))} title="Lista"><List size={16} /></button>
        <button type="button" onClick={() => editor.chain().focus().toggleOrderedList().run()} className={btn(editor.isActive("orderedList"))} title="Numerada"><ListOrdered size={16} /></button>
        <button type="button" onClick={() => editor.chain().focus().toggleBlockquote().run()} className={btn(editor.isActive("blockquote"))} title="Citação"><Quote size={16} /></button>
        <button type="button" onClick={() => editor.chain().focus().toggleCodeBlock().run()} className={btn(editor.isActive("codeBlock"))} title="Código"><Code size={16} /></button>
        <span className="w-px h-5 bg-border mx-1" />
        <button type="button" onClick={() => {
          const url = window.prompt("URL do link:", editor.getAttributes("link").href || "https://");
          if (url === null) return;
          if (url === "") { editor.chain().focus().unsetLink().run(); return; }
          editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
        }} className={btn(editor.isActive("link"))} title="Link"><LinkIcon size={16} /></button>
        <button type="button" onClick={() => {
          const url = window.prompt("URL da imagem:");
          if (url) editor.chain().focus().setImage({ src: url }).run();
        }} className={btn(false)} title="Imagem"><ImageIcon size={16} /></button>
        <span className="w-px h-5 bg-border mx-1" />
        <button type="button" onClick={() => editor.chain().focus().undo().run()} className={btn(false)} title="Desfazer"><Undo size={16} /></button>
        <button type="button" onClick={() => editor.chain().focus().redo().run()} className={btn(false)} title="Refazer"><Redo size={16} /></button>
      </div>
      <EditorContent editor={editor} />
    </div>
  );
}
