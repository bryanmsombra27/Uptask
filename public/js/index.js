import {
    enviarDatos,
    removeAlert,
    updateDatos,
    eliminarData,
    agregarTareas
} from "./peticiones/form.js";
import {
    cambiarEstadoTarea
} from "./peticiones/tareas.js";
import {
    actualizarAvance
} from "./peticiones/avance.js";
import {
    registrarUsuario,
    iniciarSesion,
    restablecerContraseña,
    restablecerEmail
} from "./peticiones/usuarios.js";

const formNuevoProyecto = document.getElementById("agregar");
const nombre = document.getElementById("nombre");
const password = document.getElementById("password");

const editarForm = document.getElementById("editar");
const tareaForm = document.querySelector(".agregar-tarea");
const eliminarBtn = document.getElementById("eliminar-proyecto");
const tareas = document.querySelector(".listado-pendientes");
const formCrearUsuario = document.getElementById("formulario-caja");
const formEnviarEmail = document.getElementById("enviar-email");
const formRestablecerPassword = document.getElementById("restablecer-password");

if (formNuevoProyecto) {
    formNuevoProyecto.addEventListener("submit", enviarDatos);
}
if (editarForm) {
    editarForm.addEventListener("submit", updateDatos);
}
if (nombre) {
    nombre.addEventListener("focusin", removeAlert);
}
if (password) {
    password.addEventListener("focusin", removeAlert);
}
if (eliminarBtn) {
    eliminarBtn.addEventListener("click", eliminarData);
}
if (tareaForm) {
    tareaForm.addEventListener("submit", agregarTareas);
}
if (tareas) {
    tareas.addEventListener("click", cambiarEstadoTarea);
}
if (formCrearUsuario) {
    formCrearUsuario.addEventListener("submit", registrarUsuario);
}

document.addEventListener("DOMContentLoaded", () => {
    actualizarAvance();
})
if (formEnviarEmail) {
    formEnviarEmail.addEventListener("submit", restablecerEmail);

}

if (formRestablecerPassword) {
    formRestablecerPassword.addEventListener("submit", restablecerContraseña);
}