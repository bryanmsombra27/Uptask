const express = require("express");
const app = express();
const routes = require("./routes/index");
const path = require("path");
const bodyParser = require("body-parser");
const helpers = require("./helpers");
const flash = require("connect-flash");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require("./config/passport");

//creando la conexion a la bd
const db = require("./config/db");

//importar el modelo
require("./models/Proyectos");
require("./models/Tareas");
require("./models/Usuarios");

//con el metodo sync indicamos que cree la tabla que definimos en nuestro modelo por eso es importante importar el modelo
db.sync()
  .then(() => {
    console.log("conexion a la bd exitosa");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
// Configurar cabeceras y cors
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

app.use(bodyParser.json());
app.use(cookieParser());

app.use(flash());
//sesioones de express  
app.use(session({
  secret: "koso",
  resave: false,
  saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());
//utilizando los helpers y pasandolos en el objeto global
app.use((req, res, next) => {
  res.locals.vardump = helpers.vardump;
  res.locals.usuario = {
    ...req.user
  } || null;

  next();
});

//cargar los archivos estaticos
app.use(express.static(path.join(__dirname, "./public")));
// app.use(express.static("./public"));
// app.use(express.static(`${__dirname}/public`));
// console.log(path.join(__dirname, "./public"));

//habilitar pug  hbs=handlebars
app.set("view engine", "pug");

//añadir la carpeta de  vistas
// app.set("views", path.join(__dirname, "./views"));
// app.set("views", "./views");
app.set("views", `${__dirname}/views`);

app.use(routes);



module.exports = app;