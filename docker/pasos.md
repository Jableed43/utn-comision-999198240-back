1. El primer paso para iniciar un proyecto con node es:
npm init o npm init -y (es mas rapida)

2. El segundo paso es instalar dependencias
npm i body-parser cors express mongodb mongoose

3. Instalar dependencias de desarrollo
npm i dotenv nodemon npm-check-updates -D

4. Vamos al package.json y añadimos "type": "module" para configurar module.js y utilizar import

5. Crear index.js y configurar

6. Incluir scripts en package.json

7. Configurar los middlewares de body parser

8. Crear variables de entorno para la mongodbUri, PORT y la database

// Coding

9. Creamos los modelos, ya que sin modelos no tenemos ni rutas, ni controllers, ni servicios.

10. Creamos los controladores