import { Router } from 'express';
import { 
  getProperties, 
  getProperty, 
  createProperty, 
  updateProperty, 
  deleteProperty,
  getBeds24Availability 
} from '../controllers/propertyController.js';

const router = Router();

// CRUD routes for properties
router.get('/', getProperties);
router.get('/:id', getProperty);
router.post('/', createProperty);
router.put('/:id', updateProperty);
router.delete('/:id', deleteProperty);

// Route to get Beds24 availability for a property
router.get('/:id/beds24-availability', getBeds24Availability);

export default router;