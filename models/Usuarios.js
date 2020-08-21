const Sequelize = require("sequelize");
const db = require("../config/db");
const Proyectos = require("../models/Proyectos");
const bcrypt = require("bcrypt-nodejs");

const Usuarios = db.define(
  "Usuarios", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: Sequelize.STRING(60),
      allowNull: false,
      validate: {
        isEmail: {
          msg: "agrega un correo valido",
        },
        notEmpty: {
          msg: "el email no puede ir vacio",
        },
      },
      unique: {
        args: true,
        msg: "Usuario ya registrado",
      },
    },
    password: {
      type: Sequelize.STRING(60),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "la contraseña no puede ir vacia",
        },
      },
    },
    activo: {
      type: Sequelize.INTEGER,
      defaultValue: 0
    },
    token: Sequelize.STRING,
    expiracion: Sequelize.DATE,
  }, {
    hooks: {
      //hasear la contraseña antes de que se almacene en la BD
      beforeCreate(usuario) {
        usuario.password = bcrypt.hashSync(
          usuario.password,
          bcrypt.genSaltSync(10)
        );
      },
    },
  }
);
//verificar contraseña externa con la que se encuentra en la BD
Usuarios.prototype.verifyPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

Usuarios.hasMany(Proyectos);

module.exports = Usuarios;