import { validarCampoVacio, validarCaracteres, validarPrecio} from "./validaciones.js";
import { crearTabla } from "./tabla.js";
import { Anuncio_Mascota } from "./anuncio_mascota.js";
//REFERENCIAS Y LOCAL:
const $formulario = document.forms[0];
const $divTabla = document.querySelector(".divTabla");
const ventasList = JSON.parse(localStorage.getItem("ventas")) || [];
//SPINNER:
const $spinner = document.createElement("img");
$spinner.setAttribute("src", "./imagenes/spinner.gif");
$spinner.setAttribute("height", "45px");
$spinner.setAttribute("width", "45px");
//BOTONES: 
const $btnEliminar = document.querySelector("#btnDelete");
$btnEliminar.setAttribute("disabled", "");
const $btnCancelar = document.querySelector("#btnCancelar");
$btnCancelar.setAttribute("disabled", "");
const $btnSubmit = document.querySelector("#btnSave");

const $divMensaje = document.querySelector(".Mensaje");

//FUNCIONES:
function actualizarTabla(){

    let container = document.querySelector(".spin");
    while($divTabla.hasChildNodes()){
        
        $divTabla.removeChild($divTabla.firstElementChild);
    }
    const data = JSON.parse(localStorage.getItem("ventas"));
    
    container.appendChild($spinner);
    setTimeout(()=>{

        container.removeChild($spinner);
        if(data){
            $divTabla.appendChild(crearTabla(data));
        }
    }, 3000);
}

actualizarTabla(ventasList);

function cargarFormulario(anuncio){

    const {txtId, txtTitulo, txtDescri, rdoTipo, txtPrecio, txtRaza, txtFecha, txtVacunas} = $formulario;
    txtId.value=anuncio.id;
    txtTitulo.value=anuncio.titulo;
    txtDescri.value=anuncio.descripcion;
    rdoTipo.value=anuncio.animal;
    txtPrecio.value=anuncio.precio;
    txtRaza.value=anuncio.raza;
    txtFecha.value=anuncio.fecha;
    txtVacunas.value=anuncio.vacunas;
}

function handlerCreate(nuevoAnuncio){
    ventasList.push(nuevoAnuncio);
    actualizarStorage(ventasList);
    actualizarTabla();
}

function handlerUpdate(anuncioEditado){
    let indice = ventasList.findIndex((venta)=>{
        return venta.id == anuncioEditado.id;
    });
    ventasList.splice(indice, 1);
    ventasList.push(anuncioEditado);
    actualizarStorage(ventasList);
    actualizarTabla();
}

function handlerDelete(id){

    let indice = ventasList.findIndex((venta)=>{
        return venta.id == id;
    });
    ventasList.splice(indice, 1);
    actualizarStorage(ventasList);
    actualizarTabla();
}

function actualizarStorage(data)
{
   localStorage.setItem("ventas", JSON.stringify(data));
}

function limpiarForm(){

    $formulario.txtId.value="";
    $formulario.reset();
    $btnEliminar.setAttribute("disabled", "");
    $btnCancelar.setAttribute("disabled", "");
    $btnSubmit.setAttribute("value", "Guardar");
}

//ACCIONES:
window.addEventListener("click", (e)=>{
    if(e.target.matches("td")){
        console.log(e.target.parentElement.dataset.id);
        let id = e.target.parentElement.dataset.id;
        cargarFormulario(ventasList.find((anuncio) => anuncio.id == id));
        $btnEliminar.removeAttribute("disabled");
        $btnCancelar.removeAttribute("disabled");
        $btnSubmit.setAttribute("value", "Modificar");
    }
    else if(e.target.matches("#btnDelete")){
        handlerDelete(parseInt($formulario.txtId.value));
        mensajePerso("Se Elimino el anuncio");
        limpiarForm();
    }
    else if(e.target.matches("#btnCancelar")){
        limpiarForm();
    }
});

$formulario.addEventListener("submit", (e)=>{
    e.preventDefault();
    const {txtId, txtTitulo, txtDescri, rdoTipo, txtPrecio, txtRaza, txtFecha, txtVacunas} = $formulario;
    let dato = "";

    const box1 = document.getElementById("txtBox1");
    const box2 = document.getElementById("txtBox2");

    if(box1.checked){
        
        dato = box1.value;
    }
    else if(box2.checked){
        dato = box2.value;
    }
    else{
        dato = "No se especifico";
    }

    
    if(validarCampoVacio([txtTitulo, txtDescri, txtPrecio, txtFecha, txtVacunas, dato]) == true && validarCaracteres([txtTitulo, txtDescri]) && validarPrecio(txtPrecio)){
        
        const nuevoAnuncio = new Anuncio_Mascota(txtId.value, txtTitulo.value, txtDescri.value, rdoTipo.value, txtPrecio.value, txtRaza.value, txtFecha.value, txtVacunas.value, dato);
        if(nuevoAnuncio.id == ""){ 
        
            nuevoAnuncio.id=Date.now();
            handlerCreate(nuevoAnuncio);
            limpiarForm();
            mensajePerso("Se añadio el anuncio");
        
        }
        else{
           
            handlerUpdate(nuevoAnuncio);
            mensajePerso("Se modifico el anuncio");
            limpiarForm();
        }
    }
    else{
        alert("Error, por favor verifique que todos los campos esten completos, que el titulo y descripcion sean menores a 25 caracters y que el precio minimo sea de $0 y el maximo de $50000");
        limpiarForm();
    }
});



function mensajePerso(texto){

    const mensaje = document.createElement("h2");
    mensaje.textContent = texto;
    $divMensaje.appendChild(mensaje);

    setTimeout(()=>{
        $divMensaje.removeChild(mensaje);
    }, 5000);

}

