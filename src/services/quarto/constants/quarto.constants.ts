import { criarMensagemOperacao } from "../../constant/mensagem.operacao";

const ENTITY_NAME = "Quarto";

export const QUARTO = {
  ENTITY: ENTITY_NAME,

  ALIAS: "quarto",

  DADOS_INCIAIS: {
    quartoId: "",
    identificador: "",
    tipo: "",
    valorDiaria: "",
    inativo: false,
  },

  FIELDS: {
    ID: "quartoId",
    IDENTIFICADOR: "identificador",
    TIPO: "tipo",
    VALOR_DIARIA: "valorDiaria",
    INATIVO: "inativo",
  } as const,

  LABEL: {
    IDENTIFICADOR: "Identificador",
    TIPO: "Tipo",
    VALOR_DIARIA: "Valor Diária",
    INATIVO: "Inativo",
  },

  TITULO: {
    LISTA: `Lista de ${ENTITY_NAME}`,
    CRIAR: `Nova ${ENTITY_NAME}`,
    ATUALIZAR: `Atualizar ${ENTITY_NAME}`,
    EXCLUIR: `Excluir ${ENTITY_NAME}`,
    CONSULTAR: `Consultar ${ENTITY_NAME}`,
  },

  INPUT_ERROR: {
    NOME: {
      BLANK: `O nome de ${ENTITY_NAME} deve ser informado`,
      VALID: `Informe um nome válido para ${ENTITY_NAME}`,
      MAX_LEN: `O nome de ${ENTITY_NAME} deve ter no máximo 20 caracteres`,
      MIN_LEN: `O nome de ${ENTITY_NAME} deve ter no mínimo 6 caracteres `,
      STRING: `O nome de ${ENTITY_NAME} deve ser um texto`,
    },
    DESC: {
      BLANK: `A descrição de ${ENTITY_NAME} deve ser informada`,
      VALID: `Informe uma descrição válida para ${ENTITY_NAME}`,
      MAX_LEN: `A descrição de ${ENTITY_NAME} deve ter no máximo 20 caracteres`,
      MIN_LEN: `A descrição de ${ENTITY_NAME} deve ter no mínimo 6 caracteres `,
      STRING: `A descrição de ${ENTITY_NAME} deve ser um texto`,
    },
    VALOR: {
      BLANK: `O valor de ${ENTITY_NAME} deve ser informado`,
      VALID: `Informe um valor válido para ${ENTITY_NAME}`,
      MAX_LEN: `O valor de ${ENTITY_NAME} deve ter no máximo 20 caracteres`,
      MIN_LEN: `O valor de ${ENTITY_NAME} deve ter no mínimo 6 caracteres `,
      STRING: `O valor de ${ENTITY_NAME} deve ser um texto`,
    },
  },

  OPERACAO: criarMensagemOperacao(ENTITY_NAME),
};
