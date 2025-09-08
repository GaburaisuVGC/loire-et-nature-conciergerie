import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Table, Modal, Form, Alert, Badge } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import authService from '../services/authService';
import propertyService from '../services/propertyService';

export default function Admin() {
  const [properties, setProperties] = useState([]);
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
  const navigate = useNavigate();

  useEffect(() => {
    // Verify admin access
    if (!authService.isAuthenticated() || !authService.isAdmin()) {
      navigate('/login');
      return;
    }

    loadProperties();
  }, [navigate]);

  const loadProperties = async () => {
    try {
      setLoading(true);
      const data = await propertyService.getProperties();
      setProperties(data);
    } catch (err) {
      setError('Erreur lors du chargement des propriétés');
      console.error(err);
    } finally {
      setLoading(false);
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
      setError(err.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const propertyData = {
        ...formData,
        coordinates: {
          lat: parseFloat(formData.coordinates.lat) || null,
          lng: parseFloat(formData.coordinates.lng) || null
        }
      };

      if (editingProperty) {
        await propertyService.updateProperty(editingProperty.id, propertyData);
      } else {
        await propertyService.createProperty(propertyData);
      }

      setShowModal(false);
      await loadProperties();
      setError('');
    } catch (err) {
      setError(err.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name.startsWith('coordinates.')) {
      const coord = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        coordinates: {
          ...prev.coordinates,
          [coord]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <h3>Chargement...</h3>
      </Container>
    );
  }

  return (
    <Container className="py-4">
      {/* Header */}
      <Row className="mb-4">
        <Col>
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h1 className="text-primary-custom">Administration</h1>
              <p className="text-muted mb-0">
                Gestion des propriétés Beds24
              </p>
            </div>
            <div>
              <Button
                variant="outline-secondary"
                size="sm"
                className="me-2"
                onClick={handleLogout}
              >
                Déconnexion
              </Button>
              <Badge bg="success">
                {authService.getUser()?.email}
              </Badge>
            </div>
          </div>
        </Col>
      </Row>

      {error && (
        <Alert variant="danger" dismissible onClose={() => setError('')}>
          {error}
        </Alert>
      )}

      {/* Actions */}
      <Row className="mb-3">
        <Col>
          <Button
            className="btn-primary"
            onClick={handleCreate}
          >
            <i className="bi bi-plus-circle me-2"></i>
            Ajouter une propriété
          </Button>
        </Col>
      </Row>

      {/* Properties Table */}
      <Row>
        <Col>
          <Card>
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
                                {property.description}
                              </div>
                            )}
                          </td>
                          <td>{property.address}</td>
                          <td>
                            <Badge bg="info">{property.beds24Id}</Badge>
                          </td>
                          <td>
                            {property.coordinates?.lat && property.coordinates?.lng ? (
                              <span className="text-success">
                                {property.coordinates.lat.toFixed(4)}, {property.coordinates.lng.toFixed(4)}
                              </span>
                            ) : (
                              <span className="text-muted">Non défini</span>
                            )}
                          </td>
                          <td>
                            <Button
                              variant="outline-primary"
                              size="sm"
                              className="me-2"
                              onClick={() => handleEdit(property)}
                            >
                              <i className="bi bi-pencil"></i>
                            </Button>
                            <Button
                              variant="outline-danger"
                              size="sm"
                              onClick={() => handleDelete(property)}
                            >
                              <i className="bi bi-trash"></i>
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Create/Edit Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            {editingProperty ? 'Modifier la propriété' : 'Ajouter une propriété'}
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Nom de la propriété *</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Villa Loire & Nature"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>ID Beds24 *</Form.Label>
                  <Form.Control
                    type="text"
                    name="beds24Id"
                    value={formData.beds24Id}
                    onChange={handleChange}
                    required
                    placeholder="123456"
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Adresse complète *</Form.Label>
              <Form.Control
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                placeholder="123 Rue de la Loire, 44000 Nantes"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Description de la propriété..."
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
                    onChange={handleChange}
                    placeholder="47.2184"
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
                    onChange={handleChange}
                    placeholder="-1.5536"
                  />
                </Form.Group>
              </Col>
            </Row>

            <Alert variant="info" className="mb-0">
              <small>
                <strong>Coordonnées GPS :</strong> Vous pouvez obtenir les coordonnées sur{' '}
                <a href="https://www.google.com/maps" target="_blank" rel="noopener noreferrer">
                  Google Maps
                </a>{' '}
                en cliquant droit sur l'emplacement.
              </small>
            </Alert>
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