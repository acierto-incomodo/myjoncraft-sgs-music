"use client";
import { translations } from "../i18n";

export default function LocalizedText({
  tid,
  lang,
}: {
  tid: keyof typeof translations["en"];
  lang: "es" | "en";
}) {
  return translations[lang][tid] || translations.en[tid];
}