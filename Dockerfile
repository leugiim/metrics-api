# Define la imagen base de Node.js
FROM node:18.15 

# Crea un directorio de trabajo en el contenedor
WORKDIR /app

# Copia los archivos del proyecto en el contenedor
COPY . /app

# Instala las dependencias
RUN npm install

# Expone el puerto en el que la aplicación escucha
EXPOSE 3000

# Ejecuta el comando para iniciar la aplicación
CMD ["npm", "start"]