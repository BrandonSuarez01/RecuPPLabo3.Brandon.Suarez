import Anuncio from "./anuncio.js";

export class Anuncio_Mascota extends Anuncio
{
    constructor(id, titulo, descripcion, animal, precio, raza, fecha, vacunas, detalles)
    {
        super(id, titulo, descripcion, animal, precio, detalles)
        this.raza=raza;
        this.fecha=fecha;
        this.vacunas=vacunas;
    }
}

