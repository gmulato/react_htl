import type { ReactNode } from "react";

interface CrudPageLayoutProps {
  title: string;
  description?: string;
  primaryActionLabel: string;
  onPrimaryAction: () => void;
  error?: string | null;
  feedback?: string | null;
  children: ReactNode;
}

export function CrudPageLayout({
  title,
  description,
  primaryActionLabel,
  onPrimaryAction,
  error,
  feedback,
  children,
}: CrudPageLayoutProps) {
  return (
    <div className="space-y-6">
      <section className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
          {description ? (
            <p className="text-sm text-neutral-600">{description}</p>
          ) : null}
        </div>
        <button type="button" onClick={onPrimaryAction} className="btn btn-add">
          {primaryActionLabel}
        </button>
      </section>

      {error ? (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          {error}
        </div>
      ) : null}

      {feedback ? (
        <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-700">
          {feedback}
        </div>
      ) : null}

      <section className="grid gap-6 lg:grid-cols-5">{children}</section>
    </div>
  );
}
