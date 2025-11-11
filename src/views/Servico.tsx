import { useEffect, useState } from "react";
import {
  apiDeleteServico,
  apiGetServico,
  apiGetServicos,
  apiPostServico,
  apiPutServico,
} from "../services/servico/api/api.servico";
import { SERVICO } from "../services/servico/constants/servico.constants";
import type { Servico as ServicoModel } from "../services/servico/type/Servico";

type FormState = ServicoModel;

const INITIAL_FORM: FormState = { ...SERVICO.DADOS_INCIAIS };

export default function Servico() {
  const [servicos, setServicos] = useState<ServicoModel[]>([]);
  const [formState, setFormState] = useState<FormState>(INITIAL_FORM);
  const [loadingList, setLoadingList] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    listarServicos();
  }, []);

  const listarServicos = async () => {
    try {
      setLoadingList(true);
      setError(null);
      const { data } = await apiGetServicos();
      setServicos(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      setError(SERVICO.OPERACAO.LISTAR.ERRO);
    } finally {
      setLoadingList(false);
    }
  };

  const resetForm = () => {
    setFormState(INITIAL_FORM);
    setFeedback(null);
    setError(null);
  };

  const handleChange = (field: keyof FormState, value: string) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
  };

  const handleEdit = async (servicoId?: string) => {
    if (!servicoId) {
      return;
    }
    try {
      setError(null);
      const { data } = await apiGetServico(servicoId);
      if (data) {
        setFormState({
          servicoId: data.servicoId ?? servicoId,
          nome: data.nome ?? "",
          descricao: data.descricao ?? "",
          valor: data.valor ?? "",
        });
        setFeedback(null);
      }
    } catch (err) {
      console.error(err);
      setError(SERVICO.OPERACAO.POR_ID.ERRO);
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      setSaving(true);
      setFeedback(null);
      setError(null);

      const payload: ServicoModel = {
        nome: formState.nome?.trim() ?? "",
        descricao: formState.descricao?.trim() ?? "",
        valor: formState.valor?.trim() ?? "",
      };

      if (formState.servicoId) {
        await apiPutServico(formState.servicoId, payload);
        setFeedback(SERVICO.OPERACAO.ATUALIZAR.SUCESSO);
      } else {
        await apiPostServico(payload);
        setFeedback(SERVICO.OPERACAO.CRIAR.SUCESSO);
      }

      await listarServicos();
      resetForm();
    } catch (err) {
      console.error(err);
      setError(
        formState.servicoId
          ? SERVICO.OPERACAO.ATUALIZAR.ERRO
          : SERVICO.OPERACAO.CRIAR.ERRO,
      );
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (servicoId?: string) => {
    if (!servicoId) {
      return;
    }
    const confirmed = window.confirm(SERVICO.OPERACAO.EXCLUIR.ACAO);
    if (!confirmed) {
      return;
    }
    try {
      setDeletingId(servicoId);
      setError(null);
      setFeedback(null);
      await apiDeleteServico(servicoId);
      setFeedback(SERVICO.OPERACAO.EXCLUIR.SUCESSO);
      await listarServicos();
      if (formState.servicoId === servicoId) {
        resetForm();
      }
    } catch (err) {
      console.error(err);
      setError(SERVICO.OPERACAO.EXCLUIR.ERRO);
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="space-y-6">
      <section className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            {SERVICO.TITULO.LISTA}
          </h1>
          <p className="text-sm text-neutral-600">
            Gerencie o cadastro de serviços do hotel.
          </p>
        </div>
        <button
          type="button"
          onClick={resetForm}
          className="btn btn-add"
        >
          Novo Serviço
        </button>
      </section>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      )}

      {feedback && (
        <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-700">
          {feedback}
        </div>
      )}

      <section className="grid gap-6 lg:grid-cols-5">
        <form
          onSubmit={handleSubmit}
          className="lg:col-span-2 space-y-4 rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm"
        >
          <header className="flex items-start justify-between gap-2">
            <div>
              <h2 className="text-lg font-semibold tracking-tight">
                {formState.servicoId
                  ? SERVICO.TITULO.ATUALIZAR
                  : SERVICO.TITULO.CRIAR}
              </h2>
              <p className="text-sm text-neutral-600">
                Preencha as informações do serviço.
              </p>
            </div>
            {formState.servicoId && (
              <button
                type="button"
                onClick={resetForm}
                className="text-sm font-medium text-neutral-500 hover:text-neutral-800"
              >
                Cancelar edição
              </button>
            )}
          </header>

          <div className="space-y-1">
            <label
              htmlFor={SERVICO.FIELDS.NOME}
              className="text-sm font-medium text-neutral-700"
            >
              {SERVICO.LABEL.NOME}
            </label>
            <input
              id={SERVICO.FIELDS.NOME}
              name={SERVICO.FIELDS.NOME}
              value={formState.nome ?? ""}
              onChange={(event) => handleChange("nome", event.target.value)}
              placeholder="Informe o nome do serviço"
              className="w-full rounded-xl border border-neutral-300 px-3 py-2 text-sm shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
              required
            />
          </div>

          <div className="space-y-1">
            <label
              htmlFor={SERVICO.FIELDS.DESC}
              className="text-sm font-medium text-neutral-700"
            >
              {SERVICO.LABEL.DESC}
            </label>
            <textarea
              id={SERVICO.FIELDS.DESC}
              name={SERVICO.FIELDS.DESC}
              value={formState.descricao ?? ""}
              onChange={(event) => handleChange("descricao", event.target.value)}
              placeholder="Descreva o serviço"
              rows={4}
              className="w-full rounded-xl border border-neutral-300 px-3 py-2 text-sm shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
              required
            />
          </div>

          <div className="space-y-1">
            <label
              htmlFor={SERVICO.FIELDS.VALOR}
              className="text-sm font-medium text-neutral-700"
            >
              {SERVICO.LABEL.VALOR}
            </label>
            <input
              id={SERVICO.FIELDS.VALOR}
              name={SERVICO.FIELDS.VALOR}
              value={formState.valor ?? ""}
              onChange={(event) => handleChange("valor", event.target.value)}
              placeholder="Informe o valor"
              className="w-full rounded-xl border border-neutral-300 px-3 py-2 text-sm shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-success w-full"
            disabled={saving}
          >
            {saving
              ? "Salvando..."
              : formState.servicoId
                ? "Atualizar Serviço"
                : "Cadastrar Serviço"}
          </button>
        </form>

        <div className="lg:col-span-3 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold tracking-tight">
              {SERVICO.OPERACAO.LISTAR.ACAO}
            </h2>
            <button
              type="button"
              onClick={listarServicos}
              className="text-sm font-medium text-emerald-700 hover:text-emerald-900"
              disabled={loadingList}
            >
              {loadingList ? "Sincronizando..." : "Recarregar"}
            </button>
          </div>

          <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm">
            <table className="min-w-full divide-y divide-neutral-200 text-sm">
              <thead className="bg-neutral-50 text-left text-xs font-semibold uppercase tracking-wide text-neutral-500">
                <tr>
                  <th className="px-4 py-3">{SERVICO.LABEL.NOME}</th>
                  <th className="px-4 py-3">{SERVICO.LABEL.DESC}</th>
                  <th className="px-4 py-3">{SERVICO.LABEL.VALOR}</th>
                  <th className="px-4 py-3 text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {loadingList ? (
                  <tr>
                    <td colSpan={4} className="px-4 py-6 text-center text-neutral-500">
                      Carregando serviços...
                    </td>
                  </tr>
                ) : servicos.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-4 py-6 text-center text-neutral-500">
                      Nenhum serviço cadastrado até o momento.
                    </td>
                  </tr>
                ) : (
                  servicos.map((servico) => (
                    <tr key={servico.servicoId ?? servico.nome}>
                      <td className="px-4 py-3 font-medium text-neutral-800">
                        {servico.nome ?? "-"}
                      </td>
                      <td className="px-4 py-3 text-neutral-600">
                        {servico.descricao ?? "-"}
                      </td>
                      <td className="px-4 py-3 text-neutral-600">
                        {servico.valor ?? "-"}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            type="button"
                            className="btn btn-edit px-3 py-1 text-xs"
                            onClick={() => handleEdit(servico.servicoId)}
                          >
                            Editar
                          </button>
                          <button
                            type="button"
                            className="btn btn-delete px-3 py-1 text-xs"
                            onClick={() => handleDelete(servico.servicoId)}
                            disabled={deletingId === servico.servicoId}
                          >
                            {deletingId === servico.servicoId
                              ? "Excluindo..."
                              : "Excluir"}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}
