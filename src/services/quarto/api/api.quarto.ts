import { http } from "../../axios/config.axios";
import { ROTA } from "../../router/url";
import type { Quarto } from "../type/Quarto";

export const apiGetQuartos = async () => {
  const response = await http.get(ROTA.QUARTO.LISTAR);
  return response;
};

export const apiGetQuarto = async (servicoId: string) => {
  const response = await http.get(`${ROTA.QUARTO.POR_ID}/${servicoId}`);
  return response;
};

export const apiPostQuarto = async (servico: Quarto) => {
  const response = await http.post(ROTA.QUARTO.CRIAR, servico);
  return response;
};

export const apiPutQuarto = async (servicoId: string, servico: Quarto) => {
  const response = await http.put(
    `${ROTA.QUARTO.ATUALIZAR}/${servicoId}`,
    servico,
  );
  return response;
};

export const apiDeleteQuarto = async (servicoId: string) => {
  const response = await http.delete(`${ROTA.QUARTO.EXCLUIR}/${servicoId}`);
  return response;
};
