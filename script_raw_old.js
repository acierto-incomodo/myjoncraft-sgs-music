// URL base RAW de tu repositorio GitHub (archivos directos)
const githubRawBaseUrl = "https://raw.githubusercontent.com/acierto-incomodo/myjoncraft-sgs-music/main/public/music/";

Promise.all([
    fetch('music-files.json').then(res => res.json()),
    fetch('music-directory.json').then(res => res.json())
]).then(([names, paths]) => {
    const musicList = document.getElementById('music-list');

    for (const key in names) {
        const songDiv = document.createElement('div');
        songDiv.className = 'song-item';

        // Nombre de la canción
        const title = document.createElement('h3');
        title.textContent = names[key];
        songDiv.appendChild(title);

        // Reproductor de audio (usa GitHub RAW directamente)
        const fileName = paths[key].split('/').pop();
        const rawUrl = githubRawBaseUrl + encodeURIComponent(fileName);

        const audio = document.createElement('audio');
        audio.src = rawUrl;
        audio.controls = true;
        songDiv.appendChild(audio);

        // Botón para copiar la URL RAW
        const copyBtn = document.createElement('button');
        copyBtn.textContent = 'Copiar URL Reproductor';
        copyBtn.addEventListener('click', () => {
            navigator.clipboard.writeText(rawUrl)
                .then(() => alert('URL del reproductor copiada ✅'))
                .catch(() => alert('Error al copiar la URL ❌'));
        });
        songDiv.appendChild(copyBtn);

        musicList.appendChild(songDiv);
    }
}).catch(err => console.error("Error cargando las canciones:", err));
