import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button, Alert, Modal } from "react-bootstrap";
import testimonialService from "../services/testimonialService";

export default function Temoignages() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    rating: 0,
    comment: ''
  });
  const [hoveredRating, setHoveredRating] = useState(0);
  const [submitStatus, setSubmitStatus] = useState({ type: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [selectedTestimonial, setSelectedTestimonial] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    loadTestimonials();
  }, []);

  const loadTestimonials = async () => {
    try {
      setLoading(true);
      const data = await testimonialService.getPublicTestimonials();
      setTestimonials(data);
    } catch (error) {
      console.error('Error loading testimonials:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRatingClick = (rating) => {
    setFormData(prev => ({
      ...prev,
      rating
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus({ type: '', message: '' });

    if (!formData.rating) {
      setSubmitStatus({ 
        type: 'danger', 
        message: 'Veuillez sélectionner une note en cliquant sur les étoiles' 
      });
      return;
    }

    if (formData.comment.length < 10) {
      setSubmitStatus({ 
        type: 'danger', 
        message: 'Votre avis doit contenir au moins 10 caractères' 
      });
      return;
    }

    try {
      setSubmitting(true);
      await testimonialService.createTestimonial(formData);
      setSubmitStatus({ 
        type: 'success', 
        message: 'Merci pour votre témoignage ! Il sera publié après modération.' 
      });
      setFormData({
        email: '',
        name: '',
        rating: 0,
        comment: ''
      });
      setTimeout(() => {
        setSubmitStatus({ type: '', message: '' });
      }, 5000);
    } catch (error) {
      setSubmitStatus({ 
        type: 'danger', 
        message: error.response?.data?.error || 'Une erreur est survenue. Veuillez réessayer.' 
      });
    } finally {
      setSubmitting(false);
    }
  };

  const renderStars = (rating, interactive = false, size = '1.5rem') => {
    return (
      <div className="d-flex" style={{ gap: '5px' }}>
        {[1, 2, 3, 4, 5].map((star) => (
          <i
            key={star}
            className={`bi bi-star${(interactive ? (hoveredRating || formData.rating) : rating) >= star ? '-fill' : ''}`}
            style={{
              fontSize: size,
              color: 'var(--beige-terre)',
              cursor: interactive ? 'pointer' : 'default',
              transition: 'all 0.2s'
            }}
            onClick={() => interactive && handleRatingClick(star)}
            onMouseEnter={() => interactive && setHoveredRating(star)}
            onMouseLeave={() => interactive && setHoveredRating(0)}
          />
        ))}
      </div>
    );
  };

  const truncateText = (text, maxLength = 150) => {
    if (text.length <= maxLength) return { text, isTruncated: false };
    return { 
      text: text.substring(0, maxLength) + '...', 
      isTruncated: true 
    };
  };

  const handleReadMore = (testimonial) => {
    setSelectedTestimonial(testimonial);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedTestimonial(null);
  };

  return (
    <>
      <section 
        className="hero-section"
        style={{
          backgroundImage: `url('/hero-image-temoignages.jpg')`,
          backgroundColor: '#D8CBB5'
        }}
      >
        <div className="hero-overlay"></div>
        <Container>
          <div className="hero-content text-center">
            <h1 className="font-garamond text-vert hero-title" style={{ fontStyle: 'italic', fontWeight: 'bold' }}>
              Vos avis comptent
            </h1>
          </div>
        </Container>
      </section>

      <section className="py-5">
        <Container>
          <h2 className="text-vert font-garamond text-center mb-4" style={{ fontWeight: 'bold' }}>
            Partagez votre avis
          </h2>

          {submitStatus.message && (
            <Alert variant={submitStatus.type} className="mb-4" onClose={() => setSubmitStatus({ type: '', message: '' })} dismissible>
              {submitStatus.message}
            </Alert>
          )}

          <Row className="justify-content-center">
            <Col lg={8}>
              <div className="bg-white p-4 rounded shadow-sm">
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-4">
                    <div className="mb-2">
                      {renderStars(formData.rating, true, '2rem')}
                    </div>
                    <Form.Label className="text-muted small">
                      Cliquez sur une étoile pour noter !
                    </Form.Label>
                  </Form.Group>

                  <Row className="mb-3">
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label>Email *</Form.Label>
                        <Form.Control
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          placeholder="votre@email.com"
                        />
                      </Form.Group>
                    </Col>
                    <Col md={6}>
                      <Form.Group>
                        <Form.Label>Nom/Pseudonyme *</Form.Label>
                        <Form.Control
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                          placeholder="Votre nom ou pseudonyme"
                        />
                      </Form.Group>
                    </Col>
                  </Row>

                  <Form.Group className="mb-3">
                    <Form.Label>Avis *</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={5}
                      name="comment"
                      value={formData.comment}
                      onChange={handleInputChange}
                      required
                      placeholder="Partagez votre expérience avec Loire et Nature..."
                    />
                    <Form.Text className="text-muted">
                      Minimum 10 caractères
                    </Form.Text>
                  </Form.Group>

                  <div className="text-end">
                    <Button 
                      type="submit" 
                      className="btn-custom-vert"
                      disabled={submitting}
                    >
                      {submitting ? 'Envoi...' : 'Valider'}
                    </Button>
                  </div>
                </Form>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="py-5" style={{ backgroundColor: 'var(--rose-pale)' }}>
        <Container>
          <h2 className="text-vert font-garamond text-center mb-5" style={{ fontWeight: 'bold' }}>
            Ils ont également laissé un avis
          </h2>

          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Chargement...</span>
              </div>
            </div>
          ) : testimonials.length === 0 ? (
            <div className="text-center py-5">
              <p className="text-muted">Aucun témoignage pour le moment. Soyez le premier à partager votre expérience !</p>
            </div>
          ) : (
            <Row className="justify-content-center">
              {testimonials.map((testimonial) => {
                const { text, isTruncated } = truncateText(testimonial.comment);
                return (
                  <Col key={testimonial.id} xs={12} sm={6} lg={3}>
                    <div className="testimonial-card h-100 d-flex flex-column">
                      <div className="mb-2">
                        {renderStars(testimonial.rating, false, '1.2rem')}
                        <span className="text-muted" style={{ fontSize: '0.9rem' }}>
                          Par {testimonial.name}
                        </span>
                      </div>
                      <p className="testimonial-text flex-grow-1" style={{ fontSize: '0.95rem' }}>
                        {text}
                      </p>
                      {isTruncated && (
                        <button
                          className="btn btn-link p-0 text-vert"
                          style={{ 
                            textDecoration: 'none', 
                            fontWeight: '600',
                            fontSize: '0.9rem',
                            alignSelf: 'flex-start'
                          }}
                          onClick={() => handleReadMore(testimonial)}
                        >
                          Lire la suite
                        </button>
                      )}
                    </div>
                  </Col>
                );
              })}
            </Row>
          )}
        </Container>
      </section>

      <Modal show={showModal} onHide={handleCloseModal} centered size="lg" backdrop="static">
        <Modal.Header closeButton className="border-0">
          <Modal.Title className="text-vert font-garamond" style={{ fontWeight: 'bold' }}>
            Témoignage complet
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedTestimonial && (
            <>
              <div className="mb-3">
                {renderStars(selectedTestimonial.rating, false, '1.5rem')}
                <div className="text-muted mt-2">
                  Par <strong>{selectedTestimonial.name}</strong>
                </div>
              </div>
              <p style={{ lineHeight: '1.8', color: 'var(--gris-fonce)' }}>
                {selectedTestimonial.comment}
              </p>
            </>
          )}
        </Modal.Body>
      </Modal>

      <style jsx>{`
        .modal-backdrop {
          backdrop-filter: blur(5px);
          background-color: rgba(0, 0, 0, 0.5);
        }
      `}</style>
    </>
  );
}