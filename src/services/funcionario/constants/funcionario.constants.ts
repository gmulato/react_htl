import { criarMensagemOperacao } from "../../constant/mensagem.operacao";


const ENTITY_NAME = "Funcionario";

export const FUNCIONARIO = {
  ENTITY: ENTITY_NAME,

  ALIAS: "funcionario",

  DADOS_INCIAIS: {
    funcionarioId: 0,
    nome: "",
    email: "",
    senha: "",
    ativo: 1,
  },

  FIELDS: {
    CODIGO: "funcionarioId",
    ID: "funcionarioId",
    NOME: "nome",
    EMAIL: "email",
    SENHA: "senha",
  } as const,

  LABEL: {
    NOME: "Nome",
    EMAIL: "Email",
    SENHA: "Senha"
  },

  VALIDATION: {
    EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    SENHA_REGEX: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,20}$/, // letras e números, 6-20 chars
    SENHA_MIN_LEN: 6,
    SENHA_MAX_LEN: 20,
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
      MAX_LEN: `O nome de ${ENTITY_NAME} deve ter no máximo 20 caracteres`,
      MIN_LEN: `O nome de ${ENTITY_NAME} deve ter no mínimo 6 caracteres `,
      STRING: `O nome de ${ENTITY_NAME} deve ser um texto`,
    },
    EMAIL: {
      BLANK: `O email de ${ENTITY_NAME} deve ser informado`,
      VALID: `Informe um email válido para ${ENTITY_NAME}`,
      STRING: `O nome de ${ENTITY_NAME} deve ser um texto`,
    },
    SENHA: {
      BLANK: `A senha de ${ENTITY_NAME} deve ser informada`,
      VALID: `A senha deve conter letras e números e ter entre 6 e 20 caracteres`,
      MAX_LEN: `A senha de ${ENTITY_NAME} deve ter no máximo 20 caracteres`,
      MIN_LEN: `A senha de ${ENTITY_NAME} deve ter no mínimo 6 caracteres`,
      STRING: `A senha de ${ENTITY_NAME} deve ser um texto`,
    },
  },

  OPERACAO: criarMensagemOperacao(ENTITY_NAME),
};
