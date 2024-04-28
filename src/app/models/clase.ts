export interface Clase {
    id?: number,
    Nombre?: string,
    Salon?: string,
    Horario?: string,
    idPeriodo?: number,
    idCurso?: number,
    idDocente?: number
}

export interface ClaseDetalle {
    id?: number,
    Nombre?: string,
    Salon?: string,
    Horario?: string,
    idPeriodo?: number,
    idCurso?: number,
    idDocente?: number,
    periodo?: {
        Nombre?: string,
        Empieza?: Date,
        Termina?: Date,
        SedeId?: number
    },
    curso?: {
        Name?: string,
        Semestre?: string,
        Malla?: string,
    },
    profesor?: {
        NombreCompleto?: string,
    },
}
