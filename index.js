const dotenv = require('dotenv');

dotenv.config({
    path: "./config.env"
});
const app = require("./app");


//servidor y puerto
// const host = process.env.HOST || "0.0.0.0";
const port = process.env.PORT || 3000;



app.listen(port, () => {
    console.log(`Escuchando peticiones por el puerto: ${port}`);
});