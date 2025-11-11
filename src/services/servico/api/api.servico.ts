import { http } from "../../axios/config.axios";
import { ROTA } from "../../router/url";
import type { Servico } from "../type/Servico";

export const apiGetServicos = async () => {
  const response = await http.get(ROTA.SERVICO.LISTAR);
  return response;
};

export const apiGetServico = async (servicoId: string) => {
  const response = await http.get(`${ROTA.SERVICO.POR_ID}/${servicoId}`);
  return response;
};

export const apiPostServico = async (servico: Servico) => {
  const response = await http.post(ROTA.SERVICO.CRIAR, servico);
};

export const apiPutServico = async (servicoId: string, servico: Servico) => {
  const response = await http.put(
    `${ROTA.SERVICO.ATUALIZAR}/${servicoId}`,
    servico,
  );
};

export const apiDeleteServico = async (servicoId: string) => {
  const response = await http.delete(`${ROTA.SERVICO.EXCLUIR}/${servicoId}`);
};
