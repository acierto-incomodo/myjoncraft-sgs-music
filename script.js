// URL base de tu repositorio GitHub donde están los archivos
const githubBaseUrl = "https://acierto-incomodo.github.io/myjoncraft-sgs-music/music/";

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

        // Reproductor de audio
        const audio = document.createElement('audio');
        audio.src = paths[key];  // sigue usando ruta local para reproducir
        audio.controls = true;
        songDiv.appendChild(audio);

        // Botón para copiar la URL de GitHub
        const copyBtn = document.createElement('button');
        copyBtn.textContent = 'Copiar URL GitHub';
        copyBtn.addEventListener('click', () => {
            // Tomamos el nombre del archivo de paths[key] y lo añadimos a la URL de GitHub
            const fileName = paths[key].split('/').pop(); 
            const githubUrl = githubBaseUrl + encodeURIComponent(fileName);

            navigator.clipboard.writeText(githubUrl)
                .then(() => alert('URL de GitHub copiada ✅'))
                .catch(() => alert('Error al copiar la URL ❌'));
        });
        songDiv.appendChild(copyBtn);

        musicList.appendChild(songDiv);
    }
}).catch(err => console.error("Error cargando las canciones:", err));
