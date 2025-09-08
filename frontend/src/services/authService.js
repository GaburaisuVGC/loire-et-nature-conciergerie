import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

// Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
};

class AuthService {
  constructor() {
    this.token = localStorage.getItem('authToken');
    this.user = JSON.parse(localStorage.getItem('user') || 'null');
    this.firebaseAuth = null;
    
    // Initialize Firebase
    this.initFirebase();
    
    // Set up Axios interceptors
    axios.interceptors.request.use(
      (config) => {
        const token = this.getToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Intercept responses to handle 401 errors globally
    axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          this.logout();
          window.location.href = '/login';
        }
        return Promise.reject(error);
      }
    );
  }

  async initFirebase() {
    try {
      // Dynamically import Firebase modules
      const { initializeApp } = await import('firebase/app');
      const { getAuth, signInWithEmailAndPassword } = await import('firebase/auth');
      
      const app = initializeApp(firebaseConfig);
      this.firebaseAuth = getAuth(app);
      this.signInWithEmailAndPassword = signInWithEmailAndPassword;
    } catch (error) {
      console.error('Erreur lors de l\'initialisation de Firebase:', error);
    }
  }

  async login(email, password) {
    try {
      // 1. Firebase login
      if (!this.firebaseAuth || !this.signInWithEmailAndPassword) {
        throw new Error('Firebase Auth non initialisé');
      }

      const userCredential = await this.signInWithEmailAndPassword(
        this.firebaseAuth, 
        email, 
        password
      );
      
      // 2. Fetch Firebase ID token
      const idToken = await userCredential.user.getIdToken();
      
      // 3. Login to backend API
      const response = await axios.post(`${API_BASE_URL}/auth/login`, {
        idToken
      });

      const { user, token } = response.data;
      
      this.setToken(token);
      this.setUser(user);
      
      return { user, token };
    } catch (error) {
      console.error('Erreur lors de la connexion:', error);
      
      let errorMessage = 'Erreur lors de la connexion';
      
      if (error.code === 'auth/user-not-found') {
        errorMessage = 'Aucun compte trouvé avec cet email';
      } else if (error.code === 'auth/wrong-password') {
        errorMessage = 'Mot de passe incorrect';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Adresse email invalide';
      } else if (error.code === 'auth/too-many-requests') {
        errorMessage = 'Trop de tentatives. Réessayez plus tard';
      } else if (error.response?.data?.error) {
        errorMessage = error.response.data.error;
      }
      
      throw new Error(errorMessage);
    }
  }

  async verify() {
    try {
      if (!this.token) {
        throw new Error('Aucun token disponible');
      }

      const response = await axios.get(`${API_BASE_URL}/auth/verify`);
      const { user } = response.data;
      
      this.setUser(user);
      return user;
    } catch (error) {
      console.error('Erreur lors de la vérification:', error);
      this.logout();
      throw new Error('Token invalide');
    }
  }

  async logout() {
    try {
      // Firebase logout
      if (this.firebaseAuth) {
        const { signOut } = await import('firebase/auth');
        await signOut(this.firebaseAuth);
      }
    } catch (error) {
      console.error('Erreur lors de la déconnexion Firebase:', error);
    } finally {
      // local logout
      this.token = null;
      this.user = null;
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
    }
  }

  setToken(token) {
    this.token = token;
    localStorage.setItem('authToken', token);
  }

  setUser(user) {
    this.user = user;
    localStorage.setItem('user', JSON.stringify(user));
  }

  getToken() {
    return this.token;
  }

  getUser() {
    return this.user;
  }

  isAuthenticated() {
    return !!this.token && !!this.user;
  }

  isAdmin() {
    return this.user?.isAdmin === true;
  }
}

export default new AuthService();