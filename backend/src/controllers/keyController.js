import { PropertyKeysService } from '../services/propertyKeysService.js';

/**
 * @swagger
 * /keys/{propId}:
 *   get:
 *     summary: Get the propKey for a given property ID
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
 *         description: The propKey was found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 propKey:
 *                   type: string
 *       404:
 *         description: No propKey found for the given propId.
 */
export const getPropKey = async (req, res, next) => {
  try {
    const { propId } = req.params;
    const propKey = await PropertyKeysService.getPropKey(propId);
    if (!propKey) {
      return res.status(404).json({ message: 'No propKey found for this property.' });
    }
    res.json({ propKey, propId });
  } catch (error) {
    next(error);
  }
};

/**
 * @swagger
 * /keys:
 *   post:
 *     summary: Set or update the propKey for a given property ID
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
 *             required:
 *               - propId
 *               - propKey
 *     responses:
 *       200:
 *         description: The propKey was set successfully.
 *       400:
 *         description: Missing propId or propKey in the request body.
 */
export const setPropKey = async (req, res, next) => {
  try {
    const { propId, propKey } = req.body;
    if (!propId || !propKey) {
      return res.status(400).json({ error: 'propId and propKey are required.' });
    }
    await PropertyKeysService.setPropKey(propId, propKey);
    res.status(200).json({ message: 'propKey updated successfully.' });
  } catch (error) {
    next(error);
  }
};