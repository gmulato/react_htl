import { CrudFormCard } from "../components/crud/CrudFormCard";
import { CrudPageLayout } from "../components/crud/CrudPageLayout";
import { CrudTable, type CrudTableColumn } from "../components/crud/CrudTable";
import { useCrudEntity } from "../hooks/useCrudEntity";

import {
  apiDeleteHospede,
  apiGetHospede,
  apiGetHospedes,
  apiPostHospede,
  apiPutHospede,
} from "../services/hospede/api/api.hospede";

import { HOSPEDE } from "../services/hospede/constants/hospede.constants";
import type { Hospede as HospedeModel } from "../services/hospede/type/Hospede";

type HospedeForm = typeof HOSPEDE.DADOS_INCIAIS;

export default function Hospede() {
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
  } = useCrudEntity<HospedeModel, HospedeForm, HospedeModel>({
    createInitialForm: () => ({ ...HOSPEDE.DADOS_INCIAIS }),
    listRequest: apiGetHospedes,
    getRequest: apiGetHospede,
    createRequest: apiPostHospede,
    updateRequest: apiPutHospede,
    deleteRequest: apiDeleteHospede,
    toPayload: (data) => ({
      hospedeId: data.hospedeId,
      nome: data.nome.trim(),
      cpf: data.cpf.trim(),
      rg: data.rg.trim(),
      sexo: data.sexo.trim(),
      dataNascimento: data.dataNascimento,
      email: data.email.trim(),
      telefone: data.telefone.trim(),
    }),
    mapToForm: (data) => ({
      hospedeId: data.hospedeId ?? 0,
      nome: data.nome ?? "",
      cpf: data.cpf ?? "",
      rg: data.rg ?? "",
      sexo: data.sexo ?? "",
      dataNascimento: data.dataNascimento 
        ? typeof data.dataNascimento === 'string' 
          ? data.dataNascimento.split('T')[0] 
          : new Date(data.dataNascimento).toISOString().split('T')[0]
        : "",
      email: data.email ?? "",
      telefone: data.telefone ?? "",
    }),
    messages: {
      listError: HOSPEDE.OPERACAO.LISTAR.ERRO,
      loadError: HOSPEDE.OPERACAO.POR_ID.ERRO,
      createSuccess: HOSPEDE.OPERACAO.CRIAR.SUCESSO,
      createError: HOSPEDE.OPERACAO.CRIAR.ERRO,
      updateSuccess: HOSPEDE.OPERACAO.ATUALIZAR.SUCESSO,
      updateError: HOSPEDE.OPERACAO.ATUALIZAR.ERRO,
      deleteConfirm: HOSPEDE.OPERACAO.EXCLUIR.ACAO,
      deleteSuccess: HOSPEDE.OPERACAO.EXCLUIR.SUCESSO,
      deleteError: HOSPEDE.OPERACAO.EXCLUIR.ERRO,
    },
    idSelector: (item) => item.hospedeId?.toString() ?? "",
  });

  const columns: CrudTableColumn<HospedeModel>[] = [
    {
      header: HOSPEDE.LABEL.NOME,
      render: (item) => item.nome ?? "-",
    },
    {
      header: HOSPEDE.LABEL.CPF,
      render: (item) => item.cpf ?? "-",
    },
    {
      header: HOSPEDE.LABEL.EMAIL,
      render: (item) => item.email ?? "-",
    },
    {
      header: HOSPEDE.LABEL.TELEFONE,
      render: (item) => item.telefone ?? "-",
    },
    {
      header: <span className="block text-right">Ações</span>,
      headerClassName: "px-4 py-3",
      className: "px-4 py-3",
      render: (item) => {
        const id = item.hospedeId?.toString() ?? "";

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
      title={HOSPEDE.TITULO.LISTA}
      description="Gerencie os hóspedes cadastrados no sistema."
      primaryActionLabel="Novo Hóspede"
      onPrimaryAction={startCreate}
      error={error}
      feedback={feedback}
    >
      <CrudFormCard
        onSubmit={handleSubmit}
        title={
          isEditing ? HOSPEDE.TITULO.ATUALIZAR : HOSPEDE.TITULO.CRIAR
        }
        subtitle="Preencha as informações do hóspede."
        onCancel={resetForm}
        isEditing={isEditing}
        actionLabel={isEditing ? "Atualizar Hóspede" : "Cadastrar Hóspede"}
        savingLabel={isEditing ? "Atualizando..." : "Cadastrando..."}
        isSubmitting={saving}
      >
        <div className="space-y-1">
          <label
            htmlFor={HOSPEDE.FIELDS.NOME}
            className="text-sm font-medium text-neutral-700"
          >
            {HOSPEDE.LABEL.NOME}
          </label>
          <input
            id={HOSPEDE.FIELDS.NOME}
            name={HOSPEDE.FIELDS.NOME}
            value={form.nome}
            onChange={(event) => setField("nome", event.target.value)}
            placeholder="Informe o nome do hóspede"
            className="w-full rounded-xl border border-neutral-300 px-3 py-2 text-sm shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
            required
          />
        </div>

        <div className="space-y-1">
          <label
            htmlFor={HOSPEDE.FIELDS.CPF}
            className="text-sm font-medium text-neutral-700"
          >
            {HOSPEDE.LABEL.CPF}
          </label>
          <input
            id={HOSPEDE.FIELDS.CPF}
            name={HOSPEDE.FIELDS.CPF}
            value={form.cpf}
            onChange={(event) => setField("cpf", event.target.value)}
            placeholder="Informe o CPF (11 dígitos)"
            maxLength={11}
            className="w-full rounded-xl border border-neutral-300 px-3 py-2 text-sm shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
            required
          />
        </div>

        <div className="space-y-1">
          <label
            htmlFor={HOSPEDE.FIELDS.RG}
            className="text-sm font-medium text-neutral-700"
          >
            {HOSPEDE.LABEL.RG}
          </label>
          <input
            id={HOSPEDE.FIELDS.RG}
            name={HOSPEDE.FIELDS.RG}
            value={form.rg}
            onChange={(event) => setField("rg", event.target.value)}
            placeholder="Informe o RG (9 dígitos)"
            maxLength={9}
            className="w-full rounded-xl border border-neutral-300 px-3 py-2 text-sm shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
            required
          />
        </div>

        <div className="space-y-1">
          <label
            htmlFor={HOSPEDE.FIELDS.SEXO}
            className="text-sm font-medium text-neutral-700"
          >
            {HOSPEDE.LABEL.SEXO}
          </label>
          <select
            id={HOSPEDE.FIELDS.SEXO}
            name={HOSPEDE.FIELDS.SEXO}
            value={form.sexo}
            onChange={(event) => setField("sexo", event.target.value)}
            className="w-full rounded-xl border border-neutral-300 px-3 py-2 text-sm shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
            required
          >
            <option value="">Selecione o sexo</option>
            <option value="MASCULINO">Masculino</option>
            <option value="FEMININO">Feminino</option>
          </select>
        </div>

        <div className="space-y-1">
          <label
            htmlFor={HOSPEDE.FIELDS.DATA_NASCIMENTO}
            className="text-sm font-medium text-neutral-700"
          >
            {HOSPEDE.LABEL.DATA_NASCIMENTO}
          </label>
          <input
            id={HOSPEDE.FIELDS.DATA_NASCIMENTO}
            name={HOSPEDE.FIELDS.DATA_NASCIMENTO}
            type="date"
            value={form.dataNascimento}
            onChange={(event) => setField("dataNascimento", event.target.value)}
            className="w-full rounded-xl border border-neutral-300 px-3 py-2 text-sm shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
            required
          />
        </div>

        <div className="space-y-1">
          <label
            htmlFor={HOSPEDE.FIELDS.EMAIL}
            className="text-sm font-medium text-neutral-700"
          >
            {HOSPEDE.LABEL.EMAIL}
          </label>
          <input
            id={HOSPEDE.FIELDS.EMAIL}
            name={HOSPEDE.FIELDS.EMAIL}
            type="email"
            value={form.email}
            onChange={(event) => setField("email", event.target.value)}
            placeholder="Informe o email do hóspede"
            className="w-full rounded-xl border border-neutral-300 px-3 py-2 text-sm shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
            required
          />
        </div>

        <div className="space-y-1">
          <label
            htmlFor={HOSPEDE.FIELDS.TELEFONE}
            className="text-sm font-medium text-neutral-700"
          >
            {HOSPEDE.LABEL.TELEFONE}
          </label>
          <input
            id={HOSPEDE.FIELDS.TELEFONE}
            name={HOSPEDE.FIELDS.TELEFONE}
            type="tel"
            value={form.telefone}
            onChange={(event) => setField("telefone", event.target.value)}
            placeholder="Informe o telefone (10-15 dígitos)"
            maxLength={15}
            className="w-full rounded-xl border border-neutral-300 px-3 py-2 text-sm shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-200"
            required
          />
        </div>
      </CrudFormCard>

      <div className="lg:col-span-3 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold tracking-tight">
            {HOSPEDE.OPERACAO.LISTAR.ACAO}
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
          loadingMessage="Carregando hóspedes..."
          emptyMessage="Nenhum hóspede cadastrado até o momento."
        />
      </div>
    </CrudPageLayout>
  );
}
