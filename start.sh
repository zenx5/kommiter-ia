# script de bash que crea el comando kommit para ejecutar el comando 'pnpm run start', luego de 'pnpm install'

pnpm install
# Crear el comando kommit
echo "alias kommit='pnpm run start'" >> ~/.bashrc

# Recargar el archivo .bashrc
source ~/.bashrc

# Mensaje de finalización
echo "El comando 'kommit' ha sido creado. Ahora puedes ejecutar 'kommit' para iniciar el proyecto."

