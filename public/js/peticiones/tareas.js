import {
    fetchData
} from "./form.js";
import {
    actualizarAvance
} from "./avance.js";

const cambiarEstadoTarea = async (e) => {
    if (e.target.classList.contains("fa-check-circle")) {
        const id = e.target.parentElement.parentElement.dataset.tarea;

        const data = await fetchData(`/tareas/${id}`, "PATCH");

        if (data.status === "Success") {
            e.target.classList.toggle("completo");
            actualizarAvance();
        }
    }
    if (e.target.classList.contains("fa-trash")) {
        const tareaHTML = e.target.parentElement.parentElement;
        const id = tareaHTML.dataset.tarea;

        Swal.fire({
            title: "Estas seguro?",
            text: "No podras recuperar la tarea eliminada!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, estoy seguro!",
            cancelButtonText: "Cancelar",
        }).then((result) => {
            if (result.value) {
                fetchData(`/tareas/${id}`, "delete").then(data => {
                    if (data.status === "success") {
                        tareaHTML.parentElement.removeChild(tareaHTML);
                        actualizarAvance();
                    }
                })



                Swal.fire("Borrado!", "Tu tarea ha sido borrado.", "success");
            }

        });
    }
};

export {
    cambiarEstadoTarea,
}