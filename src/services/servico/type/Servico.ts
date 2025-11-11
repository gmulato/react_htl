export interface Servico {
  servicoId?: string;
  nome?: string;
  descricao?: string;
  valor?: string;
}

export interface ErrosServico {
  servicoId?: boolean;
  nome?: boolean;
  descricao?: boolean;
  valor?: boolean;

  idServicoMensagem?: string[];
  codServicoMensagem?: string[];
  nomeServicoMensagem?: string[];
}
