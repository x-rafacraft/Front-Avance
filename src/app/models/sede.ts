export interface Sede {
  id?: number,
  Nombre?: string,
  Direccion?: string,
  Celular?: string,
  Correo?: string,
  TipoSede?: string,
  EmpresaId?: number
}

export interface SedeDetalle {
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
}
