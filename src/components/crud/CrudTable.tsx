import type { ReactNode } from "react";

export interface CrudTableColumn<T> {
  header: ReactNode;
  render: (item: T) => ReactNode;
  className?: string;
  headerClassName?: string;
}

interface CrudTableProps<T> {
  columns: CrudTableColumn<T>[];
  data: T[];
  loading?: boolean;
  emptyMessage?: ReactNode;
  loadingMessage?: ReactNode;
}

export function CrudTable<T>({
  columns,
  data,
  loading,
  emptyMessage = "Nenhum registro encontrado.",
  loadingMessage = "Carregando registros...",
}: CrudTableProps<T>) {
  return (
    <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm">
      <table className="min-w-full divide-y divide-neutral-200 text-sm">
        <thead className="bg-neutral-50 text-left text-xs font-semibold uppercase tracking-wide text-neutral-500">
          <tr>
            {columns.map((column, index) => (
              <th key={index} className={column.headerClassName ?? "px-4 py-3"}>
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-neutral-100">
          {loading ? (
            <tr>
              <td colSpan={columns.length} className="px-4 py-6 text-center text-neutral-500">
                {loadingMessage}
              </td>
            </tr>
          ) : data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="px-4 py-6 text-center text-neutral-500">
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((item, rowIndex) => (
              <tr key={rowIndex}>
                {columns.map((column, columnIndex) => (
                  <td key={columnIndex} className={column.className ?? "px-4 py-3"}>
                    {column.render(item)}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
