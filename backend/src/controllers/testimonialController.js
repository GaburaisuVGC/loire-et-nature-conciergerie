import { Testimonial } from '../models/Testimonial.js';

/**
 * @swagger
 * /testimonials:
 *   get:
 *     summary: Get all testimonials (Admin only)
 *     tags: [Testimonials]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all testimonials
 */
export const getAllTestimonials = async (req, res, next) => {
  try {
    const testimonials = await Testimonial.findAll();
    res.json({
      success: true,
      count: testimonials.length,
      testimonials: testimonials.map(t => t.toJSON())
    });
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    next(error);
  }
};

/**
 * @swagger
 * /testimonials/{id}:
 *   get:
 *     summary: Get a specific testimonial (Admin only)
 *     tags: [Testimonials]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Testimonial details
 *       404:
 *         description: Testimonial not found
 */
export const getTestimonial = async (req, res, next) => {
  try {
    const { id } = req.params;
    const testimonial = await Testimonial.findById(id);

    if (!testimonial) {
      return res.status(404).json({
        success: false,
        error: 'Testimonial not found'
      });
    }

    res.json({
      success: true,
      testimonial: testimonial.toJSON()
    });
  } catch (error) {
    console.error('Error fetching testimonial:', error);
    next(error);
  }
};

/**
 * @swagger
 * /testimonials/{id}/approve:
 *   put:
 *     summary: Approve a testimonial (Admin only)
 *     tags: [Testimonials]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Testimonial approved successfully
 *       404:
 *         description: Testimonial not found
 */
export const approveTestimonial = async (req, res, next) => {
  try {
    const { id } = req.params;
    const testimonial = await Testimonial.findById(id);

    if (!testimonial) {
      return res.status(404).json({
        success: false,
        error: 'Testimonial not found'
      });
    }

    await testimonial.approve();

    res.json({
      success: true,
      message: 'Testimonial approved successfully',
      testimonial: testimonial.toJSON()
    });
  } catch (error) {
    console.error('Error approving testimonial:', error);
    next(error);
  }
};

/**
 * @swagger
 * /testimonials/{id}:
 *   delete:
 *     summary: Delete a testimonial (Admin only)
 *     tags: [Testimonials]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Testimonial deleted successfully
 *       404:
 *         description: Testimonial not found
 */
export const deleteTestimonial = async (req, res, next) => {
  try {
    const { id } = req.params;
    const testimonial = await Testimonial.findById(id);

    if (!testimonial) {
      return res.status(404).json({
        success: false,
        error: 'Testimonial not found'
      });
    }

    await testimonial.delete();

    res.json({
      success: true,
      message: 'Testimonial deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting testimonial:', error);
    next(error);
  }
};