function validarCampoVacio(arrayInputs){
    let validado=true;
    if(Array.isArray(arrayInputs)){
        for(let i =0;i<arrayInputs.length; i++){
            if(arrayInputs[i].value == ""){
                return false;
            }
        }
    }
    return validado;
}

function validarCaracteres(arrayImputs){
    let retorno = true;

    if(Array.isArray(arrayImputs))
    {
        for(let i = 0; i < arrayImputs.length; i++){
           if( arrayImputs[i].value.length > 25){
                retorno=false;
           }
        }
    }
    return retorno;
}

function validarPrecio(precio){
    let retorno = false;
    if(parseFloat(precio.value) > -1 && parseFloat(precio.value) < 50001){
        retorno = true;
    }
    return retorno;
}

function validarSeleccion(seleccion){
    return seleccion.options.selectedIndex == 1 || seleccion.options.selectedIndex == 2;
}

function validarFecha(fecha){
    let patron =/^(((0[1-9]|[12][0-9]|3[01])[- /.](0[13578]|1[02])|(0[1-9]|[12][0-9]|30)[- /.](0[469]|11)|(0[1-9]|1\d|2[0-8])[- /.]02)[- /.]\d{4}|29[- /.]02[- /.](\d{2}(0[48]|[2468][048]|[13579][26])|([02468][048]|[1359][26])00))$/;
    return patron.test(fecha.value);
}

export {validarCampoVacio, validarCaracteres, validarPrecio, validarSeleccion, validarFecha};