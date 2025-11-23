export interface Funcionario {
  funcionarioId?: number;
  nome?: string;
  email?: string;
  senha?: string;
  ativo?: number;
}

export interface ErrosFuncionario {
  funcionarioId?: boolean;
  nome?: boolean;
  email?: boolean;
  senha?: boolean;

  funcionarioIdMensagem?: string[];
  nomeMensagem?: string[];
  emailMensagem?: string[];
  senhaMensagem?: string[];
}
