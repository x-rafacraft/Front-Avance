export interface Docente {
    id?: number,
    NombreCompleto?: string,
    Colegiatura?: string,
    FirmaDigital?: string,
    UsuarioId?: number
}

export interface DocenteDetalle {
  id?: number,
  NombreCompleto?: string,
  Colegiatura?: string,
  FirmaDigital?: string,
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
