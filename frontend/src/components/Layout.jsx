import React from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";

export function AppLayout({ className = "", children }) {
  return (
    <div className={`d-flex flex-column min-vh-100 ${className}`}>
      <Header />
      <main className="flex-grow-1" style={{ paddingTop: "76px" }}>
        {children}
      </main>
      <Footer />
    </div>
  );
}
