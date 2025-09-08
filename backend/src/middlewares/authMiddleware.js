import { AuthService } from '../services/authService.js';

const authService = new AuthService();

export const isAuthenticated = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Token d\'autorisation manquant ou malformé' });
  }

  const token = authHeader.split('Bearer ')[1];

  try {
    const user = await authService.verifyJwtToken(token);
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ error: error.message });
  }
};

export const isAdmin = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Token d\'autorisation manquant ou malformé' });
  }

  const token = authHeader.split('Bearer ')[1];

  try {
    const user = await authService.verifyJwtToken(token);

    if (!user.isAdmin) {
      return res.status(403).json({ error: 'Accès refusé. Droits administrateur requis.' });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ error: error.message });
  }
};