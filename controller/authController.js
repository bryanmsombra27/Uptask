const passport = require("passport");
const Usuarios = require("../models/Usuarios");
const jwt = require("jsonwebtoken");
const crypto = require("crypto"); //genera el token
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const bcrypt = require("bcrypt-nodejs");
exports.autenticarUsuario = passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/iniciar-sesion",
});
const enviarEmail = require("../handlers/email");

exports.usuarioAutenticado = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    return res.redirect("/iniciar-sesion");
};
exports.cerrarSesion = (req, res) => {
    req.session.destroy(() => {
        res.redirect("/iniciar-sesion");
    });
};
//generar token si el usuario es valido
exports.enviarToken = async (req, res, next) => {
    //verificar que el usuario exista
    const {
        email
    } = req.body;
    try {
        const usuario = await Usuarios.findOne({
            where: {
                email,
            },
        });
        if (!usuario) {
            return res.status(404).send({
                status: "error",
                message: "No se encontro un usuario con esa cuenta",
            });
        }

        //usuario existe
        usuario.token = crypto.randomBytes(20).toString("hex"); //creando el token
        usuario.expiracion = Date.now() + 3600000; //expira en una hora

        //guardando datos
        await usuario.save();

        //url de reset
        const resetUrl = `http://${req.headers.host}/reestablecer/${usuario.token}`;



        //enviar el correo con el token
        // await enviarEmail.enviar({
        //     usuario,
        //     subject: "Password Reset",
        //     resetUrl,
        //     archivo: "reestablecer-password"
        // })

        return res.status(200).send({
            status: "success",
            message: "enviando url de verificacion...",
            url: resetUrl
        });
    } catch (err) {
        console.log(err);
    }
};
exports.validarToken = async (req, res) => {
    const {
        token
    } = req.params;
    const usuario = await Usuarios.findOne({
        where: {
            token,
        },
    });
    if (!usuario) {
        return res.status(404).send({
            status: "error",
            message: "No se encontro el usuario",
        });
    }
    res.render("resetPassword", {
        title: "Reestablecer Contraseña",
    });
};
exports.actualizarPassword = async (req, res) => {
    const {
        token
    } = req.params;
    const {
        password
    } = req.body;
    try {
        //verfica que el tokens sea valido y que no haya caducado aun
        const usuario = await Usuarios.findOne({
            where: {
                token,
                expiracion: {
                    [Op.gte]: Date.now(),
                },
            },
        });
        if (!usuario) {
            return res.status(404).send({
                status: "error",
                message: "no se encontro el usuario o el token ya expiro",
            });
        }
        usuario.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
        usuario.token = null;
        usuario.expiracion = null;

        await usuario.save();

        return res.status(200).send({
            status: "success",
            message: "El password se ha actualizado con exito",
        });
    } catch (error) {
        console.log(error);
    }
};