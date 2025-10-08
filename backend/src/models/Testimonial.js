import { db } from '../config/firebaseConfig.js';

export class Testimonial {
  constructor(data) {
    this.id = data.id || null;
    this.email = data.email;
    this.name = data.name;
    this.rating = data.rating;
    this.comment = data.comment;
    this.createdAt = data.createdAt || new Date();
    this.approved = data.approved || false;
  }

  // Create a new testimonial
  static async create(testimonialData) {
    const testimonial = new Testimonial({
      ...testimonialData,
      createdAt: new Date(),
      approved: false
    });

    const docRef = await db.collection('testimonials').add({
      email: testimonial.email,
      name: testimonial.name,
      rating: testimonial.rating,
      comment: testimonial.comment,
      createdAt: testimonial.createdAt,
      approved: testimonial.approved
    });

    testimonial.id = docRef.id;
    return testimonial;
  }

  // Find all testimonials (admin only)
  static async findAll() {
    const snapshot = await db.collection('testimonials')
      .orderBy('createdAt', 'desc')
      .get();
    return snapshot.docs.map(doc => new Testimonial({ id: doc.id, ...doc.data() }));
  }

  // Find only approved testimonials (public)
  static async findApproved() {
    const snapshot = await db.collection('testimonials')
      .where('approved', '==', true)
      .orderBy('createdAt', 'desc')
      .get();
    return snapshot.docs.map(doc => new Testimonial({ id: doc.id, ...doc.data() }));
  }

  // Find top rated testimonials for home page
  static async findTopRated(limit = 3) {
    const snapshot = await db.collection('testimonials')
      .where('approved', '==', true)
      .where('rating', '>=', 4)
      .orderBy('rating', 'desc')
      .orderBy('createdAt', 'desc')
      .limit(limit)
      .get();
    return snapshot.docs.map(doc => new Testimonial({ id: doc.id, ...doc.data() }));
  }

  // Find a testimonial by ID
  static async findById(id) {
    const doc = await db.collection('testimonials').doc(id).get();
    if (!doc.exists) {
      return null;
    }
    return new Testimonial({ id: doc.id, ...doc.data() });
  }

  // Update a testimonial
  async update(updateData) {
    await db.collection('testimonials').doc(this.id).update(updateData);
    Object.assign(this, updateData);
    return this;
  }

  // Approve a testimonial
  async approve() {
    await this.update({ approved: true });
    return this;
  }

  // Delete a testimonial
  async delete() {
    await db.collection('testimonials').doc(this.id).delete();
    return true;
  }

  // Convert to JSON
  toJSON() {
    return {
      id: this.id,
      email: this.email,
      name: this.name,
      rating: this.rating,
      comment: this.comment,
      createdAt: this.createdAt,
      approved: this.approved
    };
  }
}