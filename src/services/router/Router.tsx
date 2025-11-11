import type { RouteObject } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import Dashboard from "../../views/Dashboard";
import { DASHBOARD, ROTA } from "./url";
import Servico from "../../views/Servico";

export const routes: RouteObject[] = [
  {
    path: "/sistema",
    element: <Layout />,
    children: [
      {
        path: DASHBOARD,
        element: <Dashboard />,
      },
      {
        path: ROTA.SERVICO.BASE,
        element: <Servico />,
      },
    ],
  },
];
