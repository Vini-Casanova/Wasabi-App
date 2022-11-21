import { Routes, Route, Navigate } from "react-router-dom";

import { Login } from "../pages/Login";
import { SingUp } from "../pages/SignUp";
import { Home } from "../pages/Home";
import { Delivery } from "../pages/Delivery";
import { ConfirmOrder } from "../pages/ConfirmOrder"
import { NotFound } from "../pages/NotFound";

import { PrivateRoute } from "../helpers/PrivateRoute";

export function Router() {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/SingUp" element={<SingUp />} />

      <Route
        path="/delivery"
        element={
          <PrivateRoute>
            <Delivery />
          </PrivateRoute>
        }
      />

      <Route
        path="/delivery/confirmorder"
        element={
          <PrivateRoute>
            <ConfirmOrder />
          </PrivateRoute>
        }
      />

      <Route path="/404" element={<NotFound />} />

      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
  );
}
