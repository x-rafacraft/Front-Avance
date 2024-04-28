export interface Periodo {
  id?: number,
  Nombre?: string,
  Empieza?: Date,
  Termina?: Date,
  SedeId?: number
}

export interface Periodo {
  id?: number,
  Nombre?: string,
  Empieza?: Date,
  Termina?: Date,
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
      RUC?: string,
      RazonSocial?: string,
      Representante?: string
    }
  }
}

