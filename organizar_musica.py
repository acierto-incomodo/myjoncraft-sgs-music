import os
import shutil

def organizar_musica():
    # Carpeta de origen donde están los archivos
    # He usado "musica-nueva" ya que aparece así en tu .gitignore
    source_folder = "musica-nueva" 
    # Cantidad de archivos por cada carpeta 'parte'
    files_per_part = 100

    if not os.path.exists(source_folder):
        print(f"Error: La carpeta '{source_folder}' no existe.")
        return

    # Obtenemos la lista de archivos, ignorando carpetas si las hubiera
    files = [f for f in os.listdir(source_folder) if os.path.isfile(os.path.join(source_folder, f))]
    files.sort()  # Ordenamos alfabéticamente para un reparto organizado

    if not files:
        print("No se encontraron archivos en la carpeta de origen.")
        return

    for i, filename in enumerate(files):
        # Calculamos el número de la parte (1 para los primeros 100, 2 para los siguientes, etc.)
        part_number = (i // files_per_part) + 1
        target_folder = f"parte{part_number}"

        # Creamos la carpeta de la parte si no existe todavía
        if not os.path.exists(target_folder):
            os.makedirs(target_folder)

        # Movemos el archivo desde el origen al destino
        shutil.move(os.path.join(source_folder, filename), os.path.join(target_folder, filename))

    print(f"Proceso completado. Se han organizado {len(files)} archivos en carpetas de {files_per_part} unidades.")

if __name__ == "__main__":
    organizar_musica()