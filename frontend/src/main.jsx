/* eslint-disable react-refresh/only-export-components */
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import GlobalStyles from "./components/GlobalStyles";
import Home from "./components/Home";
import Login from "./components/Login";
import CreateComp from "./components/CreateComp";
import ProtectedRoutes from "./components/ProtectedRoutes";
import Comps from "./components/Comps";

import { AgentsProvider } from "./contexts";
import { AuthProvider } from "./contexts/AuthContext";

function App() {
  return (
    <>
      <GlobalStyles />

      <Routes>
        <Route path="/login" element={<Login />} />

        <Route element={<ProtectedRoutes />}>
          <Route path="/" element={<Home />} />
          <Route path="/create-comp" element={<CreateComp />} />
           <Route path="/comps" element={<Comps />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <AgentsProvider>
          <App />
        </AgentsProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
