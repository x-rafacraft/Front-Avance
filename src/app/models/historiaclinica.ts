export interface ExamenGeneral {
  id?: number,
  Peso?: string,
  Talla?: string,
  IndiceMasaCorporal?: string,
  Piel?: string,
  AnexoCabello?: string,
  AnexoUnias?: string,
  PresionArterial?: string,
  FrecuenciaRespiratoria?: string,
  Pulso?: string,
  Temperatura?: string,
  PacienteId?: number
}
export interface ResumenAnamnesis {
  id?: number,
  Contenido?: string,
  FechaRegistro?: Date,
  PacienteId?: number
}

export interface DiagnosticoPresuntivo {
  id?: number,
  Diagnostico?: string,
  FechaRegistro?: Date,
  PacienteId?: number
}

export interface ExamenesAuxiliares {
  id?: number,
  Contenido?: string,
  FechaRegistro?: Date,
  PacienteId?: number
}

export interface DiagnosticoDefinitivo {
  id?: number,
  Diagnostico?: string,
  FechaRegistro?: Date,
  PacienteId?: number
}

export interface Epicrisis {
  id?: number,
  Contenido?: string,
  FechaRegistro?: Date,
  PacienteId?: number
}

export interface PlanyCronograma {
  id?: number,
  Fecha?: Date,
  Resumen?: string,
  Especificaciones?: string,
  Observaciones?: string,
  FechaRegistro?: Date,
  PacienteId?: number
}

export interface NotasEvolutivas {
  id?: number,
  Fecha?: Date,
  Tratamiento?: string,
  Firma?: string,
  FechaRegistro?: Date,
  PacienteId?: number
}

export interface Interpretacion {
  id?: number,
  RadiografiaPanoramica?: string,
  HemogramaCompleto?: string,
  TiempoSangria?: string,
  TiempoCoagulacion?: string,
  FechaRegistro?: Date,
  PacienteId?: number
}
