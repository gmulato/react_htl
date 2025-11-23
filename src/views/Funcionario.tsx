import { CrudFormCard } from "../components/crud/CrudFormCard";
import { CrudPageLayout } from "../components/crud/CrudPageLayout";
import { CrudTable, type CrudTableColumn } from "../components/crud/CrudTable";
import { useCrudEntity } from "../hooks/useCrudEntity";

import {
  apiDeleteFuncionario,
  apiGetFuncionario,
  apiGetFuncionarios,
  apiPostFuncionario,
  apiPutFuncionario,
} from "../services/funcionario/api/api.funcionario";

import { FUNCIONARIO } from "../services/funcionario/constants/funcionario.constants";
import type { Funcionario as FuncionarioModel } from "../services/funcionario/type/Funcionario";

type FuncionarioForm = typeof FUNCIONARIO.DADOS_INCIAIS;

export default function Funcionario() {
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
  } = useCrudEntity<FuncionarioModel, FuncionarioForm, FuncionarioModel>({
    createInitialForm: () => ({ ...FUNCIONARIO.DADOS_INCIAIS }),
    listRequest: apiGetFuncionarios,
    getRequest: apiGetFuncionario,
    createRequest: apiPostFuncionario,
    updateRequest: apiPutFuncionario,
    deleteRequest: apiDeleteFuncionario,
    toPayload: (data) => ({
      funcionarioId: data.funcionarioId, // number, ok para a API
      nome: data.nome.trim(),
      email: data.email.trim(),
      senha: data.senha,
      ativo: data.ativo ? 1 : 0,
    }),
    mapToForm: (data) => ({
      funcionarioId: data.funcionarioId ?? 0, // continua sendo number no form
      nome: data.nome ?? "",
      email: data.email ?? "",
      senha: "",
      ativo: data.ativo ? 1 : 0,
    }),
    messages: {
      listError: FUNCIONARIO.OPERACAO.LISTAR.ERRO,
      loadError: FUNCIONARIO.OPERACAO.POR_ID.ERRO,
      createSuccess: FUNCIONARIO.OPERACAO.CRIAR.SUCESSO,
      createError: FUNCIONARIO.OPERACAO.CRIAR.ERRO,
      updateSuccess: FUNCIONARIO.OPERACAO.ATUALIZAR.SUCESSO,
      updateError: FUNCIONARIO.OPERACAO.ATUALIZAR.ERRO,
      deleteConfirm: FUNCIONARIO.OPERACAO.EXCLUIR.ACAO,
      deleteSuccess: FUNCIONARIO.OPERACAO.EXCLUIR.SUCESSO,
      deleteError: FUNCIONARIO.OPERACAO.EXCLUIR.ERRO,
    },
    // 👇 AQUI: força o ID a ser string para o hook
    idSelector: (item) => item.funcionarioId?.toString() ?? "",
  });

  const columns: CrudTableColumn<FuncionarioModel>[] = [
    {
      header: FUNCIONARIO.LABEL.NOME,
      render: (item) => item.nome ?? "-",
    },
    {
      header: FUNCIONARIO.LABEL.EMAIL,
      render: (item) => item.email ?? "-",
    },
    {
        header: "Ativo",
        render: (item) => (item.ativo === 1 ? "Sim" : "Não"),
    },
    {
      header: <span className="block text-right">Ações</span>,
      headerClassName: "px-4 py-3",
      className: "px-4 py-3",
      render: (item) => {
        // 👇 normaliza o ID pra string, igual ao idSelector
        const id = item.funcionarioId?.toString() ?? "";

        return (
          <div className="flex items-center justify-end gap-2">
            <button
              type="button"
              className="btn btn-edit px-3 py-1 text-xs bg-emerald-500 hover:bg-emerald-600 rounded-md text-gray-100"
              onClick={() => id && startEdit(id)}
            >
              Editar
            </button>
            <button
              type="button"
              className="btn btn-delete px-3 py-1 text-xs bg-red-500 hover:bg-red-600 rounded-md text-gray-100"
              onClick={() => id && removeItem(id)}
              disabled={deletingId === id}
            >
              {deletingId === id ? "Excluindo..." : "Excluir"}
            </button>
          </div>
        );
      },
    },
  ];

  return (
    <CrudPageLayout
      title={FUNCIONARIO.TITULO.LISTA}
      description="Gerencie os funcionários do sistema."
      primaryActionLabel="Novo Funcionário"
      onPrimaryAction={startCreate}
      error={error}
      feedback={feedback}
    >
      <CrudFormCard
        onSubmit={handleSubmit}
        title={
          isEditing ? FUNCIONARIO.TITULO.ATUALIZAR : FUNCIONARIO.TITULO.CRIAR
        }
        subtitle="Preencha as informações do funcionário."
        onCancel={resetForm}
        isEditing={isEditing}
        actionLabel={isEditing ? "Atualizar Funcionário" : "Cadastrar Funcionário"}
        savingLabel={isEditing ? "Atualizando..." : "Cadastrando..."}
        isSubmitting={saving}
      >
        <div className="space-y-1">
          <label
            htmlFor={FUNCIONARIO.FIELDS.NOME}
            className="text-sm font-medium text-neutral-700"
          >
            {FUNCIONARIO.LABEL.NOME}
          </label>
          <input
            id={FUNCIONARIO.FIELDS.NOME}
            name={FUNCIONARIO.FIELDS.NOME}
            value={form.nome}
            onChange={(event) => setField("nome", event.target.value)}
            placeholder="Informe o nome do funcionário"
            className="w-full rounded-xl border border-neutral-300 px-3 py-2 text-sm shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
            required
          />
        </div>

        <div className="space-y-1">
          <label
            htmlFor={FUNCIONARIO.FIELDS.EMAIL}
            className="text-sm font-medium text-neutral-700"
          >
            {FUNCIONARIO.LABEL.EMAIL}
          </label>
          <input
            id={FUNCIONARIO.FIELDS.EMAIL}
            name={FUNCIONARIO.FIELDS.EMAIL}
            type="email"
            value={form.email}
            onChange={(event) => setField("email", event.target.value)}
            placeholder="Informe o email do funcionário"
            className="w-full rounded-xl border border-neutral-300 px-3 py-2 text-sm shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
            required
          />
        </div>

        <div className="space-y-1">
          <label
            htmlFor={FUNCIONARIO.FIELDS.SENHA}
            className="text-sm font-medium text-neutral-700"
          >
            {FUNCIONARIO.LABEL.SENHA}
          </label>
          <input
            id={FUNCIONARIO.FIELDS.SENHA}
            name={FUNCIONARIO.FIELDS.SENHA}
            type="password"
            value={form.senha}
            onChange={(event) => setField("senha", event.target.value)}
            placeholder="Informe a senha do funcionário"
            className="w-full rounded-xl border border-neutral-300 px-3 py-2 text-sm shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
            required
          />
        </div>

        <div className="flex items-center gap-2">
          <input
            id="ativo"
            name="ativo"
            type="checkbox"
            checked={!!form.ativo}
            onChange={(event) => setField("ativo", event.target.checked ? 1 : 0)}
            className="h-4 w-4 rounded border-neutral-300 text-emerald-600 focus:ring-emerald-500"
          />
          <label htmlFor="ativo" className="text-sm text-neutral-700">
            Ativo
          </label>
        </div>
      </CrudFormCard>

      <div className="lg:col-span-3 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold tracking-tight">
            {FUNCIONARIO.OPERACAO.LISTAR.ACAO}
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
          loadingMessage="Carregando funcionários..."
          emptyMessage="Nenhum funcionário cadastrado até o momento."
        />
      </div>
    </CrudPageLayout>
  );
}
