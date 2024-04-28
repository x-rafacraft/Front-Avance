export interface Endodoncia {
  id?: number,
  Fecha?: Date,
  Docente?: string,
  Observaciones?: string,
  Operador?: string,
  MotivoConsulta?: string,
  PiezaDental?: string,
  ECPercucion?: string,
  ECCavidad?: string,
  ECCambiodeColor?: string,
  ECTejidosBlandos?: string,
  ECTermoreaccion?: string,
  ECElectroReaccion?: string,
  ERCavidad?: string,
  ERTratamientoPrevio?: string,
  ERPeriodonto?: string,
  ERLesionesPeriauriculares?: string,
  ERNumerodeConductos?: string,
  ERPrecipitacionesCalcicas?: string,
  STAnestesia?: string,
  STAAislamientoAbsoluto?: string,
  FechaRegistro?: Date,
  PacienteId?: number
}

export interface ManifestaciondelDolor {
  id?: number,
  Nombre?: string
}

export interface ManifestacionEndodoncia {
  id?: number,
  Nombre?: string,
  EndodonciaId?: number,
  ManifestaciondelDolorId?: number
}

export interface Conductometria {
  id?: number,
  Conducto?: string,
  LongRx?: string,
  LongTrabajo?: string,
  IInicial?: string,
  Referencia?: string,
  FechaRegistro?: Date,
  EndodonciaId?: number
}

export interface PreparacionQuimicoMecanica {
  id?: number,
  Conducto?: string,
  Tecnica?: string,
  IFinal?: string,
  UltimaLongitudTrabajo?: string,
  Referencia?: string,
  FechaRegistro?: Date,
  EndodonciaId?: number
}

export interface ObturaciondeConductos {
  id?: number,
  Conducto?: string,
  Tecnica?: string,
  UltimaLongitudTrabajo?: string,
  ConoMaestro?: string,
  Referencia?: string,
  FechaRegistro?: Date,
  EndodonciaId?: number
}

export interface RadiografiaEndodoncia {
  id?: number,
  Fecha?: Date,
  Foto?: string,
  Interpretacion?: string,
  FechaRegistro?: Date,
  EndodonciaId?: number
}
