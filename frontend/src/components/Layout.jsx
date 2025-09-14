import React from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";

export function AppLayout({ children }) {
  return (
    <div className="min-vh-100 d-flex flex-column">
      <Header />
      <main className="flex-grow-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}