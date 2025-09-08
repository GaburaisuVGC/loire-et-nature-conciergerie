import { AuthService } from '../services/authService.js';

const authService = new AuthService();

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Connexion avec token Firebase ID
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               idToken:
 *                 type: string
 *                 description: Token Firebase ID obtenu côté client
 *             required:
 *               - idToken
 *     responses:
 *       200:
 *         description: Connexion réussie
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 user:
 *                   type: object
 *                   properties:
 *                     uid:
 *                       type: string
 *                     email:
 *                       type: string
 *                     isAdmin:
 *                       type: boolean
 *                 token:
 *                   type: string
 *                   description: JWT token pour l'API
 *       401:
 *         description: Token invalide
 *       403:
 *         description: Accès refusé - pas admin
 */
export const login = async (req, res, next) => {
  try {
    const { idToken } = req.body;

    if (!idToken) {
      return res.status(400).json({ 
        error: 'Token Firebase ID requis' 
      });
    }

    // Vérifier le token Firebase et récupérer le rôle
    const user = await authService.verifyFirebaseIdToken(idToken);
    
    if (!user.isAdmin) {
      return res.status(403).json({ 
        error: 'Accès refusé. Droits administrateur requis.' 
      });
    }

    // Générer un token JWT custom pour l'API
    const jwtToken = authService.generateJwtToken(user);
    
    res.json({
      success: true,
      user: {
        uid: user.uid,
        email: user.email,
        isAdmin: user.isAdmin
      },
      token: jwtToken
    });
  } catch (error) {
    console.error('Erreur lors de la connexion:', error);
    res.status(401).json({ 
      error: error.message || 'Erreur lors de la connexion' 
    });
  }
};

/**
 * @swagger
 * /auth/verify:
 *   get:
 *     summary: Vérifier le token d'authentification
 *     tags: [Authentication]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Token valide
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 user:
 *                   type: object
 *                   properties:
 *                     uid:
 *                       type: string
 *                     email:
 *                       type: string
 *                     isAdmin:
 *                       type: boolean
 *       401:
 *         description: Token invalide
 */
export const verify = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ 
        error: 'Token d\'autorisation manquant' 
      });
    }

    const token = authHeader.split('Bearer ')[1];
    const user = await authService.verifyJwtToken(token);

    res.json({
      success: true,
      user
    });
  } catch (error) {
    console.error('Erreur lors de la vérification:', error);
    res.status(401).json({ 
      error: error.message || 'Token invalide' 
    });
  }
};