//CREAR CABECERA:
function crearCabecera(data){
    const cabecera = document.createElement("thead");
    const tr = document.createElement("tr");

    for(const key in data){
        if(key!="id"){
            const th=document.createElement("th");
            th.textContent=key;//pongo el contenido de las key en la tabla.
            tr.appendChild(th);//añado la th a su casilla
        }
    }
    cabecera.appendChild(tr);//meto la tr en la tabla general
    console.log("cabecera creada");
    return cabecera;
}
//CREAR CUERPO:
function crearCuerpo(data){
    const cuerpo = document.createElement("tbody");

    data.forEach(element => {
        const fila = document.createElement("tr");
        for(const atributo in element){
            if(atributo === "id"){
                fila.setAttribute("data-id", element[atributo]);//seteo el id de la key como el id de esa parte de la tabla.
                continue;
            }
            const td= document.createElement("td");
            td.textContent = element[atributo];
            fila.appendChild(td);
            fila.classList.add("puntero");
        }

        //const filas = cuerpo.children;
        cuerpo.appendChild(fila);
    });
    console.log("Cuerpo creado");
    return cuerpo;
}
//CREAR TABLA:
export function crearTabla(data){
    if(!Array.isArray(data) && data != null){
        return null;
    }
    const tabla = document.createElement("table");
    tabla.appendChild(crearCabecera(data[0]));
    tabla.appendChild(crearCuerpo(data));
    return tabla;
}
