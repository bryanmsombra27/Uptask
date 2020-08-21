const Usuarios = require("../models/Usuarios");
const enviarEmail = require("../handlers/email");

exports.formCrearCuenta = (req, res) => {
    res.render("crearCuenta", {
        title: "Crear Cuenta en Uptask",
    });
};
exports.formIniciarSesion = (req, res) => {
    res.render("iniciarSesion", {
        title: "Inicia Sesion en Uptask",
    });
};
exports.crearCuenta = async (req, res) => {
    const {
        email,
        password
    } = req.body;


    try {
        const usuario = await Usuarios.create({
            email,
            password,
        });


        // //crear una url de confirmar cuenta
        // //url de confirmar cuenta
        // const confirmarUrl = `http://${req.headers.host}/confirmar/${email}`;
        // //crear el objeto de usuario
        // const usuario = {
        //     email
        // };
        // //enviar email
        // await enviarEmail.enviar({
        //     usuario,
        //     subject: "Confirmar Cuenta Uptask",
        //     confirmarUrl,
        //     archivo: "confirmar-cuenta"
        // })

        //redirigir al usuario

        if (!usuario) {
            return res.status(400).send({
                status: "success",
                message: "No se pudo crear el usuario",
            });
        }
        return res.status(200).send({
            status: "success",
            message: "Usuario creado con exito",
        });
    } catch (err) {
        console.log(err);
        return res.status(400).send({
            status: "error",
            message: err.errors[0].message,
            value: err.errors[0].value,
        });
    }
};
exports.formRestablecerPassword = (req, res) => {
    res.render("reestablecer", {
        title: "Reestablecer tu Contraseña"
    })
}