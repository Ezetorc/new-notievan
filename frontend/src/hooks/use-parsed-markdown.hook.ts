import { useEffect, useState } from "react";
import { marked } from "marked";
import DOMPurify from "dompurify";

export function useParsedMarkdown(markdown: string | undefined) {
  const [html, setHtml] = useState<string>("");

  useEffect(() => {
    const handleHtml = async () => {
      if (!markdown) {
        setHtml("");
        return;
      }

      const rawHtml = await marked.parse(markdown);
      const sanitizedHtml = DOMPurify.sanitize(rawHtml);

      setHtml(sanitizedHtml);
    }

    handleHtml()
  }, [markdown]);

  return html;
}
