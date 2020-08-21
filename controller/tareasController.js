const Proyectos = require('../models/Proyectos');
const Tareas = require('../models/Tareas');


exports.agregarTarea = async (req, res) => {
    const {
        url
    } = req.params;
    const {
        tarea
    } = req.body;

    const estado = 0;

    try {
        const proyecto = await Proyectos.findOne({
            where: {
                url
            }
        });

        const proyectoId = proyecto.id;

        //insertar
        const tareapro = await Tareas.create({
            tarea,
            estado,
            proyectoId
        });

        if (!tareapro) {
            return res.status(400).send({
                status: 'error',
                message: 'No se pudo crear la tarea'
            });
        }

        res.status(200).send({
            status: 'success',
            message: "tarea creada con exito",
            tareapro
        })
    } catch (error) {
        console.log(error);
    }

};
exports.cambiarEstadoTarea = async (req, res) => {
    const {
        id
    } = req.params;

    try {
        const tarea = await Tareas.findOne({
            where: {
                id
            }
        });

        if (!tarea) {
            return res.status(400).send({
                status: 'error',
                message: 'No se encontro una tarea con ese id'
            })
        }
        //cambiar el estado de la tarea
        let estado = 0;

        if (tarea.estado === estado) {
            estado = 1;
        }
        tarea.estado = estado;

        const resultado = await tarea.save();

        if (!resultado) {
            return res.status(400).send({
                status: "Error",
                message: "No se pudo actualizar"
            })
        }
        return res.status(200).send({
            status: "Success",
            message: "Tarea actualizada"
        });

    } catch (error) {
        console.log(error);
    }
};
exports.eliminandoTarea = async (req, res) => {
    const {
        id
    } = req.params;
    try {
        const resultado = await Tareas.destroy({
            where: {
                id
            }
        });

        if (!resultado) {
            return res.status(404).send({
                status: 'error',
                message: 'No se encontro la tarea a eliminar'
            });
        }
        return res.status(200).send({
            status: 'success',
            message: 'Tarea eliminada con exito'
        });

    } catch (error) {
        console.log(error);
    }


};