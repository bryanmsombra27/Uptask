const Sequelize = require("sequelize");

//creando la conexion
const sequelize = new Sequelize(process.env.BD_NOMBRE, process.env.DB_USER, "", {
    host: process.env.DB_HOST,
    dialect: 'mysql',
    port: process.env.DB_PORT,
    define: {
        timestamps: false
    },
    pool: {
        max: 5,
        min: 0,
        acquire: 3000,
        idle: 10000
    }
});

//expoortando la conexion
module.exports = sequelize;