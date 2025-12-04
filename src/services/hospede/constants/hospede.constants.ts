import { criarMensagemOperacao } from "../../constant/mensagem.operacao";

const ENTITY_NAME = "Hospede";

export const HOSPEDE = {
  ENTITY: ENTITY_NAME,

  ALIAS: "hospede",

  DADOS_INCIAIS: {
    hospedeId: 0,
    nome: "",
    cpf: "",
    rg: "",
    sexo: "",
    dataNascimento: "",
    email: "",
    telefone: "",
  },

  FIELDS: {
    CODIGO: "hospedeId",
    ID: "hospedeId",
    NOME: "nome",
    CPF: "cpf",
    RG: "rg",
    SEXO: "sexo",
    DATA_NASCIMENTO: "dataNascimento",
    EMAIL: "email",
    TELEFONE: "telefone",
  } as const,

  LABEL: {
    NOME: "Nome",
    CPF: "CPF",
    RG: "RG",
    SEXO: "Sexo",
    DATA_NASCIMENTO: "Data de Nascimento",
    EMAIL: "Email",
    TELEFONE: "Telefone",
  },

  VALIDATION: {
    EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    CPF_REGEX: /^\d{11}$/,
    RG_REGEX: /^\d{9}$/,
    TELEFONE_REGEX: /^\d{10,15}$/,
  },

  TITULO: {
    LISTA: `Lista de ${ENTITY_NAME}`,
    CRIAR: `Novo ${ENTITY_NAME}`,
    ATUALIZAR: `Atualizar ${ENTITY_NAME}`,
    EXCLUIR: `Excluir ${ENTITY_NAME}`,
    CONSULTAR: `Consultar ${ENTITY_NAME}`,
  },

  INPUT_ERROR: {
    ID: {
      BLANK: `O código de identificação do ${ENTITY_NAME} deve ser informado`,
      VALID: `Informe um código de identificação válido para ${ENTITY_NAME}`,
    },
    NOME: {
      BLANK: `O nome de ${ENTITY_NAME} deve ser informado`,
      VALID: `Informe um nome válido para ${ENTITY_NAME}`,
      MAX_LEN: `O nome de ${ENTITY_NAME} deve ter no máximo 100 caracteres`,
      MIN_LEN: `O nome de ${ENTITY_NAME} deve ter no mínimo 3 caracteres`,
      STRING: `O nome de ${ENTITY_NAME} deve ser um texto`,
    },
    CPF: {
      BLANK: `O CPF de ${ENTITY_NAME} deve ser informado`,
      VALID: `Informe um CPF válido (11 dígitos)`,
      STRING: `O CPF de ${ENTITY_NAME} deve ser um texto`,
    },
    RG: {
      BLANK: `O RG de ${ENTITY_NAME} deve ser informado`,
      VALID: `Informe um RG válido (9 dígitos)`,
      STRING: `O RG de ${ENTITY_NAME} deve ser um texto`,
    },
    SEXO: {
      BLANK: `O sexo de ${ENTITY_NAME} deve ser informado`,
      VALID: `Informe um sexo válido (M ou F)`,
    },
    DATA_NASCIMENTO: {
      BLANK: `A data de nascimento de ${ENTITY_NAME} deve ser informada`,
      VALID: `Informe uma data de nascimento válida`,
    },
    EMAIL: {
      BLANK: `O email de ${ENTITY_NAME} deve ser informado`,
      VALID: `Informe um email válido para ${ENTITY_NAME}`,
      STRING: `O email de ${ENTITY_NAME} deve ser um texto`,
    },
    TELEFONE: {
      BLANK: `O telefone de ${ENTITY_NAME} deve ser informado`,
      VALID: `Informe um telefone válido (10-15 dígitos)`,
      STRING: `O telefone de ${ENTITY_NAME} deve ser um texto`,
    },
  },

  OPERACAO: criarMensagemOperacao(ENTITY_NAME),
};
