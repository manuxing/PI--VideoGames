Videogames Web App

<p align="right">
  <img height="200" src="./videogame.png" />
</p>

## Objetivos del Proyecto

- Construir una App utlizando React, Redux, Node y Sequelize.
- Afirmar y conectar los conceptos aprendidos en la carrera.
- Aprender mejores prácticas.
- Aprender y practicar el workflow de GIT.




## Comenzando


__IMPORTANTE:__ Es necesario contar minimamente con la última versión estable de Node y NPM. Asegurarse de contar con ella para poder instalar correctamente las dependecias necesarias para correr el proyecto.

En `api` crear un archivo llamado: `.env` que tenga la siguiente forma:

```env
DB_USER=usuariodepostgres
DB_PASSWORD=passwordDePostgres
DB_HOST=localhost
```

Reemplazar `usuariodepostgres` y `passwordDePostgres` con tus propias credenciales para conectarte a postgres.

Adicionalmente será necesario que creen desde psql una base de datos llamada `videogames`

__Pasos:__

- PI-Videogames-main/client: npm i
- Start project: npm start
- PI-Videogames-main/api: npm i
- Start server: npm start



## Enunciado

La idea general es crear una aplicación en la cual se puedan ver los distintos videojuegos disponibles junto con información relevante de los mismos utilizando la api externa [rawg](https://rawg.io/apidocs) y a partir de ella poder, entre otras cosas:

- Buscar videjuegos
- Filtrarlos / Ordenarlos
- Agregar nuevos videojuegos


#### Tecnologías ustilizadas

- [ ] React
- [ ] Redux
- [ ] Express
- [ ] Sequelize - Postgres
- [ ] CSS3 sin ninguna libreria externa

__Imagenes:__

<br>
 <div display = "flex">
    <img src="./assets/1.png" alt="1" height="380" width="630"/>
    <br>
  <img src="./assets/2.png" alt="2" height="380" width="630"/>
  <br>

  <img src="./assets/3.png" alt="3" height="380" width="630"/>
  <br>

  <img src="./assets/4.png" alt="4" height="380" width="630"/>
</div>