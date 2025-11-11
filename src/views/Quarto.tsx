import { CrudFormCard } from "../components/crud/CrudFormCard";
import { CrudPageLayout } from "../components/crud/CrudPageLayout";
import { CrudTable, type CrudTableColumn } from "../components/crud/CrudTable";
import { useCrudEntity } from "../hooks/useCrudEntity";
import {
  apiDeleteQuarto,
  apiGetQuarto,
  apiGetQuartos,
  apiPostQuarto,
  apiPutQuarto,
} from "../services/quarto/api/api.quarto";
import { QUARTO } from "../services/quarto/constants/quarto.constants";
import type { Quarto as QuartoModel } from "../services/quarto/type/Quarto";

type QuartoForm = typeof QUARTO.DADOS_INCIAIS;

export default function Quarto() {
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
  } = useCrudEntity<QuartoModel, QuartoForm, QuartoModel>({
    createInitialForm: () => ({ ...QUARTO.DADOS_INCIAIS }),
    listRequest: apiGetQuartos,
    getRequest: apiGetQuarto,
    createRequest: apiPostQuarto,
    updateRequest: apiPutQuarto,
    deleteRequest: apiDeleteQuarto,
    toPayload: (data) => ({
      identificador: data.identificador.trim(),
      tipo: data.tipo.trim(),
      valorDiaria: data.valorDiaria.trim(),
      inativo: Boolean(data.inativo),
    }),
    mapToForm: (data) => ({
      quartoId: data.quartoId ?? "",
      identificador: data.identificador ?? "",
      tipo: data.tipo ?? "",
      valorDiaria: data.valorDiaria ?? "",
      inativo: Boolean(data.inativo),
    }),
    messages: {
      listError: QUARTO.OPERACAO.LISTAR.ERRO,
      loadError: QUARTO.OPERACAO.POR_ID.ERRO,
      createSuccess: QUARTO.OPERACAO.CRIAR.SUCESSO,
      createError: QUARTO.OPERACAO.CRIAR.ERRO,
      updateSuccess: QUARTO.OPERACAO.ATUALIZAR.SUCESSO,
      updateError: QUARTO.OPERACAO.ATUALIZAR.ERRO,
      deleteConfirm: QUARTO.OPERACAO.EXCLUIR.ACAO,
      deleteSuccess: QUARTO.OPERACAO.EXCLUIR.SUCESSO,
      deleteError: QUARTO.OPERACAO.EXCLUIR.ERRO,
    },
    idSelector: (item) => item.quartoId,
  });

  const columns: CrudTableColumn<QuartoModel>[] = [
    {
      header: QUARTO.LABEL.IDENTIFICADOR,
      render: (item) => item.identificador ?? "-",
    },
    {
      header: QUARTO.LABEL.TIPO,
      render: (item) => item.tipo ?? "-",
    },
    {
      header: QUARTO.LABEL.VALOR_DIARIA,
      render: (item) => item.valorDiaria ?? "-",
    },
    {
      header: QUARTO.LABEL.INATIVO,
      render: (item) => (item.inativo ? "Sim" : "Não"),
    },
    {
      header: <span className="block text-right">Ações</span>,
      headerClassName: "px-4 py-3",
      className: "px-4 py-3",
      render: (item) => (
        <div className="flex items-center justify-end gap-2">
          <button
            type="button"
            className="btn btn-edit px-3 py-1 text-xs"
            onClick={() => item.quartoId && startEdit(item.quartoId)}
          >
            Editar
          </button>
          <button
            type="button"
            className="btn btn-delete px-3 py-1 text-xs"
            onClick={() => item.quartoId && removeItem(item.quartoId)}
            disabled={deletingId === item.quartoId}
          >
            {deletingId === item.quartoId ? "Excluindo..." : "Excluir"}
          </button>
        </div>
      ),
    },
  ];

  return (
    <CrudPageLayout
      title={QUARTO.TITULO.LISTA}
      description="Gerencie os quartos disponíveis para reserva."
      primaryActionLabel="Novo Quarto"
      onPrimaryAction={startCreate}
      error={error}
      feedback={feedback}
    >
      <CrudFormCard
        onSubmit={handleSubmit}
        title={isEditing ? QUARTO.TITULO.ATUALIZAR : QUARTO.TITULO.CRIAR}
        subtitle="Preencha as informações do quarto."
        onCancel={resetForm}
        isEditing={isEditing}
        actionLabel={isEditing ? "Atualizar Quarto" : "Cadastrar Quarto"}
        savingLabel={isEditing ? "Atualizando..." : "Cadastrando..."}
        isSubmitting={saving}
      >
        <div className="space-y-1">
          <label htmlFor={QUARTO.FIELDS.IDENTIFICADOR} className="text-sm font-medium text-neutral-700">
            {QUARTO.LABEL.IDENTIFICADOR}
          </label>
          <input
            id={QUARTO.FIELDS.IDENTIFICADOR}
            name={QUARTO.FIELDS.IDENTIFICADOR}
            value={form.identificador}
            onChange={(event) => setField("identificador", event.target.value)}
            placeholder="Informe o identificador do quarto"
            className="w-full rounded-xl border border-neutral-300 px-3 py-2 text-sm shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
            required
          />
        </div>

        <div className="space-y-1">
          <label htmlFor={QUARTO.FIELDS.TIPO} className="text-sm font-medium text-neutral-700">
            {QUARTO.LABEL.TIPO}
          </label>
          <input
            id={QUARTO.FIELDS.TIPO}
            name={QUARTO.FIELDS.TIPO}
            value={form.tipo}
            onChange={(event) => setField("tipo", event.target.value)}
            placeholder="Informe o tipo de quarto"
            className="w-full rounded-xl border border-neutral-300 px-3 py-2 text-sm shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
            required
          />
        </div>

        <div className="space-y-1">
          <label htmlFor={QUARTO.FIELDS.VALOR_DIARIA} className="text-sm font-medium text-neutral-700">
            {QUARTO.LABEL.VALOR_DIARIA}
          </label>
          <input
            id={QUARTO.FIELDS.VALOR_DIARIA}
            name={QUARTO.FIELDS.VALOR_DIARIA}
            value={form.valorDiaria}
            onChange={(event) => setField("valorDiaria", event.target.value)}
            placeholder="Informe o valor da diária"
            className="w-full rounded-xl border border-neutral-300 px-3 py-2 text-sm shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
            required
          />
        </div>

        <div className="flex items-center gap-2">
          <input
            id={QUARTO.FIELDS.INATIVO}
            name={QUARTO.FIELDS.INATIVO}
            type="checkbox"
            checked={form.inativo}
            onChange={(event) => setField("inativo", event.target.checked)}
            className="h-4 w-4 rounded border-neutral-300 text-emerald-600 focus:ring-emerald-500"
          />
          <label htmlFor={QUARTO.FIELDS.INATIVO} className="text-sm text-neutral-700">
            {QUARTO.LABEL.INATIVO}
          </label>
        </div>
      </CrudFormCard>

      <div className="lg:col-span-3 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold tracking-tight">
            {QUARTO.OPERACAO.LISTAR.ACAO}
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
          loadingMessage="Carregando quartos..."
          emptyMessage="Nenhum quarto cadastrado até o momento."
        />
      </div>
    </CrudPageLayout>
  );
}