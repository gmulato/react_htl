export interface Quarto {
  quartoId?: string;
  identificador?: string;
  tipo?: string;
  valorDiaria?: string;
  inativo?: boolean;
}

export interface ErrosQuarto {
  quartoId?: boolean;
  identificador?: boolean;
  tipo?: boolean;
  valorDiaria?: boolean;
  inativo?: boolean;

  idQuartoMensagem?: string[];
  codQuartoMensagem?: string[];
  nomeQuartoMensagem?: string[];
}
