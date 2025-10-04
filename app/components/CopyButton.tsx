"use client";

type CopyButtonProps = {
  url: string;
};

export default function CopyButton({ url }: CopyButtonProps) {
  const handleCopy = async () => {
    // Siempre antepone la URL base de producción
    const fullUrl = `https://myjoncraft-sgs-music.vercel.app${new URL(
      url,
      "https://dummy"
    ).pathname}`;
    await navigator.clipboard.writeText(fullUrl);
    alert("¡Enlace copiado!");
  };

  return (
    <button
      className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition"
      onClick={handleCopy}
      type="button"
    >
      Copiar enlace
    </button>
  );
}