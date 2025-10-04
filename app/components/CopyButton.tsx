"use client";

type CopyButtonProps = {
  url: string;
};

export default function CopyButton({ url }: CopyButtonProps) {
  return (
    <button
      className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition"
      onClick={async () => {
        await navigator.clipboard.writeText(url);
        alert("¡Enlace copiado!");
      }}
      type="button"
    >
      Copiar enlace
    </button>
  );
}