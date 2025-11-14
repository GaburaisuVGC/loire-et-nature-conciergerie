import { Router } from 'express';
import { 
  getProperty, 
  createProperty, 
  updateProperty, 
  deleteProperty
} from '../controllers/propertyController.js';

const router = Router();

// CRUD routes for properties. These are protected by the isAdmin middleware in server.js.
router.get('/:id', getProperty);
router.post('/', createProperty);
router.put('/:id', updateProperty);
router.delete('/:id', deleteProperty);

export default router;