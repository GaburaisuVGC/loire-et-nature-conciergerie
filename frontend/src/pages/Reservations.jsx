import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Badge, Alert, Form, InputGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import PropertyDetailModal from '../components/PropertyDetailModal';
import { mockProperties } from '../data/mockData';
import 'leaflet/dist/leaflet.css';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
});

const customIcon = new L.Icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

export default function Reservations() {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [priceFilter, setPriceFilter] = useState({ min: '', max: '' });
  const [guestFilter, setGuestFilter] = useState('');

  const mapCenter = [47.2869, -2.3890]; 
  const mapZoom = 12;

  useEffect(() => {
    loadProperties();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [properties, searchTerm, priceFilter, guestFilter]);

  const loadProperties = async () => {
    try {
      setLoading(true);
      setTimeout(() => {
        setProperties(mockProperties);
        setLoading(false);
      }, 1000);
    } catch (err) {
      setError('Erreur lors du chargement des propriétés');
      console.error(err);
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = properties;

    if (searchTerm) {
      filtered = filtered.filter(property =>
        property.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.address.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (priceFilter.min) {
      filtered = filtered.filter(property => 
        property.pricing.basePrice >= parseFloat(priceFilter.min)
      );
    }
    if (priceFilter.max) {
      filtered = filtered.filter(property => 
        property.pricing.basePrice <= parseFloat(priceFilter.max)
      );
    }

    if (guestFilter) {
      filtered = filtered.filter(property => 
        property.features.maxGuests >= parseInt(guestFilter)
      );
    }

    setFilteredProperties(filtered);
  };

  const handleViewDetails = (property) => {
    setSelectedProperty(property);
    setShowDetailModal(true);
  };

  const getValidCoordinatesProperties = () => {
    return filteredProperties.filter(property => 
      property.coordinates && 
      property.coordinates.lat && 
      property.coordinates.lng &&
      !isNaN(property.coordinates.lat) &&
      !isNaN(property.coordinates.lng)
    );
  };

  const clearFilters = () => {
    setSearchTerm('');
    setPriceFilter({ min: '', max: '' });
    setGuestFilter('');
  };

  return (
    <div>
      <Container className="py-5">
        <Row className="mb-5">
          <Col lg={8} className="mx-auto text-center">
            <h1 className="text-primary-custom mb-3">Nos Hébergements</h1>
            <p className="lead text-muted">
              Découvrez notre sélection de logements soigneusement entretenus dans la région de La Baule. 
              Chaque propriété bénéficie de notre service de conciergerie premium.
            </p>
          </Col>
        </Row>

        <Row className="mb-4">
          <Col>
            <Card>
              <Card.Body>
                <h5 className="text-primary-custom mb-3">Filtrer les résultats</h5>
                <Row>
                  <Col md={4}>
                    <Form.Group className="mb-3">
                      <Form.Label>Rechercher</Form.Label>
                      <InputGroup>
                        <Form.Control
                          type="text"
                          placeholder="Nom, description, localisation..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                        />
                        <InputGroup.Text>
                          <i className="bi bi-search"></i>
                        </InputGroup.Text>
                      </InputGroup>
                    </Form.Group>
                  </Col>
                  <Col md={3}>
                    <Form.Group className="mb-3">
                      <Form.Label>Prix minimum</Form.Label>
                      <InputGroup>
                        <Form.Control
                          type="number"
                          placeholder="0"
                          value={priceFilter.min}
                          onChange={(e) => setPriceFilter(prev => ({ ...prev, min: e.target.value }))}
                        />
                        <InputGroup.Text>€</InputGroup.Text>
                      </InputGroup>
                    </Form.Group>
                  </Col>
                  <Col md={3}>
                    <Form.Group className="mb-3">
                      <Form.Label>Prix maximum</Form.Label>
                      <InputGroup>
                        <Form.Control
                          type="number"
                          placeholder="500"
                          value={priceFilter.max}
                          onChange={(e) => setPriceFilter(prev => ({ ...prev, max: e.target.value }))}
                        />
                        <InputGroup.Text>€</InputGroup.Text>
                      </InputGroup>
                    </Form.Group>
                  </Col>
                  <Col md={2}>
                    <Form.Group className="mb-3">
                      <Form.Label>Invités min.</Form.Label>
                      <Form.Select
                        value={guestFilter}
                        onChange={(e) => setGuestFilter(e.target.value)}
                      >
                        <option value="">Tous</option>
                        <option value="1">1+</option>
                        <option value="2">2+</option>
                        <option value="4">4+</option>
                        <option value="6">6+</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>
                <div className="d-flex justify-content-between align-items-center">
                  <span className="text-muted">
                    {filteredProperties.length} propriété(s) trouvée(s)
                  </span>
                  <Button variant="outline-secondary" size="sm" onClick={clearFilters}>
                    <i className="bi bi-arrow-clockwise me-1"></i>
                    Effacer les filtres
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {error && (
          <Alert variant="danger" className="mb-4">
            <i className="bi bi-exclamation-triangle me-2"></i>
            {error}
          </Alert>
        )}

        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Chargement...</span>
            </div>
            <p className="mt-3">Chargement des propriétés...</p>
          </div>
        ) : (
          <>
            <Row className="mb-5">
              <Col>
                <Card>
                  <Card.Header>
                    <h3 className="mb-0">
                      <i className="bi bi-geo-alt me-2"></i>
                      Localisation de nos propriétés
                    </h3>
                  </Card.Header>
                  <Card.Body className="p-0">
                    <div style={{ height: '400px', width: '100%' }}>
                      <MapContainer
                        center={mapCenter}
                        zoom={mapZoom}
                        style={{ height: '100%', width: '100%' }}
                      >
                        <TileLayer
                          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        />
                        {getValidCoordinatesProperties().map((property) => (
                          <Marker
                            key={property.id}
                            position={[property.coordinates.lat, property.coordinates.lng]}
                            icon={customIcon}
                          >
                            <Popup>
                              <div style={{ minWidth: '200px' }}>
                                <h6 className="mb-2">{property.name}</h6>
                                <p className="mb-2 small text-muted">{property.address}</p>
                                <div className="mb-2">
                                  <Badge bg="primary">{property.pricing.basePrice}€/nuit</Badge>
                                  <Badge bg="secondary" className="ms-1">
                                    {property.features.maxGuests} pers.
                                  </Badge>
                                </div>
                                <Button
                                  size="sm"
                                  className="btn-primary w-100"
                                  onClick={() => handleViewDetails(property)}
                                >
                                  Voir les détails
                                </Button>
                              </div>
                            </Popup>
                          </Marker>
                        ))}
                      </MapContainer>
                    </div>
                    {getValidCoordinatesProperties().length === 0 && (
                      <div className="text-center py-4">
                        <p className="text-muted">
                          Aucune propriété avec coordonnées disponible pour l'affichage sur la carte.
                        </p>
                      </div>
                    )}
                  </Card.Body>
                </Card>
              </Col>
            </Row>

            <Row>
              {filteredProperties.length === 0 ? (
                <Col>
                  <Alert variant="info" className="text-center">
                    <h5>Aucune propriété trouvée</h5>
                    <p className="mb-3">
                      Aucun hébergement ne correspond à vos critères de recherche.
                    </p>
                    <Button variant="outline-primary" onClick={clearFilters}>
                      Voir toutes les propriétés
                    </Button>
                  </Alert>
                </Col>
              ) : (
                filteredProperties.map((property) => (
                  <Col lg={6} xl={4} key={property.id} className="mb-4">
                    <Card className="h-100 property-card shadow-sm">
                      <div 
                        className="card-img-top"
                        style={{
                          height: '250px',
                          backgroundImage: property.images?.[0]?.url 
                            ? `url(${property.images[0].url})` 
                            : 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
                          backgroundSize: 'cover',
                          backgroundPosition: 'center',
                          position: 'relative'
                        }}
                      >
                        <div className="position-absolute top-0 end-0 m-3">
                          <Badge bg="dark" className="fs-6">
                            {property.pricing.basePrice}€ / nuit
                          </Badge>
                        </div>
                        
                        {property.images && property.images.length > 1 && (
                          <div className="position-absolute bottom-0 end-0 m-3">
                            <Badge bg="secondary">
                              <i className="bi bi-images me-1"></i>
                              {property.images.length}
                            </Badge>
                          </div>
                        )}
                        
                        {(!property.images || property.images.length === 0) && (
                          <div className="d-flex align-items-center justify-content-center h-100">
                            <div className="text-center text-muted">
                              <i className="bi bi-image" style={{ fontSize: '3rem' }}></i>
                              <p className="mt-2 mb-0">Photo à venir</p>
                            </div>
                          </div>
                        )}
                      </div>

                      <Card.Body className="d-flex flex-column">
                        <div className="mb-3">
                          <h5 className="text-primary-custom mb-1">{property.name}</h5>
                          {property.subtitle && (
                            <p className="text-muted small mb-2">{property.subtitle}</p>
                          )}
                          <p className="text-muted small mb-0">
                            <i className="bi bi-geo-alt me-1"></i>
                            {property.address}
                          </p>
                        </div>

                        <p className="card-text flex-grow-1">
                          {property.description.length > 120 
                            ? `${property.description.substring(0, 120)}...` 
                            : property.description
                          }
                        </p>

                        <div className="mb-3">
                          <Row className="small text-muted">
                            <Col>
                              <i className="bi bi-people me-1"></i>
                              {property.features.maxGuests} pers.
                            </Col>
                            <Col>
                              <i className="bi bi-rulers me-1"></i>
                              {property.features.surface}
                            </Col>
                            <Col>
                              <i className="bi bi-bed me-1"></i>
                              {property.features.bedConfiguration.includes('double') ? 'Lit double' : 'Lits'}
                            </Col>
                          </Row>
                        </div>

                        <div className="mb-3">
                          {property.suitableFor && property.suitableFor.map((type, index) => (
                            <Badge key={index} bg="light" text="dark" className="me-1 mb-1">
                              {type}
                            </Badge>
                          ))}
                          
                          {property.availability === 'available' && (
                            <Badge bg="success" className="ms-2">
                              <i className="bi bi-check-circle me-1"></i>
                              Disponible
                            </Badge>
                          )}
                        </div>

                        <div className="mt-auto">
                          <div className="d-grid gap-2">
                            <Button
                              className="btn-primary"
                              onClick={() => handleViewDetails(property)}
                            >
                              <i className="bi bi-eye me-2"></i>
                              Voir les détails
                            </Button>
                            
                            <div className="d-flex gap-2">
                              <Button
                                as={Link}
                                to="/contact"
                                variant="outline-primary"
                                size="sm"
                                className="flex-fill"
                              >
                                <i className="bi bi-envelope me-1"></i>
                                Contact
                              </Button>
                              <Button
                                variant="outline-secondary"
                                size="sm"
                                href="tel:+33200000000"
                              >
                                <i className="bi bi-telephone"></i>
                              </Button>
                            </div>
                          </div>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                ))
              )}
            </Row>

            <Row className="mt-5">
              <Col lg={8} className="mx-auto">
                <Card className="bg-rose-custom border-0">
                  <Card.Body className="text-center p-5">
                    <h3 className="text-primary-custom mb-3">
                      <i className="bi bi-house-heart me-2"></i>
                      Service Premium Garanti
                    </h3>
                    <p className="lead mb-4">
                      Tous nos hébergements bénéficient de notre service de conciergerie complet : 
                      ménage professionnel, maintenance, accueil personnalisé et assistance 24h/7j.
                    </p>
                    <div className="d-flex flex-wrap justify-content-center gap-3">
                      <Button as={Link} to="/services" className="btn-primary">
                        <i className="bi bi-list-check me-2"></i>
                        Découvrir nos services
                      </Button>
                      <Button as={Link} to="/contact" variant="outline-primary">
                        <i className="bi bi-calendar-plus me-2"></i>
                        Planifier une visite
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </>
        )}
      </Container>

      <PropertyDetailModal
        show={showDetailModal}
        onHide={() => setShowDetailModal(false)}
        property={selectedProperty}
      />
    </div>
  );
}