export interface Integrante {
  id?: number,
  Nombre?: string,
  ClaseId?: number,
  EstudianteId?: number
}

export interface IntegranteDetalle {
  id?: number,
  Nombre?: string,
  ClaseId?: number,
  EstudianteId?: number,
  clase?: {
    id?: number,
    Name?: string,
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
  },
  estudiante?: {
    d?: number,
    NombreCompleto?: string,
    Firma?: string,
    UsuarioId?: number,
    usuario?: {
      id?: number,
      Nombre?: string,
      Apellido?: string,
      Celular?: string,
      Correo?: string,
      NumDoc?: string,
      Foto?: string,
      Codigo?: string,
      Estado?: string,
      Genero?: string,
      TipoDocumento?: string,
      Condicion?: string,
      Rol?: string,
      SedeId?: number,
      sede?: {
        Nombre?: string
      },
    }
  }
}
