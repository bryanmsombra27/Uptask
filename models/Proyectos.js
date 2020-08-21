const Sequelize = require("sequelize");
const slug = require("slug");
const shortid = require("shortid");
//importando la conexion
const db = require("../config/db");

const Proyectos = db.define(
  "proyectos", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: Sequelize.STRING(100),
    },
    url: {
      type: Sequelize.STRING(100),
    },
  }, {
    hooks: {
      beforeCreate(proyecto) {
        const url = slug(proyecto.nombre).toLowerCase();

        proyecto.url = `${url}-${shortid.generate()}`;
      },
    },
  }
);

module.exports = Proyectos;