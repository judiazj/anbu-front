export interface Shinobi {
    _id: string;
    alias: string;
    fecha_ingreso: Date;
    password: string;
    rango: string;
    estado: string;
    img?: string;
}

export interface UpdateShinobi extends Partial<Pick<Shinobi, 'estado' | 'img'>> { }