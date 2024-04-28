export interface Operatorio {
  id?: number,
  Docente?: string,
  MotivoConsulta?: string,
  DiagnosticoDefinitivo?: string,
  PacienteId?: number
}

export interface Prueba {
  id?: number,
  Nombre?: string
}

export interface PruebaOperaria {
  id?: number,
  Nombre?: string,
  PruebaId?: number,
  OperatoriaId?: number
}

export interface TecnicaRadiografica {
  id?: number,
  NumeroPieza?: string,
  Detalle?: string,
  Tipo?: string,
  OperatoriaId?: number
}

export interface PlandeTrabajo {
  id?: number,
  Cantidad?: string,
  TratamientoRestauracionconMaterialAdhesivo?: string,
  PiezaNumero?: string,
  TipodeMaterialRestaurador?: string,
  FechaRegistro?: Date,
  OperatoriaId?: number
}
