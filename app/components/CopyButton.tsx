"use client";
import { translations } from "../i18n";

type CopyButtonProps = {
  url: string;
  lang: "es" | "en" | "eu" | "ja";
};

export default function CopyButton({ url, lang }: CopyButtonProps) {
  const handleCopy = async () => {
    const fullUrl = `https://myjoncraft-sgs-music.vercel.app${new URL(url, "https://dummy").pathname}`;
    await navigator.clipboard.writeText(fullUrl);
    alert(translations[lang].copied);
  };

  return (
    <button
      className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition"
      onClick={handleCopy}
      type="button"
    >
      {translations[lang].copy}
    </button>
  );
}