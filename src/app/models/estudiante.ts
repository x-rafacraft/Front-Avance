export interface Estudiante {
  id?: number,
  NombreCompleto?: string,
  Semestre?: string,
  Firma?: string,
  UsuarioId?: number
}
export interface EstudianteDetalle {
  id?: number,
  NombreCompleto?: string,
  Semestre?: string,
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
