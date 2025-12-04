import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import {
  Home,
  BedDouble,
  Menu,
  X,
  PackagePlus,
  User,
} from "lucide-react";
import { ROTA, DASHBOARD } from "../../services/router/url";
import { SERVICO } from "../../services/servico/constants/servico.constants";
import { QUARTO } from "../../services/quarto/constants/quarto.constants";
import { FUNCIONARIO } from "../../services/funcionario/constants/funcionario.constants";
import { HOSPEDE } from "../../services/hospede/constants/hospede.constants";

const NAV_ITEMS = [
  { to: `${DASHBOARD}`, label: "Dashboard", icon: Home, end: true },
  { to: `${ROTA.SERVICO.BASE}`, label: SERVICO.ENTITY + "s", icon: PackagePlus, end: true },
  { to: `${ROTA.QUARTO.BASE}`, label: QUARTO.ENTITY + "s", icon: BedDouble, end: true },
  { to: `${ROTA.FUNCIONARIO.BASE}`, label: FUNCIONARIO.ENTITY + "s", icon: User, end: true },
  { to: `${ROTA.HOSPEDE.BASE}`, label: HOSPEDE.ENTITY + "s", icon: User, end: true },
];

export default function HotelLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    // 1) prende no viewport e bloqueia scroll externo
    <div className="h-dvh bg-neutral-50 text-neutral-900 flex flex-col overflow-hidden">
      {/* Topbar fixa no topo do layout (não precisa sticky se o scroll é interno) */}
      <header className="h-14 border-b border-neutral-200 bg-white/90 backdrop-blur shrink-0">
        <div className="flex h-full items-center gap-3 px-3 sm:px-4">
          <button
            onClick={() => setSidebarOpen(true)}
            className="inline-flex items-center justify-center rounded-xl p-2 active:scale-95 lg:hidden"
            aria-label="Abrir menu"
          >
            <Menu className="h-5 w-5" />
          </button>

          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-sm">
              <BedDouble className="h-4 w-4" />
            </div>
            <span className="font-semibold tracking-tight">Hotel Admin</span>
          </div>
        </div>
      </header>

      {/* 2) Área abaixo do header não pode rolar por fora */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar Desktop (pode ter scroll independente se quiser) */}
        <aside className="hidden lg:flex lg:w-72 flex-col border-r border-neutral-200 bg-white overflow-y-auto">
          <nav className="px-2 py-3">
            <ul className="space-y-1">
              {NAV_ITEMS.map(({ to, label, icon: Icon, end }) => (
                <li key={to}>
                  <NavLink
                    to={to}
                    end={end}
                    className={({ isActive }) =>
                      `group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium outline-none transition focus-visible:ring-2 focus-visible:ring-emerald-500 ${
                        isActive
                          ? "bg-emerald-600 text-white hover:bg-emerald-600/95 active"
                          : "hover:bg-neutral-100"
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <Icon className={`h-5 w-5 flex-shrink-0 ${isActive ? "text-white" : "text-gray-700"}`} />
                        <span className={`truncate ${isActive ? "text-white" : "text-gray-700"}`}>
                          {label}
                        </span>
                      </>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* 3) Somente o MAIN rola — o Outlet fica dentro dele */}
        <main className="flex-1 overflow-y-auto bg-neutral-50">
          <div className="p-4 sm:p-6">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Drawer Mobile */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
          />
          <div className="absolute inset-y-0 left-0 flex w-80 max-w-[85%] flex-col border-r border-neutral-200 bg-white shadow-xl">
            <div className="flex h-14 items-center justify-between px-3">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-sm">
                  <BedDouble className="h-4 w-4" />
                </div>
                <span className="font-semibold tracking-tight">Menu</span>
              </div>
              <button
                onClick={() => setSidebarOpen(false)}
                className="inline-flex items-center justify-center rounded-xl p-2 hover:bg-neutral-100"
                aria-label="Fechar menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="flex-1 overflow-y-auto px-2 py-3">
              <ul className="space-y-1">
                {NAV_ITEMS.map(({ to, label, icon: Icon, end }) => (
                  <li key={to}>
                    <NavLink
                      to={to}
                      end={end}
                      onClick={() => setSidebarOpen(false)}
                      className={({ isActive }) =>
                        `group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                          isActive
                            ? "bg-emerald-600 text-white"
                            : "text-gray-700"
                        }`
                      }
                    >
                      <Icon className="h-5 w-5 flex-shrink-0" />
                      <span className="truncate">{label}</span>
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      )}
    </div>
  );
}
