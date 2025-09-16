import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppLayout } from "./components/Layout";
import Home from "./pages/Home";
import NotreDemarche from "./pages/NotreDemarche";
import Reservations from "./pages/Reservations";
import Proprietaires from "./pages/Proprietaires";
import Partenaires from "./pages/Partenaires";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import ProtectedRoute from "./components/ProtectedRoute";
import ErrorBoundary from "./components/ErrorBoundary";

function App() {
  return (
    <BrowserRouter>
      <AppLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/notre-demarche" element={<NotreDemarche />} />
          <Route path="/reservations" element={<Reservations />} />
          <Route path="/proprietaires" element={<Proprietaires />} />
          <Route path="/partenaires" element={<Partenaires />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute requireAdmin={true}>
                <Admin />
              </ProtectedRoute>
            } 
          />
          <Route
            path="*"
            element={<ErrorBoundary error={new Error("404")} />}
          />
        </Routes>
      </AppLayout>
    </BrowserRouter>
  );
}

export default App;