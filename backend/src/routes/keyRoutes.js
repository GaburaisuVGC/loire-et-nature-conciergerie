import { Router } from 'express';
import { getPropKey, setPropKey } from '../controllers/keyController.js';

const router = Router();

/**
 * @swagger
 * /api/keys/{propId}:
 *   get:
 *     summary: Get a propKey for a property
 *     tags: [Keys]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: propId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: propKey found
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (not an admin)
 *       404:
 *         description: propKey not found
 */
router.get('/:propId', getPropKey);

/**
 * @swagger
 * /api/keys:
 *   post:
 *     summary: Set a propKey for a property
 *     tags: [Keys]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               propId:
 *                 type: string
 *               propKey:
 *                 type: string
 *     responses:
 *       200:
 *         description: propKey set successfully
 *       400:
 *         description: Bad request (missing parameters)
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden (not an admin)
 */
router.post('/', setPropKey);

export default router;