import Image from "next/image";
import fs from "fs";
import path from "path";
import CopyButton from "../components/CopyButton";
import LocalizedText from "../components/LocalizedText";
import musicFiles from "../music-files.json";

export default async function Home({ params }: { params: { lang: string } }) {
  const lang = (["es", "en"].includes(params.lang) ? params.lang : "en") as "es" | "en";

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <div className="flex flex-col items-center justify-center w-full mb-4">
          <Image
            src="/logo.png"
            alt="Next.js logo"
            width={180}
            height={38}
            priority
          />
          <h1 className="text-2xl font-bold mt-4 text-center">
            <LocalizedText tid="title" lang={lang} />
          </h1>
          <p>
            <LocalizedText tid="musicCount" lang={lang} />
          </p>
        </div>
        <div className="flex flex-col gap-6 w-full">
          {musicFiles.length === 0 && (
            <p>
              <LocalizedText tid="noFiles" lang={lang} /> <b>music</b>.
            </p>
          )}
          {musicFiles.map((file) => {
            const isCompatible = /\.(mp3|wav|ogg)$/i.test(file);
            return (
              <div
                key={file}
                className="flex flex-col sm:flex-row items-center justify-between border p-4 rounded-lg bg-white/70 dark:bg-black/30 w-full max-w-3xl mx-auto"
              >
                <div className="flex flex-col items-center w-full gap-2 sm:flex-row sm:items-center sm:gap-3">
                  <audio controls src={`/music/${file}`} className="w-full sm:w-64" />
                  <span className="font-mono text-xs break-all text-center sm:text-left w-full sm:w-auto">{file}</span>
                  {!isCompatible && (
                    <span className="text-xs text-red-600 ml-2">
                      <LocalizedText tid="notCompatible" lang={lang} />
                    </span>
                  )}
                </div>
                <div className="w-full flex justify-center mt-3 sm:mt-0 sm:w-auto sm:justify-end">
                  <CopyButton url={`/music/${file}`} lang={lang} />
                </div>
              </div>
            );
          })}
        </div>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <span className="text-sm text-gray-600 dark:text-gray-300">StormGamesStudios © 2025 - v1.2.11</span>
      </footer>
    </div>
  );
}