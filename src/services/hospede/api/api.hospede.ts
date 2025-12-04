import { http } from "../../axios/config.axios";
import { ROTA } from "../../router/url";
import type { Hospede } from "../type/Hospede";

export const apiGetHospedes = async () => {
  const response = await http.get(ROTA.HOSPEDE.LISTAR);
  return response;
};

export const apiGetHospede = async (hospedeId: string) => {
  const response = await http.get(`${ROTA.HOSPEDE.POR_ID}/${hospedeId}`);
  return response;
};

export const apiPostHospede = async (hospede: Hospede) => {
  const response = await http.post(ROTA.HOSPEDE.CRIAR, hospede);
  return response;
};

export const apiPutHospede = async (hospedeId: string, hospede: Hospede) => {
  const response = await http.put(
    `${ROTA.HOSPEDE.ATUALIZAR}/${hospedeId}`,
    hospede,
  );
  return response;
};

export const apiDeleteHospede = async (hospedeId: string) => {
  const response = await http.delete(`${ROTA.HOSPEDE.EXCLUIR}/${hospedeId}`);
  return response;
};
