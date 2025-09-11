import React, { useState, useEffect } from 'react';
import { Modal, Container, Row, Col, Badge, Button, Card, Carousel, Alert, Tabs, Tab } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AvailabilityCalendar from './AvailabilityCalendar';
import propertyService from '../services/propertyService';

export default function PropertyDetailModal({ show, onHide, property }) {
  const [availability, setAvailability] = useState(null);
  const [loadingAvailability, setLoadingAvailability] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    if (show && property) {
      loadAvailability();
    }
  }, [show, property]);

  const loadAvailability = async () => {
    if (!property) return;
    
    setLoadingAvailability(true);
    try {
      const start = new Date().toISOString().split('T')[0];
      const end = new Date(Date.now() + 120 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
      
      const data = await propertyService.getPropertyAvailability(property.id, start, end);
      setAvailability(data.availability);
    } catch (error) {
      console.error('Erreur lors du chargement des disponibilités:', error);
    } finally {
      setLoadingAvailability(false);
    }
  };

  const handleDateSelect = (dates) => {
    console.log('Dates sélectionnées:', dates);
  };

  const handleImageSelect = (index) => {
    setCurrentImageIndex(index);
  };

  if (!property) return null;

  return (
    <Modal 
      show={show} 
      onHide={onHide} 
      size="xl" 
      fullscreen="lg-down"
      scrollable
    >
      <Modal.Header closeButton className="border-bottom">
        <Modal.Title className="text-primary-custom">
          {property.fullName || property.name}
        </Modal.Title>
      </Modal.Header>
      
      <Modal.Body className="p-0">
        <Container fluid className="py-4">
          <Row>
            <Col lg={8}>
              {property.images && property.images.length > 0 ? (
                <div className="mb-4">
                  <Carousel 
                    activeIndex={currentImageIndex} 
                    onSelect={setCurrentImageIndex}
                    className="property-carousel"
                  >
                    {property.images.map((image, index) => (
                      <Carousel.Item key={index}>
                        <div 
                          className="carousel-image"
                          style={{
                            height: '400px',
                            backgroundImage: `url(${image.url})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backgroundColor: '#f8f9fa'
                          }}
                        >
                          <div className="d-flex align-items-center justify-content-center h-100">
                            <div className="text-center text-muted">
                              <i className="bi bi-image" style={{ fontSize: '3rem' }}></i>
                              <p className="mt-2">Image {index + 1}: {image.alt}</p>
                            </div>
                          </div>
                        </div>
                      </Carousel.Item>
                    ))}
                  </Carousel>
                  
                  <div className="d-flex mt-3 gap-2 overflow-auto">
                    {property.images.map((image, index) => (
                      <div
                        key={index}
                        className={`thumbnail ${index === currentImageIndex ? 'active' : ''}`}
                        style={{
                          width: '80px',
                          height: '60px',
                          backgroundColor: '#f8f9fa',
                          border: index === currentImageIndex ? '2px solid var(--color-vert-nature)' : '1px solid #dee2e6',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0
                        }}
                        onClick={() => handleImageSelect(index)}
                      >
                        <small className="text-muted">Img {index + 1}</small>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="mb-4 text-center py-5 bg-light rounded">
                  <i className="bi bi-image text-muted" style={{ fontSize: '3rem' }}></i>
                  <p className="mt-2 text-muted">Aucune image disponible</p>
                </div>
              )}

              <Card className="mb-4">
                <Card.Body>
                  <h4 className="text-primary-custom mb-3">Description</h4>
                  <div style={{ whiteSpace: 'pre-line' }}>
                    {property.description}
                  </div>
                  
                  {property.suitableFor && property.suitableFor.length > 0 && (
                    <div className="mt-3">
                      <h6>Adapté pour :</h6>
                      <div>
                        {property.suitableFor.map((type, index) => (
                          <Badge key={index} bg="secondary" className="me-2">
                            {type}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </Card.Body>
              </Card>

              <Tabs defaultActiveKey="features" className="mb-4">
                <Tab eventKey="features" title="Caractéristiques">
                  <Card>
                    <Card.Body>
                      {property.features && (
                        <Row>
                          <Col md={6}>
                            <h6 className="text-primary-custom">Informations générales</h6>
                            <ul className="list-unstyled">
                              <li><strong>Surface :</strong> {property.features.surface}</li>
                              <li><strong>Capacité :</strong> {property.features.maxGuests} personnes</li>
                              <li><strong>Couchage :</strong> {property.features.bedConfiguration}</li>
                            </ul>
                          </Col>
                          <Col md={6}>
                            <h6 className="text-primary-custom">Commodités</h6>
                            {property.features.amenities && (
                              <ul className="list-unstyled">
                                {property.features.amenities.map((amenity, index) => (
                                  <li key={index}>
                                    <i className="bi bi-check-circle-fill text-success me-2"></i>
                                    {amenity}
                                  </li>
                                ))}
                              </ul>
                            )}
                          </Col>
                        </Row>
                      )}
                    </Card.Body>
                  </Card>
                </Tab>

                <Tab eventKey="equipment" title="Équipements">
                  <Card>
                    <Card.Body>
                      {property.equipment && (
                        <Row>
                          {Object.entries(property.equipment).map(([category, items], index) => (
                            <Col md={6} lg={4} key={index} className="mb-3">
                              <h6 className="text-primary-custom">{category}</h6>
                              <ul className="list-unstyled small">
                                {items.map((item, itemIndex) => (
                                  <li key={itemIndex}>
                                    <i className="bi bi-check text-success me-1"></i>
                                    {item}
                                  </li>
                                ))}
                              </ul>
                            </Col>
                          ))}
                        </Row>
                      )}
                    </Card.Body>
                  </Card>
                </Tab>

                <Tab eventKey="access" title="Accès">
                  <Card>
                    <Card.Body>
                      <h6 className="text-primary-custom mb-3">Distances et accès</h6>
                      {property.access && (
                        <Row>
                          <Col md={6}>
                            <ul className="list-unstyled">
                              {Object.entries(property.access).map(([key, value], index) => (
                                <li key={index} className="mb-2">
                                  <strong>{key.replace(/([A-Z])/g, ' $1').toLowerCase()} :</strong> {value}
                                </li>
                              ))}
                            </ul>
                          </Col>
                          <Col md={6}>
                            <div className="text-muted small">
                              <p>
                                <i className="bi bi-info-circle me-2"></i>
                                Toutes les distances sont approximatives et peuvent varier selon le mode de transport.
                              </p>
                            </div>
                          </Col>
                        </Row>
                      )}
                    </Card.Body>
                  </Card>
                </Tab>
              </Tabs>
            </Col>

            <Col lg={4}>
              <div className="sticky-top" style={{ top: '20px' }}>
                <Card className="mb-3">
                  <Card.Body>
                    <div className="text-center">
                      <div className="h4 text-primary-custom mb-1">
                        {property.pricing?.basePrice}€
                        <small className="text-muted"> / nuit</small>
                      </div>
                      <p className="text-muted small mb-0">
                        Prix de base - varie selon la période
                      </p>
                    </div>
                    
                    <hr />
                    
                    <div className="small">
                      <div className="d-flex justify-content-between mb-2">
                        <span>Localisation :</span>
                        <span className="text-end">{property.address}</span>
                      </div>
                      {property.features && (
                        <>
                          <div className="d-flex justify-content-between mb-2">
                            <span>Capacité :</span>
                            <span>{property.features.maxGuests} personnes</span>
                          </div>
                          <div className="d-flex justify-content-between mb-2">
                            <span>Surface :</span>
                            <span>{property.features.surface}</span>
                          </div>
                        </>
                      )}
                    </div>
                  </Card.Body>
                </Card>

                <div className="mb-3">
                  <h5 className="text-primary-custom mb-3">Disponibilités</h5>
                  <AvailabilityCalendar
                    propertyId={property.id}
                    availability={availability}
                    loading={loadingAvailability}
                    onDateSelect={handleDateSelect}
                    onMonthChange={loadAvailability}
                  />
                </div>

                <div className="d-grid gap-2">
                  <Button 
                    as={Link} 
                    to="/contact" 
                    className="btn-primary"
                    size="lg"
                  >
                    <i className="bi bi-envelope me-2"></i>
                    Demander une réservation
                  </Button>
                  
                  <Button 
                    variant="outline-primary" 
                    href={`tel:+33200000000`}
                  >
                    <i className="bi bi-telephone me-2"></i>
                    Appeler directement
                  </Button>
                </div>

                <Alert variant="info" className="mt-3 small">
                  <h6 className="alert-heading">
                    <i className="bi bi-info-circle me-2"></i>
                    Réservation
                  </h6>
                  <p className="mb-2">
                    Les réservations se font directement par téléphone ou email.
                  </p>
                  <ul className="mb-0">
                    <li>Réponse sous 24h</li>
                    <li>Confirmation immédiate</li>
                    <li>Paiement sécurisé</li>
                  </ul>
                </Alert>
              </div>
            </Col>
          </Row>
        </Container>
      </Modal.Body>
    </Modal>
  );
}