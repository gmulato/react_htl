import type { RouteObject } from "react-router-dom";
import Layout from "../../components/layout/Layout";
import Dashboard from "../../views/Dashboard";
import { ROTA } from "./url";

export const routes: RouteObject[] = [
  {
    path: "/sistema",
    element: <Layout />,
    children: [
      {
        path: "/sistema/dashboard",
        element: <Dashboard />,
      }
    ],
  },
];
