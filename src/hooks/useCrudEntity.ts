import { useCallback, useEffect, useState } from "react";
import type { Dispatch, FormEvent, SetStateAction } from "react";

export interface CrudMessages {
  listError: string;
  loadError: string;
  createSuccess: string;
  createError: string;
  updateSuccess: string;
  updateError: string;
  deleteConfirm: string;
  deleteSuccess: string;
  deleteError: string;
}

export interface UseCrudEntityConfig<T, Form extends Record<string, unknown>, Payload> {
  createInitialForm: () => Form;
  listRequest: () => Promise<{ data: unknown }>;
  getRequest?: (id: string) => Promise<{ data: T }>;
  createRequest: (payload: Payload) => Promise<unknown>;
  updateRequest: (id: string, payload: Payload) => Promise<unknown>;
  deleteRequest: (id: string) => Promise<unknown>;
  toPayload: (form: Form) => Payload;
  mapToForm?: (data: T) => Form;
  messages: CrudMessages;
  idSelector: (item: T) => string | undefined | null;
}

export interface UseCrudEntityResult<T, Form extends Record<string, unknown>> {
  items: T[];
  form: Form;
  setField: <K extends keyof Form>(field: K, value: Form[K]) => void;
  setForm: Dispatch<SetStateAction<Form>>;
  handleSubmit: (event?: FormEvent<HTMLFormElement>) => Promise<void>;
  startCreate: () => void;
  startEdit: (id: string) => Promise<void>;
  removeItem: (id: string) => Promise<void>;
  refresh: () => Promise<void>;
  resetForm: () => void;
  loadingList: boolean;
  saving: boolean;
  deletingId: string | null;
  feedback: string | null;
  error: string | null;
  isEditing: boolean;
  editingId: string | null;
}

export function useCrudEntity<T, Form extends Record<string, unknown>, Payload>(
  config: UseCrudEntityConfig<T, Form, Payload>,
): UseCrudEntityResult<T, Form> {
  const {
    createInitialForm,
    listRequest,
    getRequest,
    createRequest,
    updateRequest,
    deleteRequest,
    toPayload,
    mapToForm,
    messages,
    idSelector,
  } = config;

  const [items, setItems] = useState<T[]>([]);
  const [form, setForm] = useState<Form>(createInitialForm());
  const [loadingList, setLoadingList] = useState(false);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);

  const mapDataToForm = useCallback(
    (data: T) => {
      if (mapToForm) {
        return mapToForm(data);
      }
      const copy = { ...(data as unknown as Record<string, unknown>) };
      return copy as Form;
    },
    [mapToForm],
  );

  const refresh = useCallback(async () => {
    try {
      setLoadingList(true);
      setError(null);
      const { data } = await listRequest();
      const list = Array.isArray(data) ? (data as T[]) : [];
      setItems(list);
    } catch (err) {
      console.error(err);
      setError(messages.listError);
    } finally {
      setLoadingList(false);
    }
  }, [listRequest, messages.listError]);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const resetForm = useCallback(() => {
    setForm(createInitialForm());
    setEditingId(null);
    setFeedback(null);
    setError(null);
  }, [createInitialForm]);

  const startCreate = useCallback(() => {
    resetForm();
  }, [resetForm]);

  const setField = useCallback(
    <K extends keyof Form>(field: K, value: Form[K]) => {
      setForm((prev) => ({ ...prev, [field]: value }));
    },
    [],
  );

  const startEdit = useCallback(
    async (id: string) => {
      if (!id) {
        return;
      }

      try {
        setError(null);
        setFeedback(null);

        let entity: T | undefined;
        if (getRequest) {
          const { data } = await getRequest(id);
          entity = data;
        } else {
          entity = items.find((item) => idSelector(item) === id);
        }

        if (!entity) {
          setError(messages.loadError);
          return;
        }

        setForm(mapDataToForm(entity));
        setEditingId(id);
      } catch (err) {
        console.error(err);
        setError(messages.loadError);
      }
    },
    [getRequest, idSelector, items, mapDataToForm, messages.loadError],
  );

  const submit = useCallback(async () => {
    try {
      setSaving(true);
      setFeedback(null);
      setError(null);

      const payload = toPayload(form);

      if (editingId) {
        await updateRequest(editingId, payload);
        setFeedback(messages.updateSuccess);
      } else {
        await createRequest(payload);
        setFeedback(messages.createSuccess);
      }

      await refresh();
      resetForm();
    } catch (err) {
      console.error(err);
      setError(editingId ? messages.updateError : messages.createError);
    } finally {
      setSaving(false);
    }
  }, [createRequest, editingId, form, messages.createError, messages.createSuccess, messages.updateError, messages.updateSuccess, refresh, resetForm, toPayload, updateRequest]);

  const handleSubmit = useCallback(
    async (event?: React.FormEvent<HTMLFormElement>) => {
      event?.preventDefault();
      await submit();
    },
    [submit],
  );

  const removeItem = useCallback(
    async (id: string) => {
      if (!id) {
        return;
      }

      const shouldRemove = window.confirm(messages.deleteConfirm);
      if (!shouldRemove) {
        return;
      }

      try {
        setDeletingId(id);
        setError(null);
        setFeedback(null);
        await deleteRequest(id);
        setFeedback(messages.deleteSuccess);
        await refresh();
        if (editingId === id) {
          resetForm();
        }
      } catch (err) {
        console.error(err);
        setError(messages.deleteError);
      } finally {
        setDeletingId(null);
      }
    },
    [deleteRequest, editingId, messages.deleteConfirm, messages.deleteError, messages.deleteSuccess, refresh, resetForm],
  );

  return {
    items,
    form,
    setField,
    setForm,
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
    isEditing: Boolean(editingId),
    editingId,
  };
}
