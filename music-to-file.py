import os
import json
import urllib.parse

# Ruta de la carpeta con la música (local)
music_folder = "music"

# URL base para GitHub Pages
base_url = "https://acierto-incomodo.github.io/myjoncraft-sgs-music/music/"

# Obtener lista de archivos de música (ordenada)
files = sorted(
    f for f in os.listdir(music_folder)
    if os.path.isfile(os.path.join(music_folder, f))
)

# Diccionario "1": "cancion1", "2": "cancion2" (sin extensión)
music_dict = {str(i + 1): os.path.splitext(fname)[0] for i, fname in enumerate(files)}

# Diccionario "1": "https://...music/nombre.ext" con espacios convertidos a %20
directory_dict = {
    str(i + 1): base_url + urllib.parse.quote(fname)
    for i, fname in enumerate(files)
}

# Crear los archivos JSON en la misma raíz del script
with open("music-files.json", "w", encoding="utf-8") as f:
    json.dump(music_dict, f, indent=3, ensure_ascii=False)

with open("music-directory.json", "w", encoding="utf-8") as f:
    json.dump(directory_dict, f, indent=3, ensure_ascii=False)

print(f"Archivos 'music-files.json' y 'music-directory.json' creados con {len(music_dict)} canciones 🎶")
