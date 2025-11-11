import type { FormEventHandler, ReactNode } from "react";

interface CrudFormCardProps {
  title: string;
  subtitle?: string;
  onSubmit: FormEventHandler<HTMLFormElement>;
  onCancel?: () => void;
  cancelLabel?: string;
  isEditing?: boolean;
  actionLabel: string;
  savingLabel?: string;
  isSubmitting?: boolean;
  children: ReactNode;
}

export function CrudFormCard({
  title,
  subtitle,
  onSubmit,
  onCancel,
  cancelLabel = "Cancelar",
  isEditing,
  actionLabel,
  savingLabel = "Salvando...",
  isSubmitting,
  children,
}: CrudFormCardProps) {
  return (
    <form
      onSubmit={onSubmit}
      className="lg:col-span-2 space-y-4 rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm"
    >
      <header className="flex items-start justify-between gap-2">
        <div>
          <h2 className="text-lg font-semibold tracking-tight">{title}</h2>
          {subtitle ? (
            <p className="text-sm text-neutral-600">{subtitle}</p>
          ) : null}
        </div>
        {isEditing && onCancel ? (
          <button
            type="button"
            onClick={onCancel}
            className="text-sm font-medium text-neutral-500 hover:text-neutral-800"
          >
            {cancelLabel}
          </button>
        ) : null}
      </header>

      {children}

      <button type="submit" className="btn btn-success w-full" disabled={isSubmitting}>
        {isSubmitting ? savingLabel : actionLabel}
      </button>
    </form>
  );
}
