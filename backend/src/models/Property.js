import { db } from '../config/firebaseConfig.js';

export class Property {
  constructor(data) {
    this.id = data.id || null;
    this.name = data.name;
    this.address = data.address;
    this.beds24Id = data.beds24Id;
    this.coordinates = data.coordinates || null; // { lat, lng }
    this.description = data.description || '';
    this.images = data.images || [];
    this.createdAt = data.createdAt || new Date();
    this.updatedAt = data.updatedAt || new Date();
  }

  // Create a new property
  static async create(propertyData) {
    const property = new Property({
      ...propertyData,
      createdAt: new Date(),
      updatedAt: new Date()
    });

    const docRef = await db.collection('properties').add({
      name: property.name,
      address: property.address,
      beds24Id: property.beds24Id,
      coordinates: property.coordinates,
      description: property.description,
      images: property.images,
      createdAt: property.createdAt,
      updatedAt: property.updatedAt
    });

    property.id = docRef.id;
    return property;
  }

  // Find all properties
  static async findAll() {
    const snapshot = await db.collection('properties').orderBy('createdAt', 'desc').get();
    return snapshot.docs.map(doc => new Property({ id: doc.id, ...doc.data() }));
  }

  // Find a property by ID
  static async findById(id) {
    const doc = await db.collection('properties').doc(id).get();
    if (!doc.exists) {
      return null;
    }
    return new Property({ id: doc.id, ...doc.data() });
  }

  // Find a property by Beds24 ID
  static async findByBeds24Id(beds24Id) {
    const snapshot = await db.collection('properties')
      .where('beds24Id', '==', beds24Id)
      .limit(1)
      .get();
    
    if (snapshot.empty) {
      return null;
    }
    
    const doc = snapshot.docs[0];
    return new Property({ id: doc.id, ...doc.data() });
  }

  // Update a property
  async update(updateData) {
    const updatedData = {
      ...updateData,
      updatedAt: new Date()
    };

    await db.collection('properties').doc(this.id).update(updatedData);
    
    // Update instance properties
    Object.assign(this, updatedData);
    return this;
  }

  // Delete a property
  async delete() {
    await db.collection('properties').doc(this.id).delete();
    return true;
  }

  // Convert to JSON
  toJSON() {
    return {
      id: this.id,
      name: this.name,
      address: this.address,
      beds24Id: this.beds24Id,
      coordinates: this.coordinates,
      description: this.description,
      images: this.images,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }
}