export interface Hospede {
  hospedeId?: number;
  nome?: string;
  cpf?: string;
  rg?: string;
  sexo?: string;
  dataNascimento?: string | Date;
  email?: string;
  telefone?: string;
  criadoPorId?: number;
  criadoPorNome?: string;
  criadoEm?: Date;
  atualizadoEm?: Date;
}

export interface ErrosHospede {
  hospedeId?: boolean;
  nome?: boolean;
  cpf?: boolean;
  rg?: boolean;
  sexo?: boolean;
  dataNascimento?: boolean;
  email?: boolean;
  telefone?: boolean;

  hospedeIdMensagem?: string[];
  nomeMensagem?: string[];
  cpfMensagem?: string[];
  rgMensagem?: string[];
  sexoMensagem?: string[];
  dataNascimentoMensagem?: string[];
  emailMensagem?: string[];
  telefoneMensagem?: string[];
}
