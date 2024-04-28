export interface Usuario {
  id?: number,
  Nombre?: string,
  Apellido?: string,
  Celular?: string,
  Correo?: string,
  NumDoc?: string,
  Contra?: string,
  Foto?: string,
  Pago?: string,
  Codigo?: string,
  Activo?: boolean,
  Genero?: string,
  TipoDocumento?: string,
  RestablecerContra?: string,
  Rol?: string,
  SedeId?: number
}
export interface UsuarioDetalle {
  id?: number,
  Nombre?: string,
  Apellido?: string,
  Celular?: string,
  Correo?: string,
  NumDoc?: string,
  Contra?: string,
  Foto?: string,
  Pago?: string,
  Codigo?: string,
  Activo?: boolean,
  Genero?: string,
  TipoDocumento?: string,
  RestablecerContra?: string,
  Rol?: string,
  SedeId?: number,
  sede?: {
    id?: number,
    Nombre?: string,
    Direccion?: string,
    Celular?: string,
    Correo?: string,
    TipoSede?: string,
    EmpresaId?: number,
    empresa?: {
      Ruc?: string,
      RazonSocial?: string,
      Representante?: string
    }
  },
}

export interface UsuarioRecover {
  ContraseniaAnterior?: string,
  ContraseniaActual?: string,
}
