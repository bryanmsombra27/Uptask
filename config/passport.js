const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

//referencia al modelo de autenticacion
const Usuarios = require('../models/Usuarios');

//local strategy - login con credenciales propias ( usuario y contraseña)
passport.use(new LocalStrategy(
    //por default passport espera un usuario y password
    {
        usernameField: "email",
        passwordField: "password"
    },
    async (email, password, done) => {
        try {

            const usuario = await Usuarios.findOne({
                where: {
                    email
                }
            });
            if (!usuario.verifyPassword(password)) {
                return done(null, false, {
                    message: "password Incorrecto"
                });
            }

            return done(null, usuario);
        } catch (error) {
            return done(null, false, {
                message: "esa cuenta no existe"
            });
        }
    }

));

//serializar el usuario
passport.serializeUser((usuario, callback) => {
    callback(null, usuario);
});
//deserializar el usuario
passport.deserializeUser((usuario, callback) => {
    callback(null, usuario);
});

module.exports = passport;