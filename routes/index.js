// const router = require("express").Router();
const express = require("express");
const router = express.Router();
const {
    body
} = require("express-validator");
const {
    proyectValidators
} = require("../middlewares/proyecto");

const {
    proyectosHome,
    formularioproyecto,
    nuevoProyecto,
    proyectoPorUrl,
    formularioEditar,
    actualizarProyecto,
    eliminarProyecto,
} = require("../controller/proyectoController");
const {
    agregarTarea,
    cambiarEstadoTarea,
    eliminandoTarea
} = require("../controller/tareasController");
const {
    formCrearCuenta,
    crearCuenta,
    formIniciarSesion,
    formRestablecerPassword,

} = require("../controller/usuarioController");

const {
    autenticarUsuario,
    usuarioAutenticado,
    cerrarSesion,
    enviarToken,
    validarToken,
    actualizarPassword
} = require("../controller/authController");


//proyectos
router.get("/", usuarioAutenticado, proyectosHome);
router.get("/nuevo-proyecto", usuarioAutenticado, formularioproyecto);
router.post(
    "/nuevo-proyecto", usuarioAutenticado,
    proyectValidators,
    body("nombre").escape(),
    nuevoProyecto
);
router.get("/proyectos/:url", usuarioAutenticado, proyectoPorUrl);
router.get("/proyecto/editar/:id", usuarioAutenticado, formularioEditar);
router.post("/nuevo-proyecto/:id", usuarioAutenticado, actualizarProyecto);
router.delete("/proyectos/:url", usuarioAutenticado, eliminarProyecto);



//tareas
router.post("/proyectos/:url", usuarioAutenticado, agregarTarea);
router.patch("/tareas/:id", usuarioAutenticado, cambiarEstadoTarea);
router.delete("/tareas/:id", usuarioAutenticado, eliminandoTarea);

//usuarios
router.get("/crear-cuenta", formCrearCuenta);
router.get("/iniciar-sesion", formIniciarSesion);
router.post("/crear-cuenta", crearCuenta);
router.post("/iniciar-sesion", autenticarUsuario);


//cerrar sesion
router.get("/cerrar-sesion", cerrarSesion);
router.get("/reestablecer", formRestablecerPassword);
router.post("/reestablecer", enviarToken);
router.get("/reestablecer/:token", validarToken);
router.post("/reestablecer/:token", actualizarPassword);
module.exports = router;