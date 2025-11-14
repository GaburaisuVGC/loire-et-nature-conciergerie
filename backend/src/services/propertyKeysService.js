import { db } from '../config/firebaseConfig.js';

const keysCollection = db.collection('propertiesKeys');

export class PropertyKeysService {
  /**
   * Retrieves the propKey for a given propId.
   * @param {string} propId - The ID of the property.
   * @returns {Promise<string|null>} The propKey if found, otherwise null.
   */
  static async getPropKey(propId) {
    try {
      const doc = await keysCollection.doc(propId).get();
      if (!doc.exists) {
        console.warn(`No propKey found for propId: ${propId}`);
        return null;
      }
      const data = doc.data();
      return data.propKey || null;
    } catch (error) {
      console.error(`Error getting propKey for propId ${propId}:`, error);
      throw new Error('Failed to retrieve property key.');
    }
  }

  /**
   * Sets or updates the propKey for a given propId.
   * @param {string} propId - The ID of the property.
   * @param {string} propKey - The key to set for the property.
   * @returns {Promise<void>}
   */
  static async setPropKey(propId, propKey) {
    try {
      await keysCollection.doc(propId).set({
        propId,
        propKey,
        updatedAt: new Date(),
      }, { merge: true });
    } catch (error) {
      console.error(`Error setting propKey for propId ${propId}:`, error);
      throw new Error('Failed to set property key.');
    }
  }
}