import {
    fetchData,
    campos
} from "./form.js";

const registrarUsuario = async (e) => {
    e.preventDefault();
    const objeto = campos(e);
    const data = await fetchData(
        "http://localhost:3000/crear-cuenta",
        "post",
        objeto
    );

    if (data.status === "error") {
        const msgerror = document.getElementById("error-create");

        if (msgerror) {
            msgerror.classList.remove("oculto");
            msgerror.textContent = data.message;
        }

    }
    if (data.status === "success") {
        location.href = "/iniciar-sesion";
    }

    console.log(data);
};
const iniciarSesion = async (e) => {
    e.preventDefault();
    const objeto = campos(e);
    const data = await fetchData("http://localhost:3000/iniciar-sesion", "POST", objeto);

    console.log(data);
}
const restablecerEmail = async (e) => {
    e.preventDefault();
    const objeto = campos(e);
    const data = await fetchData("http://localhost:3000/reestablecer", "post", objeto);
    console.log(data);

    if (data.status === "success") {
        location.href = data.url
    }
    console.log("kosox");

}

const restablecerContraseña = async (e) => {
    e.preventDefault();
    const objeto = campos(e);
    const token = location.href.split("/")[4];

    const data = await fetchData(`http://localhost:3000/reestablecer/${token}`, "post", objeto);

    console.log(data);
    if (data.status === "success") {
        Swal.fire({
            title: "Passoword Cambiada con exito",
            text: "se ha cambiado exitosamente su contraseña",
            icon: "success"
        });
        setTimeout(() => {
            location.href = "/iniciar-sesion"
        }, 2000)
    }

};
export {
    registrarUsuario,
    iniciarSesion,
    restablecerContraseña,
    restablecerEmail
};