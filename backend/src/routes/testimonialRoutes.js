import { Router } from 'express';
import { 
  getAllTestimonials, 
  getTestimonial,
  approveTestimonial, 
  deleteTestimonial
} from '../controllers/testimonialController.js';

const router = Router();

// Admin routes for testimonials management
router.get('/', getAllTestimonials);
router.get('/:id', getTestimonial);
router.put('/:id/approve', approveTestimonial);
router.delete('/:id', deleteTestimonial);

export default router;