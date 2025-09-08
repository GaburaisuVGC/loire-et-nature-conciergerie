import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Container, Spinner } from 'react-bootstrap';
import authService from '../services/authService';

export default function ProtectedRoute({ children, requireAdmin = false }) {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        if (!authService.isAuthenticated()) {
          setLoading(false);
          return;
        }

        // Verify token validity with backend
        await authService.verify();
        setIsAuthenticated(true);
        setIsAdmin(authService.isAdmin());
      } catch (error) {
        console.error('Erreur de vérification:', error);
        authService.logout();
        setIsAuthenticated(false);
        setIsAdmin(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" variant="primary" />
        <p className="mt-2">Vérification des droits d'accès...</p>
      </Container>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requireAdmin && !isAdmin) {
    return <Navigate to="/login" replace />;
  }

  return children;
}