export interface CasoClinico {
  id?: number,
  Nombre?: string
}

export interface SubCasoClinico {
  id?: number,
  Nombre?: string,
  CasoClinicoId?: number
}

export interface SubCasoClinicoDetalle {
  id?: number,
  Nombre?: string,
  CasoClinicoId?: number,
  casoclinic?: {
    id?: number,
    Nombre?: string
  }
}

export interface Diente {
  id?: number,
  Nombre?: string,
  Ubicacion?: string,
  Tipo?: string,
  Lado?: string,
  Posicion?: string,
  Raiz?: string,
  Estado?: string
}

export interface CasoDiente {
  id?: number,
  Nombre?: string,
  Foto?: string,
  SubCasoClinicoId?: number,
  DienteId?: number
}

export interface CasoDienteDetallado {
  id?: number,
  Nombre?: string,
  Foto?: string,
  SubCasoClinicoId?: number,
  DienteId?: number,
  subcasoclinico?: {
    id?: number,
    Nombre?: string,
    CasoClinicoId?: number,
    casoclinic?: {
      id?: number,
      Nombre?: string
    }
  },
  diente?: {
    id?: number,
    Nombre?: string,
    Ubicacion?: string,
    Tipo?: string,
    Lado?: string,
    Posicion?: string,
    Raiz?: string,
    Estado?: string
  }
}

export interface Odontograma {
  id?: number,
  Nombre?: string,
  Estado?: string,
  Validacion?: string,
  Tipo?: string,
  Numero?: string,
  PacienteId?: number
  // CitaId?: number
}

export interface OdontogramaDetalle {
  id?: number,
  Nombre?: string,
  Estado?: string,
  Numero?: string,
  PacienteId?: number,
  paciente?: {
    id?: number,
    Nombre?: string,
    ApellidoPaterno?: string,
    ApellidoMaterno?: string,
    NumeroHistoriaClinica?: string,
    FechaNacimiento?: Date,
    Foto?: string,
    NroCelular?: string,
    Correo?: string,
    EstadoCivil?: string,
    Sexo?: string,
    Ocupacion?: string,
  }
}

export interface MapeoOdontograma {
  id?: number,
  Nombre?: string,
  OdontogramaId?: number,
  CasodienteId?: number,
}

export interface MapeoOdontogramaDetalle {
  id?: number,
  Nombre?: string,
  OdontogramaId?: number
  CasodienteId?: number,
  casodiente?: {
    id?: number,
    Nombre?: string,
    Foto?: string,
    SubCasoClinicoId?: number,
    DienteId?: number,
    subcasoclinico?: {
      id?: number,
      Nombre?: string,
      CasoClinicoId?: number,
      casoclinic?: {
        id?: number,
        Nombre?: string
      }
    },
    diente?: {
      id?: number,
      Nombre?: string,
      Ubicacion?: string,
      Tipo?: string,
      Lado?: string,
      Posicion?: string,
      Raiz?: string,
      Estado?: string
    }
  },
  odontograma?: {
    id?: number,
    Nombre?: string,
    Estado?: string,
    Numero?: string,
    PacienteId?: number,
    paciente?: {
      id?: number,
      Nombre?: string,
      ApellidoPaterno?: string,
      ApellidoMaterno?: string,
      NumeroHistoriaClinica?: string,
      FechaNacimiento?: Date,
      Foto?: string,
      NroCelular?: string,
      Correo?: string,
      EstadoCivil?: string,
      Sexo?: string,
      Ocupacion?: string,
    }
  }
}

export interface CarasDiente {
  id?: number,
  Mesial?: string,
  Distal?: string,
  Vestibular?: string,
  Lingual?: string,
  Palatina?: string,
  MapeoId?: number
}
