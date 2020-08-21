exports.proyectValidators = (req, res, next) => {
    const {
        nombre
    } = req.body;

    nombre.trim();


    if (nombre === "") {
        return res.status(403).send({
            status: "error",
            message: "El campo ingresado no puede estar vacio"
        });
    }

    next();


}