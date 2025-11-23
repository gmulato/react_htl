import { http } from "../../axios/config.axios";
import { ROTA } from "../../router/url";
import type { Funcionario } from "../type/Funcionario";

export const apiGetFuncionarios = async () => {
  const response = await http.get(ROTA.FUNCIONARIO.LISTAR);
  return response;
};

export const apiGetFuncionario = async (funcionarioId: string) => {
  const response = await http.get(`${ROTA.FUNCIONARIO.POR_ID}/${funcionarioId}`);
  return response;
};

export const apiPostFuncionario = async (funcionario: Funcionario) => {
  const response = await http.post(ROTA.FUNCIONARIO.CRIAR, funcionario);
  return response;
};

export const apiPutFuncionario = async (funcionarioId: string, funcionario: Funcionario) => {
  const response = await http.put(
    `${ROTA.FUNCIONARIO.ATUALIZAR}/${funcionarioId}`,
    funcionario,
  );
  return response;
};

export const apiDeleteFuncionario = async (funcionarioId: string) => {
  const response = await http.delete(`${ROTA.FUNCIONARIO.EXCLUIR}/${funcionarioId}`);
  return response;
};
