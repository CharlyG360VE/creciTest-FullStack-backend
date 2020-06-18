const express = require( 'express' );
const morgan = require( 'morgan' );
const cors = require( 'cors' );

//Inicializar variables
const app = express();
const { mongoose } = require( './database' );
const corsOptions = {
  "origin": "https://crecitest.web.app",
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  "preflightContinue": false,
  "optionsSuccessStatus": 200
}
//midlewares
app.set( 'PORT', process.env.PORT || 3000 )
app.use( express.json() );
app.use( morgan( 'dev' ) );
app.use( cors() );

//routes
app.use( '/usuarios', require( './routes/usuarios.routes' ) );
app.use( '/proyectos', require( './routes/proyectos.routes' ) );
app.use( '/tareas', require( './routes/tareas.routes' ) );
app.use( '/estado', require( './routes/estado.routes' ) );
app.use( '/login', require( './routes/login.routes' ) );
//principal route
app.use( '/', require( './routes/app.routes' ) );

//Listening Server
app.listen( app.get( 'PORT' ), () => console.log( `Listening Server on Port: ${ app.get( 'PORT' ) }` ) );