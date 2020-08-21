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
        verbo.toUpperCase() === "DELETE"
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

    const data = res.json();
    return data;
};