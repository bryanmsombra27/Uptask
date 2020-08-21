const Proyectos = require("../models/Proyectos");
const Tareas = require("../models/Tareas");

const slug = require("slug");
exports.proyectosHome = async (req, res) => {
  const UsuarioId = res.locals.usuario.id;

  const proyectos = await Proyectos.findAll({
    where: {
      UsuarioId
    }
  });

  res.render("index.pug", {
    title: "Proyectos",
    proyectos,
  });
};

exports.formularioproyecto = async (req, res) => {
  try {
    const UsuarioId = res.locals.usuario.id;

    const proyectos = await Proyectos.findAll({
      where: {
        UsuarioId
      }
    });

    res.render("nuevoProyecto.pug", {
      title: "Nuevo Proyecto",
      proyectos,
    });
  } catch (err) {
    console.log(err);
  }
};
exports.nuevoProyecto = async (req, res) => {
  const {
    nombre
  } = req.body;

  try {
    const UsuarioId = res.locals.usuario.id;
    //insertando a la BD el nombre del proyecto
    const proyecto = await Proyectos.create({
      nombre,
      UsuarioId
    });

    if (!proyecto) {
      return res.status(400).send({
        status: "error",
        message: "No se creo el proyecto adecuadamente",
      });
    }

    return res.status(200).send({
      status: "success",
      message: "proyecto creado",
    });
  } catch (err) {
    console.log(err);
  }
  return res.status(200).send({
    status: "success",
    message: "Datos recibidos con exito",
    nombre,
  });
};
exports.proyectoPorUrl = async (req, res) => {
  const {
    url
  } = req.params;
  try {
    const UsuarioId = res.locals.usuario.id;

    const proyectosPromise = Proyectos.findAll({
      where: {
        UsuarioId
      }
    });
    const proyectoPromise = Proyectos.findOne({
      where: {
        url,
        UsuarioId
      },
    });

    const [proyectos, proyecto] = await Promise.all([
      proyectosPromise,
      proyectoPromise,
    ]);

    const tareas = await Tareas.findAll({
      where: {
        proyectoId: proyecto.id
      }
      // include: [{
      //   model: Proyectos
      // }]
    });

    if (!proyecto) {
      return res.status(404).send({
        status: "error",
        message: "No hay proyectos que coincidan con ese nombre",
      });
    }

    res.render("tareas.pug", {
      title: "Tareas del Proyecto",
      proyecto,
      proyectos,
      tareas
      // tareas
    });
  } catch (err) {
    console.log(err);
  }
};

exports.formularioEditar = async (req, res) => {
  try {
    const {
      id
    } = req.params;
    const UsuarioId = res.locals.usuario.id;

    const proyectosPromise = Proyectos.findAll({
      where: {
        UsuarioId
      }
    });

    const proyectoPromise = Proyectos.findOne({
      where: {
        id,
      },
    });

    const [proyectos, proyecto] = await Promise.all([
      proyectosPromise,
      proyectoPromise,
    ]);

    res.render("nuevoProyecto.pug", {
      title: "Editar Proyecto",
      proyectos,
      proyecto,
    });
  } catch (error) {
    console.log(error);
  }
};
exports.actualizarProyecto = async (req, res) => {
  const {
    nombre
  } = req.body;
  const UsuarioId = res.locals.usuario.id;



  try {
    //insertando a la BD el nombre del proyecto
    await Proyectos.update({
      nombre,
    }, {
      where: {
        id: req.params.id,
        UsuarioId
      },
    });

    if (!proyecto) {
      return res.status(400).send({
        status: "error",
        message: "No se creo el proyecto adecuadamente",
      });
    }

    return res.status(200).send({
      status: "success",
      message: "proyecto creado",
    });
  } catch (err) {
    console.log(err);
  }
  return res.status(200).send({
    status: "success",
    message: "Datos recibidos con exito",
    nombre,
  });
};
exports.eliminarProyecto = async (req, res) => {
  const {
    url
  } = req.params;

  try {
    const resultado = await Proyectos.destroy({
      where: {
        url,
      },
    });

    if (!resultado) {
      return res.status(400).send({
        status: "error",
        message: "No se encontro el proyecto",
      });
    }
    return res.status(200).send({
      status: "success",
      message: "El proyecto se elimino con exito",
    });
  } catch (error) {
    console.log(error);
  }
};
// module.exports = {
//     proyectosHome
// }