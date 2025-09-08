import React from "react";

function HydrateFallback() {
  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100">
      <div className="text-center">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Chargement...</span>
        </div>
        <p className="mt-3">Chargement de Loire & Nature Conciergerie...</p>
      </div>
    </div>
  );
}

export default HydrateFallback;
