const alerta = document.querySelector("#alerta");
const msgerror = document.getElementById("error-create");


const enviarDatos = async (e) => {
    e.preventDefault();

    const objeto = campos(e);
    // console.log(objeto);
    if (objeto.status === "error") {
        if (alerta) {
            alerta.classList.remove("oculto");
            alerta.classList.add("error");
            alerta.textContent = objeto.message;
            return;
        }
    }

    const data = await fetchData(
        "/nuevo-proyecto",
        "POST",
        objeto
    );

    if (data.status === "success") {
        location.href = "/";
    }
    console.log(data);
};

const updateDatos = async (e) => {
    e.preventDefault();
    const id = location.href.split("/")[5];
    const objeto = campos(e);
    const data = await fetchData(
        `/nuevo-proyecto/${id}`,
        "POST",
        objeto
    );

    if (data.status === "success") {
        location.href = "/";
    }
};
const eliminarData = (e) => {
    const urlProyecto = e.target.dataset.proyectoUrl;

    Swal.fire({
        title: "Estas seguro?",
        text: "No podras recuperar la informacion!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, estoy seguro!",
        cancelButtonText: "Cancelar",
    }).then((result) => {
        if (result.value) {
            fetchData(`/proyectos/${urlProyecto}`, "delete");

            Swal.fire("Borrado!", "Tu proyecto ha sido borrado.", "success");
        }
        setTimeout(() => {
            location.href = "/";
        }, 3000);
    });
};
const campos = (e) => {
    const index = e.target.length - 1;
    let llaves = [];
    let valores = [];

    for (let i = 0; i < index; i++) {
        if (e.target[i].id) {
            llaves.push(e.target[i].id);
        } else {
            llaves.push(e.target[i].name);
        }
        valores.push(e.target[i].value.trim());
    }
    let campo = valores.includes("");

    if (campo) {
        return (campo = {
            status: "error",
            message: "uno o mas campos estan vacios",
        });
    }
    let objeto = {
        ...valores,
    };
    for (let val in objeto) {
        objeto[`${llaves[val]}`] = valores[val];
        delete objeto[val];
    }
    return objeto;
};

const fetchData = async (url, verbo = "GET", datos) => {
    let res;
    console.log(verbo)
    // let data;
    if (
        verbo.toUpperCase() === "GET" ||
        verbo.toUpperCase() === "DELETE" ||
        verbo.toUpperCase() === "PATCH"
    ) {
        res = await fetch(url, {
            method: verbo.toUpperCase()
        });
    } else {
        res = await fetch(url, {
            method: verbo.toUpperCase(),
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(datos),
        });
    }
    // if (!res.redirected) {
    //     data = res.json();
    //     return data;
    // }

    const data = res.json();
    return data;
};

const removeAlert = () => {
    if (alerta) {
        alerta.classList.add("oculto");
    } else if (msgerror) {
        msgerror.classList.add("oculto");
    }
};


//tareas
const agregarTareas = async (e) => {
    e.preventDefault();
    const url = e.target.parentElement.children[4].children[1].dataset.proyectoUrl;
    // const url = e.target.parentElement;

    console.log(url);
    const objeto = campos(e);
    console.log(objeto);

    const data = await fetchData(`/proyectos/${url}`, "post", objeto);

    console.log(data);

    if (data.status === "success") {
        location.reload();
        e.target.reset();
    }

};
export {
    enviarDatos,
    removeAlert,
    updateDatos,
    eliminarData,
    agregarTareas,
    fetchData,
    campos
};