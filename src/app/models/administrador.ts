export interface Administrador {
    id?: number,
    NombreCompleto?: string,
    CodigoAcceso?: string,
    UsuarioId?: number
}

export interface AdministradorDetalle {
  id?: number,
  NombreCompleto?: string,
  CodigoAcceso?: string,
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
