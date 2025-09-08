import { Property } from '../models/Property.js';
import { Beds24Service } from '../services/beds24Service.js';

const beds24Service = new Beds24Service();

/**
 * @swagger
 * components:
 *   schemas:
 *     Property:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         name:
 *           type: string
 *         address:
 *           type: string
 *         beds24Id:
 *           type: string
 *         coordinates:
 *           type: object
 *           properties:
 *             lat:
 *               type: number
 *             lng:
 *               type: number
 *         description:
 *           type: string
 *         images:
 *           type: array
 *           items:
 *             type: string
 */

/**
 * @swagger
 * /properties:
 *   get:
 *     summary: Get all properties
 *     tags: [Properties]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of properties
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Property'
 */
export const getProperties = async (req, res, next) => {
  try {
    const properties = await Property.findAll();
    res.json(properties.map(property => property.toJSON()));
  } catch (error) {
    next(error);
  }
};

/**
 * @swagger
 * /properties/{id}:
 *   get:
 *     summary: Get a property by ID
 *     tags: [Properties]
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
 *         description: Property found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Property'
 *       404:
 *         description: Property not found
 */
export const getProperty = async (req, res, next) => {
  try {
    const { id } = req.params;
    const property = await Property.findById(id);
    
    if (!property) {
      return res.status(404).json({ error: 'Propriété non trouvée' });
    }
    
    res.json(property.toJSON());
  } catch (error) {
    next(error);
  }
};

/**
 * @swagger
 * /properties:
 *   post:
 *     summary: Create a new property
 *     tags: [Properties]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               address:
 *                 type: string
 *               beds24Id:
 *                 type: string
 *               coordinates:
 *                 type: object
 *                 properties:
 *                   lat:
 *                     type: number
 *                   lng:
 *                     type: number
 *               description:
 *                 type: string
 *             required:
 *               - name
 *               - address
 *               - beds24Id
 *     responses:
 *       201:
 *         description: Property created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Property'
 */
export const createProperty = async (req, res, next) => {
  try {
    const { name, address, beds24Id, coordinates, description, images } = req.body;

    if (!name || !address || !beds24Id) {
      return res.status(400).json({ 
        error: 'Nom, adresse et ID Beds24 sont requis' 
      });
    }

    // Check if a property with the same beds24Id already exists
    const existingProperty = await Property.findByBeds24Id(beds24Id);
    if (existingProperty) {
      return res.status(409).json({ 
        error: 'Une propriété avec cet ID Beds24 existe déjà' 
      });
    }

    const property = await Property.create({
      name,
      address,
      beds24Id,
      coordinates,
      description,
      images
    });

    res.status(201).json(property.toJSON());
  } catch (error) {
    next(error);
  }
};

/**
 * @swagger
 * /properties/{id}:
 *   put:
 *     summary: Update a property
 *     tags: [Properties]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               address:
 *                 type: string
 *               beds24Id:
 *                 type: string
 *               coordinates:
 *                 type: object
 *               description:
 *                 type: string
 *               images:
 *                 type: array
 *     responses:
 *       200:
 *         description: Property updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Property'
 *       404:
 *         description: Property not found
 */
export const updateProperty = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const property = await Property.findById(id);
    if (!property) {
      return res.status(404).json({ error: 'Propriété non trouvée' });
    }

    // If beds24Id is being updated, check for uniqueness
    if (updateData.beds24Id && updateData.beds24Id !== property.beds24Id) {
      const existingProperty = await Property.findByBeds24Id(updateData.beds24Id);
      if (existingProperty) {
        return res.status(409).json({ 
          error: 'Une propriété avec cet ID Beds24 existe déjà' 
        });
      }
    }

    const updatedProperty = await property.update(updateData);
    res.json(updatedProperty.toJSON());
  } catch (error) {
    next(error);
  }
};

/**
 * @swagger
 * /properties/{id}:
 *   delete:
 *     summary: Delete a property
 *     tags: [Properties]
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
 *         description: Property deleted
 *       404:
 *         description: Property not found
 */
export const deleteProperty = async (req, res, next) => {
  try {
    const { id } = req.params;
    
    const property = await Property.findById(id);
    if (!property) {
      return res.status(404).json({ error: 'Propriété non trouvée' });
    }

    await property.delete();
    res.json({ message: 'Propriété supprimée avec succès' });
  } catch (error) {
    next(error);
  }
};

/**
 * @swagger
 * /properties/{id}/beds24-availability:
 *   get:
 *     summary: Get Beds24 availability for a property
 *     tags: [Properties]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: start
 *         schema:
 *           type: string
 *           format: date
 *       - in: query
 *         name: end
 *         schema:
 *           type: string
 *           format: date
 *     responses:
 *       200:
 *         description: Availability data
 *       404:
 *         description: Property not found
 */
export const getBeds24Availability = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { start, end } = req.query;

    const property = await Property.findById(id);
    if (!property) {
      return res.status(404).json({ error: 'Propriété non trouvée' });
    }

    const availability = await beds24Service.getAvailability(property.beds24Id, {
      start,
      end
    });

    res.json(availability);
  } catch (error) {
    next(error);
  }
};