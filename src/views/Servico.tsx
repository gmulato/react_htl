import { CrudFormCard } from "../components/crud/CrudFormCard";
import { CrudPageLayout } from "../components/crud/CrudPageLayout";
import { CrudTable, type CrudTableColumn } from "../components/crud/CrudTable";
import { useCrudEntity } from "../hooks/useCrudEntity";
import {
  apiDeleteServico,
  apiGetServico,
  apiGetServicos,
  apiPostServico,
  apiPutServico,
} from "../services/servico/api/api.servico";
import { SERVICO } from "../services/servico/constants/servico.constants";
import type { Servico as ServicoModel } from "../services/servico/type/Servico";

type ServicoForm = typeof SERVICO.DADOS_INCIAIS;

export default function Servico() {
  const {
    items,
    form,
    setField,
    handleSubmit,
    startCreate,
    startEdit,
    removeItem,
    refresh,
    resetForm,
    loadingList,
    saving,
    deletingId,
    feedback,
    error,
    isEditing,
  } = useCrudEntity<ServicoModel, ServicoForm, ServicoModel>({
    createInitialForm: () => ({ ...SERVICO.DADOS_INCIAIS }),
    listRequest: apiGetServicos,
    getRequest: apiGetServico,
    createRequest: apiPostServico,
    updateRequest: apiPutServico,
    deleteRequest: apiDeleteServico,
    toPayload: (data) => ({
      nome: data.nome.trim(),
      descricao: data.descricao.trim(),
      valor: data.valor.trim(),
    }),
    mapToForm: (data) => ({
      servicoId: data.servicoId ?? "",
      nome: data.nome ?? "",
      descricao: data.descricao ?? "",
      valor: data.valor ?? "",
    }),
    messages: {
      listError: SERVICO.OPERACAO.LISTAR.ERRO,
      loadError: SERVICO.OPERACAO.POR_ID.ERRO,
      createSuccess: SERVICO.OPERACAO.CRIAR.SUCESSO,
      createError: SERVICO.OPERACAO.CRIAR.ERRO,
      updateSuccess: SERVICO.OPERACAO.ATUALIZAR.SUCESSO,
      updateError: SERVICO.OPERACAO.ATUALIZAR.ERRO,
      deleteConfirm: SERVICO.OPERACAO.EXCLUIR.ACAO,
      deleteSuccess: SERVICO.OPERACAO.EXCLUIR.SUCESSO,
      deleteError: SERVICO.OPERACAO.EXCLUIR.ERRO,
    },
    idSelector: (item) => item.servicoId,
  });

  const columns: CrudTableColumn<ServicoModel>[] = [
    {
      header: SERVICO.LABEL.NOME,
      render: (item) => item.nome ?? "-",
    },
    {
      header: SERVICO.LABEL.DESC,
      render: (item) => item.descricao ?? "-",
    },
    {
      header: SERVICO.LABEL.VALOR,
      render: (item) => item.valor ?? "-",
    },
    {
      header: <span className="block text-right">Ações</span>,
      headerClassName: "px-4 py-3",
      className: "px-4 py-3",
      render: (item) => (
        <div className="flex items-center justify-end gap-2">
          <button
            type="button"
            className="btn btn-edit px-3 py-1 text-xs bg-emerald-500 hover:bg-emerald-600 rounded-md text-gray-100"
            onClick={() => item.servicoId && startEdit(item.servicoId)}
          >
            Editar
          </button>
          <button
            type="button"
            className="btn btn-delete px-3 py-1 text-xs bg-red-500 hover:bg-red-600 rounded-md text-gray-100"
            onClick={() => item.servicoId && removeItem(item.servicoId)}
            disabled={deletingId === item.servicoId}
          >
            {deletingId === item.servicoId ? "Excluindo..." : "Excluir"}
          </button>
        </div>
      ),
    },
  ];

  return (
    <CrudPageLayout
      title={SERVICO.TITULO.LISTA}
      description="Gerencie o cadastro de serviços do hotel."
      primaryActionLabel="Novo Serviço"
      onPrimaryAction={startCreate}
      error={error}
      feedback={feedback}
    >
      <CrudFormCard
        onSubmit={handleSubmit}
        title={isEditing ? SERVICO.TITULO.ATUALIZAR : SERVICO.TITULO.CRIAR}
        subtitle="Preencha as informações do serviço."
        onCancel={resetForm}
        isEditing={isEditing}
        actionLabel={isEditing ? "Atualizar Serviço" : "Cadastrar Serviço"}
        savingLabel={isEditing ? "Atualizando..." : "Cadastrando..."}
        isSubmitting={saving}
      >
        <div className="space-y-1">
          <label htmlFor={SERVICO.FIELDS.NOME} className="text-sm font-medium text-neutral-700">
            {SERVICO.LABEL.NOME}
          </label>
          <input
            id={SERVICO.FIELDS.NOME}
            name={SERVICO.FIELDS.NOME}
            value={form.nome}
            onChange={(event) => setField("nome", event.target.value)}
            placeholder="Informe o nome do serviço"
            className="w-full rounded-xl border border-neutral-300 px-3 py-2 text-sm shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
            required
          />
        </div>

        <div className="space-y-1">
          <label htmlFor={SERVICO.FIELDS.DESC} className="text-sm font-medium text-neutral-700">
            {SERVICO.LABEL.DESC}
          </label>
          <textarea
            id={SERVICO.FIELDS.DESC}
            name={SERVICO.FIELDS.DESC}
            value={form.descricao}
            onChange={(event) => setField("descricao", event.target.value)}
            placeholder="Descreva o serviço"
            rows={4}
            className="w-full rounded-xl border border-neutral-300 px-3 py-2 text-sm shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
            required
          />
        </div>

        <div className="space-y-1">
          <label htmlFor={SERVICO.FIELDS.VALOR} className="text-sm font-medium text-neutral-700">
            {SERVICO.LABEL.VALOR}
          </label>
          <input
            id={SERVICO.FIELDS.VALOR}
            name={SERVICO.FIELDS.VALOR}
            value={form.valor}
            onChange={(event) => setField("valor", event.target.value)}
            placeholder="Informe o valor"
            className="w-full rounded-xl border border-neutral-300 px-3 py-2 text-sm shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
            required
          />
        </div>
      </CrudFormCard>

      <div className="lg:col-span-3 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold tracking-tight">
            {SERVICO.OPERACAO.LISTAR.ACAO}
          </h2>
          <button
            type="button"
            onClick={refresh}
            className="text-sm font-medium text-emerald-700 hover:text-emerald-900"
            disabled={loadingList}
          >
            {loadingList ? "Sincronizando..." : "Recarregar"}
          </button>
        </div>

        <CrudTable
          columns={columns}
          data={items}
          loading={loadingList}
          loadingMessage="Carregando serviços..."
          emptyMessage="Nenhum serviço cadastrado até o momento."
        />
      </div>
    </CrudPageLayout>
  );
}
