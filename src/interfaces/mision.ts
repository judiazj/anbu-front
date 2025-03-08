
export type EstadoMision = 'pendiente' | 'en_curso' | 'completada' | 'fallida';
export type RangoMision = 'A' | 'B' | 'C' | 'D' | 'S';

export interface ShinobiMisions {
    misionesCompletas: Mision[];
    misionesFallidas: Mision[];
    misionesRetrasadas: Mision[];
    misionesPendientes: Mision[];
}


export interface Mision {
    _id: string;
    titulo: string;
    descripcion: string;
    id_cazador?: string;
    fecha_inicio: Date;
    fecha_fin: Date;
    estado: EstadoMision;
    rango: RangoMision;
    id_hokage: string;
}

export interface CreateMision extends Pick<Mision, 'titulo' | 'descripcion' | 'rango' | 'id_hokage'> {

}