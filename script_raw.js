// Base RAW del repositorio
const githubRawBaseUrl = "https://acierto-incomodo.github.io/myjoncraft-sgs-music/music";
const version = "v1.3.11";
const almacenamiento = "993,8 MB";

// Traducciones
const langData = {
    es: {
        title: "🎵 MyJonCraft SGS Music",
        info: (count) => `Hay ${count} canciones disponibles. Versión ${version}. Almacenamiento: ${almacenamiento}.`,
        copy: "Copiar URL Reproductor",
        copied: "URL copiada ✅",
        error: "Error al copiar la URL ❌",
        lang: "Idioma:"
    },
    en: {
        title: "🎵 MyJonCraft SGS Music",
        info: (count) => `${count} songs available. Version ${version}. Storage: ${almacenamiento}.`,
        copy: "Copy Player URL",
        copied: "URL copied ✅",
        error: "Failed to copy URL ❌",
        lang: "Language:"
    },
    eu: {
        title: "🎵 MyJonCraft SGS Musika",
        info: (count) => `${count} abesti erabilgarri. Bertsioa ${version}. Biltegiratzea: ${almacenamiento}.`,
        copy: "Erreproduzitzailearen URLa kopiatu",
        copied: "URLa kopiatuta ✅",
        error: "Errorea URL kopiatzean ❌",
        lang: "Hizkuntza:"
    },
    // ja: {
    //     title: "🎵 MyJonCraft SGS ミュージック",
    //     info: (count) => `${count} 曲が利用可能です。バージョン ${version}。ストレージ：${almacenamiento}。`,
    //     copy: "プレイヤーのURLをコピー",
    //     copied: "コピーしました ✅",
    //     error: "コピーに失敗しました ❌",
    //     lang: "言語："
    // }
};

// Elementos del DOM
const musicList = document.getElementById('music-list');
const titleEl = document.getElementById('page-title');
const infoEl = document.getElementById('info-text');
const langSelect = document.getElementById('lang-select');
const langLabel = document.getElementById('lang-label');
const searchInput = document.getElementById('search-input');

let songs = {};
let paths = {};
let currentLang = "es";

// Cargar los JSON y renderizar
Promise.all([
    fetch('music-files.json').then(res => res.json()),
    fetch('music-directory.json').then(res => res.json())
]).then(([names, directories]) => {
    songs = names;
    paths = directories;
    renderPage();
}).catch(err => console.error("Error cargando las canciones:", err));

function renderPage() {
    const t = langData[currentLang];
    titleEl.textContent = t.title;
    langLabel.textContent = t.lang;
    musicList.innerHTML = "";

    const searchTerm = searchInput.value.toLowerCase();

    const keys = Object.keys(songs).filter(key =>
        songs[key].toLowerCase().includes(searchTerm)
    );

    infoEl.textContent = t.info(keys.length);

    for (const key of keys) {
        const songDiv = document.createElement('div');
        songDiv.className = 'song-item';

        const title = document.createElement('h3');
        title.textContent = songs[key];
        songDiv.appendChild(title);

        const rawUrl = paths[key];

        const audio = document.createElement('audio');
        audio.src = rawUrl;
        audio.controls = true;
        songDiv.appendChild(audio);

        const copyBtn = document.createElement('button');
        copyBtn.textContent = t.copy;
        copyBtn.addEventListener('click', () => {
            navigator.clipboard.writeText(rawUrl)
                .then(() => {
                    copyBtn.textContent = t.copied;
                    setTimeout(() => copyBtn.textContent = t.copy, 1500);
                })
                .catch(() => alert(t.error));
        });
        songDiv.appendChild(copyBtn);

        musicList.appendChild(songDiv);
    }
}

// Cambiar idioma dinámicamente
langSelect.addEventListener('change', (e) => {
    currentLang = e.target.value;
    renderPage();
});

// Filtrar canciones al escribir en el buscador
searchInput.addEventListener('input', renderPage);
