import os
import json

# Ruta de la carpeta con la música
music_folder = os.path.join("public", "music")

# Obtener lista de archivos de música
files = [
    f for f in os.listdir(music_folder)
    if os.path.isfile(os.path.join(music_folder, f))
]

# Crear el archivo JSON en la misma raíz del script
output_file = "music-files.json"
with open(output_file, "w", encoding="utf-8") as f:
    json.dump(files, f, indent=3, ensure_ascii=False)

print(f"Archivo '{output_file}' creado con {len(files)} canciones 🎶")
