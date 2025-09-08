import jwt from 'jsonwebtoken';
import { auth, db } from '../config/firebaseConfig.js';

export class AuthService {
  // Create a new admin user
  async createAdminUser(email, password) {
    try {
      // 1. Create user in Firebase Auth
      const userRecord = await auth.createUser({
        email,
        password,
        emailVerified: true
      });

      // 2. Set custom claim for admin
      await db.collection('users').doc(userRecord.uid).set({
        email,
        isAdmin: true,
        createdAt: new Date(),
        updatedAt: new Date()
      });

      return {
        uid: userRecord.uid,
        email,
        isAdmin: true
      };
    } catch (error) {
      console.error('Erreur lors de la création de l\'utilisateur admin:', error);
      throw new Error(`Erreur lors de la création de l'utilisateur: ${error.message}`);
    }
  }

  // Verify Firebase ID Token and get user role
  async verifyFirebaseIdToken(idToken) {
    try {
      // 1. Verify the Firebase ID token
      const decodedToken = await auth.verifyIdToken(idToken);
      
      // 2. Retrieve user role from Firestore
      const userDoc = await db.collection('users').doc(decodedToken.uid).get();
      
      let isAdmin = false;
      if (userDoc.exists) {
        const userData = userDoc.data();
        isAdmin = userData.isAdmin === true;
      }

      return {
        uid: decodedToken.uid,
        email: decodedToken.email,
        isAdmin
      };
    } catch (error) {
      console.error('Erreur lors de la vérification du token Firebase:', error);
      throw new Error('Token Firebase invalide ou expiré');
    }
  }

  // Generate a custom JWT token for the API
  generateJwtToken(user) {
    return jwt.sign(
      { 
        uid: user.uid, 
        email: user.email, 
        isAdmin: user.isAdmin 
      },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );
  }

  // Verify the custom JWT token
  async verifyJwtToken(token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      // Fetch user data to ensure they still exist and get latest role
      const userDoc = await db.collection('users').doc(decoded.uid).get();
      
      if (!userDoc.exists) {
        throw new Error('Utilisateur introuvable');
      }

      const userData = userDoc.data();
      return {
        uid: decoded.uid,
        email: decoded.email,
        isAdmin: userData.isAdmin === true
      };
    } catch (error) {
      console.error('Erreur lors de la vérification du token JWT:', error);
      throw new Error('Token invalide ou expiré');
    }
  }

  // Update user role (admin or not)
  async updateUserRole(uid, isAdmin) {
    try {
      await db.collection('users').doc(uid).update({
        isAdmin,
        updatedAt: new Date()
      });

      return true;
    } catch (error) {
      console.error('Erreur lors de la mise à jour du rôle:', error);
      throw new Error('Impossible de mettre à jour le rôle utilisateur');
    }
  }

  // Get user by UID
  async getUserByUid(uid) {
    try {
      const [userRecord, userDoc] = await Promise.all([
        auth.getUser(uid),
        db.collection('users').doc(uid).get()
      ]);

      let isAdmin = false;
      if (userDoc.exists) {
        const userData = userDoc.data();
        isAdmin = userData.isAdmin === true;
      }

      return {
        uid: userRecord.uid,
        email: userRecord.email,
        emailVerified: userRecord.emailVerified,
        isAdmin,
        createdAt: userRecord.metadata.creationTime,
        lastSignIn: userRecord.metadata.lastSignInTime
      };
    } catch (error) {
      console.error('Erreur lors de la récupération de l\'utilisateur:', error);
      throw new Error('Utilisateur introuvable');
    }
  }
}