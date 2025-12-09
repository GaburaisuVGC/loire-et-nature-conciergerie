import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Badge,
  Alert,
  Form,
  InputGroup,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import PropertyDetailModal from "../components/PropertyDetailModal";
import axios from "axios";
import "leaflet/dist/leaflet.css";
import propertyService from "../services/propertyService";
import keyService from "../services/keyService";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

const customIcon = new L.Icon({
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

export default function Reservations() {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [dateArrivee, setDateArrivee] = useState("");
  const [dateDepart, setDateDepart] = useState("");
  const [nuits, setNuits] = useState(1);
  const [adultes, setAdultes] = useState(1);
  const [enfants, setEnfants] = useState(0);

  const mapCenter = [47.916672, 1.9];
  const mapZoom = 10;

  // Fetch all registered properties, then fetch propKey and property content for each
  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await propertyService.getProperties();
        const propertyDetails = await Promise.all(
          res.map(async (item) => {
            let propKey = null;
            let content = null;
            try {
              // Try to get the propKey for this property
              const keyRes = await keyService.getPropKey(item.propId);
              propKey = keyRes?.propKey;
            } catch {
              // No propKey or error, skip content fetch
            }
            if (propKey) {
              try {
                const contentRes = await propertyService.getPropertyContent(
                  propKey
                );
                content = contentRes?.getPropertyContent?.[0] || null;
              } catch {
                // Error fetching content, leave as null
              }
            }
            // Compose a property object for display (prefer content if available)
            return {
              id: item.propId,
              propKey,
              name: content?.name || item.name,
              address: content?.city || item.city || "",
              description:
                content?.texts?.propertyDescriptionText?.FR ||
                content?.texts?.propertyDescription1?.FR ||
                "",
              images: content
                ? Object.values(content.images?.external || {})
                    .filter((img) => img.url)
                    .map((img) => ({ url: img.url }))
                : [],
              coordinates:
                content?.latitude && content?.longitude
                  ? {
                      lat: parseFloat(content.latitude),
                      lng: parseFloat(content.longitude),
                    }
                  : item.latitude && item.longitude
                  ? {
                      lat: parseFloat(item.latitude),
                      lng: parseFloat(item.longitude),
                    }
                  : undefined,
              features: {
                maxGuests: Array.isArray(item.roomTypes)
                  ? item.roomTypes.reduce((sum, room) => {
                      const n = parseInt(room.maxPeople, 10);
                      return sum + (isNaN(n) ? 0 : n);
                    }, 0)
                  : 0,
                surface: "",
                bedConfiguration: "",
              },
              pricing: {
                basePrice: content?.roomIds
                  ? Object.values(content.roomIds)[0]?.rackRate || ""
                  : "",
              },
              content, // keep full content for modal/details
            };
          })
        );
        setProperties(propertyDetails);
      } catch (err) {
        setError("Erreur lors du chargement des propriétés");
        setProperties([]);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchProperties();
  }, []);

  useEffect(() => {
    setFilteredProperties(properties);
  }, [properties]);

  useEffect(() => {
    if (dateArrivee && dateDepart) {
      const arrivee = new Date(dateArrivee);
      const depart = new Date(dateDepart);
      const diffTime = Math.abs(depart - arrivee);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      if (diffDays > 0 && diffDays <= 365) {
        setNuits(diffDays);
      }
    }
  }, [dateArrivee, dateDepart]);

  const handleSearch = async () => {
    setLoading(true);
    setError("");
    try {
      const formatDate = (dateStr) => {
        if (!dateStr) return "";
        return dateStr.replace(/-/g, "");
      };
      const checkIn = formatDate(dateArrivee);
      const checkOut = formatDate(dateDepart);
      const availablePropIds = [];
      for (const property of properties) {
        try {
          const res = await axios.get("/api/public/availability", {
            params: {
              propId: property.id,
              checkIn,
              checkOut,
              numAdult: adultes,
              numChild: enfants,
            },
          });
          const availRes = res.data;
          const roomKeys = Object.keys(availRes).filter(
            (k) => !isNaN(Number(k))
          );
          const hasAvailableRoom = roomKeys.some((roomId) => {
            const room = availRes[roomId];
            return room && room.roomsavail > 0;
          });
          if (hasAvailableRoom) {
            availablePropIds.push(property.id);
          }
        } catch {
          // Ignore errors for individual properties
        }
      }
      const filtered = properties.filter((p) =>
        availablePropIds.includes(p.id)
      );
      setFilteredProperties(filtered);
    } catch (err) {
      setError("Erreur lors de la recherche de disponibilités");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetails = (property) => {
    setSelectedProperty(property);
    setShowDetailModal(true);
  };

  const getValidCoordinatesProperties = () => {
    return filteredProperties.filter(
      (property) =>
        property.coordinates &&
        property.coordinates.lat &&
        property.coordinates.lng &&
        !isNaN(property.coordinates.lat) &&
        !isNaN(property.coordinates.lng)
    );
  };

  if (error) {
    return (
      <Container className="py-5">
        <Alert variant="danger" className="text-center">
          <h5>Erreur</h5>
          <p>{error}</p>
          <Button
            variant="outline-danger"
            onClick={() => window.location.reload()}
          >
            Réessayer
          </Button>
        </Alert>
      </Container>
    );
  }

  return (
    <div>
      {/* Hero Section */}
      <section
        className="hero-section"
        style={{
          backgroundImage: `url('/hero-image-reservations.jpg')`,
          backgroundColor: "#D8CBB5",
          backgroundSize: "fill",
        }}
      >
        <div className="hero-overlay"></div>
        <Container>
          <div className="hero-content">
            <h1
              className="font-garamond text-vert hero-title"
              style={{ fontStyle: "italic" }}
            >
              Les Logements avec Loire et Nature Conciergerie
            </h1>
          </div>
        </Container>
      </section>

      <Container className="py-5">
        {/* Nos logements */}
        <section className="py-5">
          <div className="section-title">
            <h2>Nos logements</h2>
          </div>

          <Row className="justify-content-center">
            <Col lg={10}>
              <div className="engagement-content text-center">
                <p
                  className="mb-4"
                  style={{ fontSize: "1.1rem", lineHeight: "1.8" }}
                >
                  <strong>Loire et Nature</strong>, c'est un projet de cœur, né
                  d'une volonté d'associer gestion locative et faire découvrir
                  aux voyageurs des produits de fabrication artisanale de la
                  région.
                </p>

                <p
                  className="mb-4"
                  style={{ fontSize: "1.1rem", lineHeight: "1.8" }}
                >
                  Nous proposons un service clés en main aux propriétaires afin
                  de faciliter et optimiser la gestion locative des logements en
                  location de courte durée type Airbnb, booking...
                </p>

                <p
                  className="mb-4"
                  style={{ fontSize: "1.1rem", lineHeight: "1.8" }}
                >
                  Nous intervenons sur l'agglomération Orléanaise et des
                  communes environnantes (Mardié, Checy, Combleux, La Chapelle
                  Saint Mesmin et autres)
                </p>

                <div className="text-center mt-4">
                  <Link to="/contact" className="btn-custom-vert">
                    Prendre rendez-vous
                  </Link>
                </div>
              </div>
            </Col>
          </Row>
        </section>

        {/* Carte */}
        {loading ? (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Chargement...</span>
            </div>
            <p className="mt-3">Chargement des propriétés...</p>
          </div>
        ) : (
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
                  <div style={{ height: "400px", width: "100%" }}>
                    <MapContainer
                      center={mapCenter}
                      zoom={mapZoom}
                      style={{ height: "100%", width: "100%" }}
                    >
                      <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                      />
                      {getValidCoordinatesProperties().map((property) => (
                        <Marker
                          key={property.id}
                          position={[
                            property.coordinates.lat,
                            property.coordinates.lng,
                          ]}
                          icon={customIcon}
                        >
                          <Popup>
                            <div style={{ minWidth: "200px" }}>
                              <h6 className="mb-2">{property.name}</h6>
                              <p className="mb-2 small text-muted">
                                {property.address}
                              </p>
                              <div className="mb-2">
                                <Badge bg="primary">
                                  {property.pricing.basePrice}€/nuit
                                </Badge>
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
                        Aucune propriété avec coordonnées disponible pour
                        l'affichage sur la carte.
                      </p>
                    </div>
                  )}
                </Card.Body>
              </Card>
            </Col>
          </Row>
        )}

        {/* Filtres de réservation */}
        <Row className="mb-4">
          <Col>
            <Card>
              <Card.Body>
                <h5 className="text-vert mb-3">Rechercher votre séjour</h5>
                <Row>
                  <Col md={2}>
                    <Form.Group className="mb-3">
                      <Form.Label>Arrivée</Form.Label>
                      <Form.Control
                        type="date"
                        value={dateArrivee}
                        onChange={(e) => setDateArrivee(e.target.value)}
                        min={new Date().toISOString().split("T")[0]}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={2}>
                    <Form.Group className="mb-3">
                      <Form.Label>Départ</Form.Label>
                      <Form.Control
                        type="date"
                        value={dateDepart}
                        onChange={(e) => setDateDepart(e.target.value)}
                        min={
                          dateArrivee || new Date().toISOString().split("T")[0]
                        }
                      />
                    </Form.Group>
                  </Col>
                  <Col md={2}>
                    <Form.Group className="mb-3">
                      <Form.Label>Nuits</Form.Label>
                      <Form.Control
                        type="number"
                        min="1"
                        max="365"
                        value={nuits}
                        onChange={(e) =>
                          setNuits(parseInt(e.target.value) || 1)
                        }
                      />
                    </Form.Group>
                  </Col>
                  <Col md={2}>
                    <Form.Group className="mb-3">
                      <Form.Label>Adultes</Form.Label>
                      <Form.Control
                        type="number"
                        min="1"
                        max="99"
                        value={adultes}
                        onChange={(e) =>
                          setAdultes(parseInt(e.target.value) || 1)
                        }
                      />
                    </Form.Group>
                  </Col>
                  <Col md={2}>
                    <Form.Group className="mb-3">
                      <Form.Label>Enfants</Form.Label>
                      <Form.Control
                        type="number"
                        min="0"
                        max="99"
                        value={enfants}
                        onChange={(e) =>
                          setEnfants(parseInt(e.target.value) || 0)
                        }
                      />
                    </Form.Group>
                  </Col>
                  <Col md={2}>
                    <Form.Group className="mb-3">
                      <Form.Label>&nbsp;</Form.Label>
                      <Button
                        variant="primary"
                        className="d-block w-100 font-garamond text-vert bg-blanc border-2"
                        style={{
                          borderColor: "var(--vert-loire)",
                          color: "var(--vert-loire)",
                          backgroundColor: "var(--blanc)",
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.backgroundColor = "var(--vert-loire)";
                          e.target.style.color = "var(--blanc)";
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.backgroundColor = "var(--blanc)";
                          e.target.style.color = "var(--vert-loire)";
                        }}
                        onClick={handleSearch}
                        disabled={!dateArrivee || !dateDepart}
                      >
                        Chercher
                      </Button>
                    </Form.Group>
                  </Col>
                </Row>

                {adultes + enfants > 0 && (
                  <Row>
                    <Col>
                      <div className="mt-2">
                        <small className="text-muted">
                          Recherche pour {adultes + enfants} personne
                          {adultes + enfants > 1 ? "s" : ""}
                          {dateArrivee &&
                            dateDepart &&
                            ` • ${nuits} nuit${nuits > 1 ? "s" : ""}`}
                        </small>
                      </div>
                    </Col>
                  </Row>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Liste des logements */}
        <Row>
          {filteredProperties.length === 0 ? (
            <Col>
              <Alert variant="info" className="text-center">
                <h5>Aucune propriété trouvée</h5>
                <p className="mb-3">
                  Aucun hébergement ne correspond à vos critères de recherche.
                </p>
              </Alert>
            </Col>
          ) : (
            filteredProperties.map((property) => (
              <Col lg={6} xl={4} key={property.id} className="mb-4">
                <Card className="h-100 property-card shadow-sm">
                  <div
                    className="card-img-top"
                    style={{
                      height: "250px",
                      backgroundImage: property.images?.[0]?.url
                        ? `url('${property.images[0].url}')`
                        : 'url("/images/placeholder-property.jpg")',
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      borderRadius: "0.375rem 0.375rem 0 0",
                    }}
                  >
                    <div className="position-absolute top-0 end-0 m-2">
                      <Badge bg="primary" className="fs-6">
                        {property.pricing.basePrice}€/nuit
                      </Badge>
                    </div>
                  </div>

                  <Card.Body className="d-flex flex-column">
                    <div className="mb-2">
                      <h5 className="text-vert mb-1">{property.name}</h5>
                      {property.subtitle && (
                        <p className="small text-muted mb-0">
                          {property.subtitle}
                        </p>
                      )}
                    </div>

                    <p className="text-muted small mb-2">
                      <i className="bi bi-geo-alt me-1"></i>
                      {property.address}
                    </p>

                    <p className="mb-3 flex-grow-1">
                      {property.description.length > 100
                        ? `${property.description.substring(0, 100)}...`
                        : property.description}
                    </p>

                    <div className="mb-3">
                      <div className="d-flex justify-content-between text-sm">
                        <span>
                          <i className="bi bi-people me-1"></i>
                          {property.features.maxGuests} pers.
                        </span>
                        <span>
                          <i className="bi bi-house me-1"></i>
                          {property.features.surface}
                        </span>
                      </div>
                      <div className="mt-1">
                        <small className="text-muted">
                          {property.features.bedConfiguration}
                        </small>
                      </div>
                    </div>

                    <div className="mt-auto">
                      <Button
                        variant="outline-primary"
                        className="w-100"
                        onClick={() => handleViewDetails(property)}
                      >
                        Voir les détails
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))
          )}
        </Row>
      </Container>

      {/* Modal de détail */}
      {selectedProperty && (
        <PropertyDetailModal
          show={showDetailModal}
          onHide={() => {
            setShowDetailModal(false);
            setSelectedProperty(null);
          }}
          property={selectedProperty}
          propertyContent={selectedProperty?.content}
        />
      )}
    </div>
  );
}
