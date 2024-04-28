export interface Paciente {
  id?: number,
  FechaCreacion?: Date,
  HoraCreacion?: Date,
  NumeroHistoriaClinica?: string,
  Ectoscopia?: string,
  Nombre?: string,
  ApellidoPaterno?: string,
  ApellidoMaterno?: string,
  Sexo?: string,
  Lugar?: string,
  Domicilio?: string,
  FechaNacimiento?: Date,
  EstadoCivil?: string,
  NroCelular?: string,
  Correo?: string,
  Raza?: string,
  GradoInstruccion?: string,
  Ocupacion?: string,
  Responsable?: string,
  ParentescoconResponsable?: string,
  DomicilioResponsable?: string,
  CelularResponsable?: string,
  Acompaniante?: string,
  EnfermedadActual?: string,
  MotivoConsulta?: string,
  FuncionesBiologicas?: string,
  Orina?: string,
  Apetito?: string,
  Suenio?: string,
  Deposiciones?: string,
  Sed?: string,
  Alergias?: string,
  AntecedentesAlergicos?: string,
  AntecedentesPersonal?: string,
  AntecedentesFamiliar?: string,
  AntecedentesPatologicos?: string,
  UsuarioId?: number,
  SedeId?: number
}

export interface PacienteDetalle {
  id?: number,
  FechaCreacion?: Date,
  HoraCreacion?: Date,
  NumeroHistoriaClinica?: string,
  Ectoscopia?: string,
  Nombre?: string,
  ApellidoPaterno?: string,
  ApellidoMaterno?: string,
  Sexo?: string,
  Lugar?: string,
  Domicilio?: string,
  FechaNacimiento?: Date,
  EstadoCivil?: string,
  NroCelular?: string,
  Correo?: string,
  Raza?: string,
  GradoInstruccion?: string,
  Ocupacion?: string,
  Responsable?: string,
  ParentescoconResponsable?: string,
  DomicilioResponsable?: string,
  CelularResponsable?: string,
  Acompaniante?: string,
  EnfermedadActual?: string,
  MotivoConsulta?: string,
  FuncionesBiologicas?: string,
  Orina?: string,
  Apetito?: string,
  Suenio?: string,
  Deposiciones?: string,
  Sed?: string,
  Alergias?: string,
  AntecedentesAlergicos?: string,
  AntecedentesPersonal?: string,
  AntecedentesFamiliar?: string,
  AntecedentesPatologicos?: string,
  UsuarioId?: number,
  SedeId?: number,
  // estudiante?: {
  //   id?: number,
  //   NombreCompleto?: string,
  //   Semestre?: string,
  //   Firma?: string
  // }
}

