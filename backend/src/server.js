import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes.js';
import publicRoutes from './routes/publicRoutes.js';
import testimonialRoutes from './routes/testimonialRoutes.js';
import keyRoutes from './routes/keyRoutes.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { isAdmin } from './middlewares/authMiddleware.js';

dotenv.config();
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Public routes (no authentication required)
app.use('/api/public', publicRoutes);

// Auth routes
app.use('/api/auth', authRoutes);

// Protected routes (authentication required)
app.use('/api/testimonials', isAdmin, testimonialRoutes);
app.use('/api/keys', keyRoutes);

// Swagger setup
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Loire Nature Conciergerie API',
      version: '1.0.0',
      description: 'API pour la gestion des réservations et des tâches administratives.',
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT || 3000}/api`,
        description: 'Serveur de développement',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        }
      }
    },
    security: [{
      bearerAuth: []
    }]
  },
  apis: ['./src/routes/*.js', './src/controllers/*.js'],
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Test route
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Loire Nature Conciergerie API is running',
    timestamp: new Date().toISOString()
  });
});

// Error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Serveur démarré sur le port ${PORT}`);
  console.log(`📖 Documentation disponible à http://localhost:${PORT}/api-docs`);
});

export default app;