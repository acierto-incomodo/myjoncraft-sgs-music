import Image from "next/image";
import fs from "fs";
import path from "path";
import CopyButton from "./components/CopyButton";

// Esta función solo se ejecuta en el servidor
async function getMusicFiles() {
  const musicDir = path.join(process.cwd(), "public", "music");
  try {
    const files = await fs.promises.readdir(musicDir);
    // Filtra solo archivos de audio comunes
    return files.filter((file) =>
      /\.(mp3|wav|ogg|m4a)$/i.test(file)
    );
  } catch {
    return [];
  }
}

export default async function Home() {
  const musicFiles = await getMusicFiles();

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <Image
          src="/logo.png"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
        <h1 className="text-2xl font-bold mb-4">Reproductor de música para MyJonCraft SGS Server</h1>
        <div className="flex flex-col gap-6 w-full">
          {musicFiles.length === 0 && (
            <p>No hay archivos de audio en la carpeta <b>music</b>.</p>
          )}
          {musicFiles.map((file) => (
            <div
              key={file}
              className="flex flex-row items-center justify-between border p-4 rounded-lg bg-white/70 dark:bg-black/30 w-full"
            >
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <audio controls src={`/music/${file}`} className="w-64" />
                <span className="font-mono text-xs break-all">{file}</span>
              </div>
              <CopyButton url={`${process.env.NEXT_PUBLIC_SITE_URL ?? ""}/music/${file}`} />
            </div>
          ))}
        </div>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        {/* 
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
        */}
        <span className="text-sm text-gray-600 dark:text-gray-300">StormGamesStudios © 2025 - v1.0.1</span>
      </footer>
    </div>
  );
}
