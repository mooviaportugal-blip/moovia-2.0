import { useEffect } from "react";
import { useSiteContent } from "@/lib/useSiteContent";

export function FaviconLoader() {
  const { data } = useSiteContent();
  const favicon = data?.["brand.favicon"];

  useEffect(() => {
    if (!favicon) return;
    const head = document.head;
    head.querySelectorAll('link[rel="icon"], link[rel="apple-touch-icon"]').forEach((el) => el.remove());
    const link = document.createElement("link");
    link.rel = "icon";
    link.href = favicon;
    if (favicon.startsWith("data:image/svg") || favicon.endsWith(".svg")) link.type = "image/svg+xml";
    else if (favicon.startsWith("data:image/png") || favicon.endsWith(".png")) link.type = "image/png";
    head.appendChild(link);
    const apple = document.createElement("link");
    apple.rel = "apple-touch-icon";
    apple.href = favicon;
    head.appendChild(apple);
  }, [favicon]);

  return null;
}
