import os
import re

def sanitize_filename(filename):
    # Separamos el nombre de la extensión
    name, ext = os.path.splitext(filename)
    
    # Definimos los caracteres no permitidos (estándar de Windows/Linux/macOS y URLs)
    # Quitamos: < > : " / \ | ? * y caracteres de control
    # También podemos limitar a alfanuméricos, espacios, guiones y puntos si queremos máxima compatibilidad
    clean_name = re.sub(r'[<>:"/\\|?*!¡¿]', '', name)
    
    # Opcional: Eliminar espacios múltiples o al principio/final
    clean_name = clean_name.strip()
    
    return clean_name + ext

def main():
    music_folder = "music"
    
    if not os.path.exists(music_folder):
        print(f"La carpeta '{music_folder}' no existe.")
        return

    files = [f for f in os.listdir(music_folder) if os.path.isfile(os.path.join(music_folder, f))]
    
    print(f"Analizando {len(files)} archivos...")

    for original_name in files:
        new_name = sanitize_filename(original_name)
        
        if original_name != new_name:
            old_path = os.path.join(music_folder, original_name)
            new_path = os.path.join(music_folder, new_name)
            
            # Renombrar el archivo
            os.rename(old_path, new_path)
            print(f"Renombrado: '{original_name}' -> '{new_name}'")

    print("Proceso finalizado. ✨")

if __name__ == "__main__":
    main()