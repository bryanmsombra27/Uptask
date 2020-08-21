const actualizarAvance = () => {
    const tareas = document.querySelectorAll("li.tarea");

    if (tareas.length) {
        const tareasCompletas = document.querySelectorAll("i.completo");

        const avance = (tareasCompletas.length / tareas.length) * 100 | 0;

        const porcentaje = document.getElementById("porcentaje");
        porcentaje.style.width = `${avance}%`;

        if (avance === 100) {
            Swal.fire(
                'Tareas Completadas',
                'Felicidades terminaste los deberes!',
                'success'
            )
        }
    }
};

export {
    actualizarAvance
}