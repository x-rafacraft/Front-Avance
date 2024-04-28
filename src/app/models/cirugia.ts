export interface Cirugia {
  id?: number,
  MotivoConsulta?: string,
  DiagnosticoCIE11?: string,
  Pronostico?: string,
  PlandeTrabajo?: string,
  Cirujano?: string,
  Asistente?: string,
  Circulante?: string,
  HoradeInicioCx?: string,
  HoradeTerminoCx?: string,
  FechaAlta?: Date,
  FechaRegistro?: Date,
  Observaciones?: string,
  EvolucionDiaria?: string,
  EstudianteaCargo?: string,
  FacultativoaCargo?: string,
  PacienteId?: number
}

export interface RadiografiaCirugia {
  id?: number,
  Nombre?: string,
  Fecha?: Date,
  Foto?: string,
  Interpretacion?: string,
  FechaRegistro?: Date,
  CirugiaId?: number
}

export interface InformeQuirurgico {
  id?: number,
  Nombre?: string,
  Detalle?: string,
  CirugiaId?: number
}

export interface EstadoPostquirurgico {
  id?: number,
  Fecha?: Date,
  Nombre?: string,
  Detalle?: string,
  CirugiaId?: number
}
