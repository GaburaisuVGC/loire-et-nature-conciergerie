import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Table, Modal, Form, Alert, Badge, Tabs, Tab } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';
import propertyService from '../services/propertyService';
import testimonialService from '../services/testimonialService';

export default function Admin() {
  const [properties, setProperties] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingProperty, setEditingProperty] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    beds24Id: '',
    description: '',
    coordinates: { lat: '', lng: '' }
  });
  const [activeTab, setActiveTab] = useState('properties');
  const navigate = useNavigate();

  useEffect(() => {
    if (!authService.isAuthenticated() || !authService.isAdmin()) {
      navigate('/login');
      return;
    }

    loadData();
  }, [navigate]);

  const loadData = async () => {
    try {
      setLoading(true);
      await Promise.all([
        loadProperties(),
        loadTestimonials()
      ]);
    } catch (err) {
      setError('Erreur lors du chargement des données');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const loadProperties = async () => {
    try {
      const data = await propertyService.getProperties();
      setProperties(data);
    } catch (err) {
      console.error('Error loading properties:', err);
    }
  };

  const loadTestimonials = async () => {
    try {
      const data = await testimonialService.getAllTestimonials();
      setTestimonials(data);
    } catch (err) {
      console.error('Error loading testimonials:', err);
    }
  };

  const handleLogout = () => {
    authService.logout();
    navigate('/login');
  };

  const handleEdit = (property) => {
    setEditingProperty(property);
    setFormData({
      name: property.name,
      address: property.address,
      beds24Id: property.beds24Id,
      description: property.description || '',
      coordinates: property.coordinates || { lat: '', lng: '' }
    });
    setShowModal(true);
  };

  const handleCreate = () => {
    setEditingProperty(null);
    setFormData({
      name: '',
      address: '',
      beds24Id: '',
      description: '',
      coordinates: { lat: '', lng: '' }
    });
    setShowModal(true);
  };

  const handleDelete = async (property) => {
    if (!window.confirm(`Êtes-vous sûr de vouloir supprimer "${property.name}" ?`)) {
      return;
    }

    try {
      await propertyService.deleteProperty(property.id);
      await loadProperties();
      setError('');
    } catch (err) {
      setError('Erreur lors de la suppression de la propriété');
      console.error(err);
    }
  };

  const handleDeleteTestimonial = async (testimonial) => {
    if (!window.confirm(`Êtes-vous sûr de vouloir supprimer le témoignage de "${testimonial.name}" ?`)) {
      return;
    }

    try {
      await testimonialService.deleteTestimonial(testimonial.id);
      await loadTestimonials();
      setError('');
    } catch (err) {
      setError('Erreur lors de la suppression du témoignage');
      console.error(err);
    }
  };

  const handleApproveTestimonial = async (testimonial) => {
    try {
      await testimonialService.approveTestimonial(testimonial.id);
      await loadTestimonials();
      setError('');
    } catch (err) {
      setError('Erreur lors de l\'approbation du témoignage');
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const propertyData = {
        ...formData,
        coordinates: formData.coordinates.lat && formData.coordinates.lng 
          ? { lat: parseFloat(formData.coordinates.lat), lng: parseFloat(formData.coordinates.lng) }
          : null
      };

      if (editingProperty) {
        await propertyService.updateProperty(editingProperty.id, propertyData);
      } else {
        await propertyService.createProperty(propertyData);
      }

      await loadProperties();
      setShowModal(false);
      setEditingProperty(null);
    } catch (err) {
      setError(`Erreur lors de ${editingProperty ? 'la modification' : 'la création'} de la propriété`);
      console.error(err);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name.startsWith('coordinates.')) {
      const coordField = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        coordinates: {
          ...prev.coordinates,
          [coordField]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const renderStars = (rating) => {
    return (
      <div className="d-flex" style={{ gap: '3px' }}>
        {[1, 2, 3, 4, 5].map((star) => (
          <i
            key={star}
            className={`bi bi-star${rating >= star ? '-fill' : ''}`}
            style={{
              fontSize: '1rem',
              color: 'var(--beige-terre)'
            }}
          />
        ))}
      </div>
    );
  };

  const formatDate = (date) => {
    if (!date) return 'N/A';
    
    let d;
    // Si c'est un Timestamp Firebase
    if (date && typeof date.toDate === 'function') {
      d = date.toDate();
    } 
    // Si c'est un objet avec _seconds (format Firestore)
    else if (date && date._seconds) {
      d = new Date(date._seconds * 1000);
    }
    // Si c'est déjà une Date ou un string
    else {
      d = new Date(date);
    }
    
    // Vérifier que la date est valide
    if (isNaN(d.getTime())) {
      return 'N/A';
    }
    
    return d.toLocaleDateString('fr-FR', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <Container className="py-5">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Chargement...</span>
          </div>
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <Row className="mb-4">
        <Col>
          <div className="d-flex justify-content-between align-items-center">
            <h1 className="text-vert font-garamond" style={{ fontWeight: 'bold' }}>
              Administration
            </h1>
            <Button variant="outline-danger" onClick={handleLogout}>
              <i className="bi bi-box-arrow-right me-2"></i>
              Déconnexion
            </Button>
          </div>
        </Col>
      </Row>

      {error && (
        <Alert variant="danger" onClose={() => setError('')} dismissible>
          {error}
        </Alert>
      )}

      <Tabs
        activeKey={activeTab}
        onSelect={(k) => setActiveTab(k)}
        className="mb-4"
      >
        <Tab eventKey="properties" title={`Propriétés (${properties.length})`}>
          <Card>
            <Card.Header className="d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Gestion des Propriétés</h5>
              <Button className="btn-custom-vert" onClick={handleCreate}>
                <i className="bi bi-plus-circle me-2"></i>
                Ajouter une propriété
              </Button>
            </Card.Header>
            <Card.Body>
              {properties.length === 0 ? (
                <div className="text-center py-4">
                  <p className="text-muted">Aucune propriété configurée</p>
                  <Button className="btn-primary" onClick={handleCreate}>
                    Ajouter votre première propriété
                  </Button>
                </div>
              ) : (
                <div className="table-responsive">
                  <Table striped hover>
                    <thead>
                      <tr>
                        <th>Nom</th>
                        <th>Adresse</th>
                        <th>ID Beds24</th>
                        <th>Coordonnées</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {properties.map((property) => (
                        <tr key={property.id}>
                          <td>
                            <strong>{property.name}</strong>
                            {property.description && (
                              <div className="text-muted small">
                                {property.description.substring(0, 100)}...
                              </div>
                            )}
                          </td>
                          <td>{property.address}</td>
                          <td>
                            <Badge bg="info">{property.beds24Id}</Badge>
                          </td>
                          <td>
                            {property.coordinates?.lat && property.coordinates?.lng ? (
                              <small>
                                {property.coordinates.lat}, {property.coordinates.lng}
                              </small>
                            ) : (
                              <span className="text-muted">Non défini</span>
                            )}
                          </td>
                          <td>
                            <div className="d-flex gap-2">
                              <Button
                                size="sm"
                                variant="outline-primary"
                                onClick={() => handleEdit(property)}
                              >
                                <i className="bi bi-pencil"></i>
                              </Button>
                              <Button
                                size="sm"
                                variant="outline-danger"
                                onClick={() => handleDelete(property)}
                              >
                                <i className="bi bi-trash"></i>
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              )}
            </Card.Body>
          </Card>
        </Tab>

        <Tab eventKey="testimonials" title={`Témoignages (${testimonials.length})`}>
          <Card>
            <Card.Header>
              <h5 className="mb-0">Gestion des Témoignages</h5>
            </Card.Header>
            <Card.Body>
              {testimonials.length === 0 ? (
                <div className="text-center py-4">
                  <p className="text-muted">Aucun témoignage reçu</p>
                </div>
              ) : (
                <div className="table-responsive">
                  <Table striped hover>
                    <thead>
                      <tr>
                        <th style={{ width: '15%' }}>Nom</th>
                        <th style={{ width: '15%' }}>Email</th>
                        <th style={{ width: '10%' }}>Note</th>
                        <th style={{ width: '35%' }}>Commentaire</th>
                        <th style={{ width: '10%' }}>Statut</th>
                        <th style={{ width: '15%' }}>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {testimonials.map((testimonial) => (
                        <tr key={testimonial.id}>
                          <td>
                            <strong>{testimonial.name}</strong>
                          </td>
                          <td>
                            <small>{testimonial.email}</small>
                            <div className="text-muted" style={{ fontSize: '0.75rem' }}>
                              {formatDate(testimonial.createdAt)}
                            </div>
                          </td>
                          <td>
                            {renderStars(testimonial.rating)}
                            <div className="text-muted" style={{ fontSize: '0.85rem' }}>
                              {testimonial.rating}/5
                            </div>
                          </td>
                          <td>
                            <div style={{ 
                              maxHeight: '80px', 
                              overflow: 'auto',
                              fontSize: '0.9rem'
                            }}>
                              {testimonial.comment}
                            </div>
                          </td>
                          <td>
                            {testimonial.approved ? (
                              <Badge bg="success">Approuvé</Badge>
                            ) : (
                              <Badge bg="warning" text="dark">En attente</Badge>
                            )}
                          </td>
                          <td>
                            <div className="d-flex flex-column gap-2">
                              {!testimonial.approved && (
                                <Button
                                  size="sm"
                                  variant="success"
                                  onClick={() => handleApproveTestimonial(testimonial)}
                                  className="w-100"
                                >
                                  <i className="bi bi-check-circle me-1"></i>
                                  Approuver
                                </Button>
                              )}
                              <Button
                                size="sm"
                                variant="outline-danger"
                                onClick={() => handleDeleteTestimonial(testimonial)}
                                className="w-100"
                              >
                                <i className="bi bi-trash me-1"></i>
                                Supprimer
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              )}
            </Card.Body>
          </Card>
        </Tab>
      </Tabs>

      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            {editingProperty ? 'Modifier la propriété' : 'Nouvelle propriété'}
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>Nom *</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                placeholder="Ex: Les studios de l'Albatros"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Adresse *</Form.Label>
              <Form.Control
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                required
                placeholder="Adresse complète"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>ID Beds24 *</Form.Label>
              <Form.Control
                type="text"
                name="beds24Id"
                value={formData.beds24Id}
                onChange={handleInputChange}
                required
                placeholder="ID de la propriété sur Beds24"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Description de la propriété"
              />
            </Form.Group>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Latitude</Form.Label>
                  <Form.Control
                    type="number"
                    step="any"
                    name="coordinates.lat"
                    value={formData.coordinates.lat}
                    onChange={handleInputChange}
                    placeholder="Ex: 47.2184"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Longitude</Form.Label>
                  <Form.Control
                    type="number"
                    step="any"
                    name="coordinates.lng"
                    value={formData.coordinates.lng}
                    onChange={handleInputChange}
                    placeholder="Ex: -1.5536"
                  />
                </Form.Group>
              </Col>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Annuler
            </Button>
            <Button type="submit" className="btn-primary">
              {editingProperty ? 'Mettre à jour' : 'Créer'}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Container>
  );
}