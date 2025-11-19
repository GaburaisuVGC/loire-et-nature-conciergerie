import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Table,
  Modal,
  Form,
  Alert,
  Badge,
  Tabs,
  Tab,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import authService from "../services/authService";
import propertyService from "../services/propertyService";
import testimonialService from "../services/testimonialService";
import keyService from "../services/keyService";

export default function Admin() {
  const [properties, setProperties] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [activeTab, setActiveTab] = useState("properties");
  const navigate = useNavigate();

  useEffect(() => {
    if (!authService.isAuthenticated() || !authService.isAdmin()) {
      navigate("/login");
      return;
    }

    loadData();
  }, [navigate]);

  const loadData = async () => {
    try {
      setLoading(true);
      await Promise.all([loadProperties(), loadTestimonials()]);
    } catch (err) {
      setError("Erreur lors du chargement des données");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const loadProperties = async () => {
    try {
      const data = await propertyService.getProperties();

      // fetch propKey for each property
      const propertiesWithKeys = await Promise.all(
        data.map(async (p) => {
          try {
            const res = await keyService.getPropKey(p.propId);
            return { ...p, propKey: res?.propKey || "" };
          } catch {
            return { ...p, propKey: "" };
          }
        })
      );

      setProperties(propertiesWithKeys);
    } catch (err) {
      console.error("Error loading properties:", err);
    }
  };

  const loadTestimonials = async () => {
    try {
      const data = await testimonialService.getAllTestimonials();
      setTestimonials(data);
    } catch (err) {
      console.error("Error loading testimonials:", err);
    }
  };

  const handleLogout = () => {
    authService.logout();
    navigate("/login");
  };

  const renderStars = (rating) => {
    return (
      <div className="d-flex" style={{ gap: "3px" }}>
        {[1, 2, 3, 4, 5].map((star) => (
          <i
            key={star}
            className={`bi bi-star${rating >= star ? "-fill" : ""}`}
            style={{
              fontSize: "1rem",
              color: "var(--beige-terre)",
            }}
          />
        ))}
      </div>
    );
  };

  const formatDate = (date) => {
    if (!date) return "N/A";
    let d;
    if (date && typeof date.toDate === "function") {
      d = date.toDate();
    } else if (date && date._seconds) {
      d = new Date(date._seconds * 1000);
    } else {
      d = new Date(date);
    }
    if (isNaN(d.getTime())) return "N/A";
    return d.toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
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
            <h1
              className="text-vert font-garamond"
              style={{ fontWeight: "bold" }}
            >
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
        <Alert variant="danger" onClose={() => setError("")} dismissible>
          {error}
        </Alert>
      )}

      {successMessage && (
        <Alert
          variant="success"
          onClose={() => setSuccessMessage("")}
          dismissible
        >
          {successMessage}
        </Alert>
      )}

      <Tabs
        activeKey={activeTab}
        onSelect={(k) => setActiveTab(k)}
        className="mb-4"
      >
        {/* Onglet propriétés */}
        <Tab eventKey="properties" title={`Propriétés (${properties.length})`}>
          <Card>
            <Card.Header className="d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Propriétés Beds24</h5>
            </Card.Header>
            <Card.Body>
              {properties.length === 0 ? (
                <div className="text-center py-4">
                  <p className="text-muted">
                    Aucune propriété trouvée sur Beds24
                  </p>
                </div>
              ) : (
                <div className="table-responsive">
                  <Table striped hover>
                    <thead>
                      <tr>
                        <th>Nom</th>
                        <th>Adresse</th>
                        <th>Ville</th>
                        <th>Pays</th>
                        <th>ID Beds24</th>
                        <th>Coordonnées</th>
                        <th>Chambres</th>
                        <th>PropKey</th>
                      </tr>
                    </thead>
                    <tbody>
                      {properties.map((property) => (
                        <tr key={property.propId}>
                          <td>
                            <strong>{property.name}</strong>
                          </td>
                          <td>{property.address}</td>
                          <td>{property.city}</td>
                          <td>{property.country}</td>
                          <td>
                            <Badge bg="info">{property.propId}</Badge>
                          </td>
                          <td>
                            {property.latitude && property.longitude ? (
                              <small>
                                {property.latitude}, {property.longitude}
                              </small>
                            ) : (
                              <span className="text-muted">Non défini</span>
                            )}
                          </td>
                          <td>
                            {property.roomTypes &&
                            property.roomTypes.length > 0 ? (
                              <ul className="mb-0 small">
                                {property.roomTypes.map((room) => (
                                  <li key={room.roomId}>
                                    {room.name} — {room.qty} chambre(s) —{" "}
                                    {room.minPrice}€
                                  </li>
                                ))}
                              </ul>
                            ) : (
                              <span className="text-muted">Aucune</span>
                            )}
                          </td>
                          <td>
                            <div className="d-flex align-items-center gap-2">
                              <input
                                type="text"
                                className="form-control form-control-sm"
                                placeholder="Entrez propKey"
                                value={property.propKey || ""}
                                onChange={(e) => {
                                  const updatedProperties = properties.map(
                                    (p) =>
                                      p.propId === property.propId
                                        ? { ...p, propKey: e.target.value }
                                        : p
                                  );
                                  setProperties(updatedProperties);
                                }}
                                style={{ maxWidth: "120px" }}
                              />
                              <Button
                                size="sm"
                                variant="success"
                                onClick={async () => {
                                  if (!property.propKey) {
                                    setError(
                                      "Le propKey ne peut pas être vide"
                                    );
                                    return;
                                  }
                                  try {
                                    await keyService.setPropKey(
                                      property.propId,
                                      property.propKey
                                    );
                                    setError("");
                                    setSuccessMessage(
                                      `propKey pour ${property.name} enregistré !`
                                    );
                                    const updatedProperties = properties.map(
                                      (p) =>
                                        p.propId === property.propId
                                          ? { ...p, propKey: property.propKey }
                                          : p
                                    );
                                    setProperties(updatedProperties);
                                  } catch (err) {
                                    console.error(err);
                                    setError(
                                      `Erreur lors de l'enregistrement du propKey pour ${property.name}`
                                    );
                                  }
                                }}
                              >
                                Valider
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

        {/* Onglet témoignages */}
        <Tab
          eventKey="testimonials"
          title={`Témoignages (${testimonials.length})`}
        >
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
                        <th style={{ width: "15%" }}>Nom</th>
                        <th style={{ width: "15%" }}>Email</th>
                        <th style={{ width: "10%" }}>Note</th>
                        <th style={{ width: "35%" }}>Commentaire</th>
                        <th style={{ width: "10%" }}>Statut</th>
                        <th style={{ width: "15%" }}>Actions</th>
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
                            <div
                              className="text-muted"
                              style={{ fontSize: "0.75rem" }}
                            >
                              {formatDate(testimonial.createdAt)}
                            </div>
                          </td>
                          <td>
                            {renderStars(testimonial.rating)}
                            <div
                              className="text-muted"
                              style={{ fontSize: "0.85rem" }}
                            >
                              {testimonial.rating}/5
                            </div>
                          </td>
                          <td>
                            <div
                              style={{
                                maxHeight: "80px",
                                overflow: "auto",
                                fontSize: "0.9rem",
                              }}
                            >
                              {testimonial.comment}
                            </div>
                          </td>
                          <td>
                            {testimonial.approved ? (
                              <Badge bg="success">Approuvé</Badge>
                            ) : (
                              <Badge bg="warning" text="dark">
                                En attente
                              </Badge>
                            )}
                          </td>
                          <td>
                            <div className="d-flex flex-column gap-2">
                              {!testimonial.approved && (
                                <Button
                                  size="sm"
                                  variant="success"
                                  onClick={async () => {
                                    try {
                                      await testimonialService.approveTestimonial(
                                        testimonial.id
                                      );
                                      await loadTestimonials();
                                    } catch {
                                      setError(
                                        "Erreur lors de l'approbation du témoignage"
                                      );
                                    }
                                  }}
                                  className="w-100"
                                >
                                  <i className="bi bi-check-circle me-1"></i>
                                  Approuver
                                </Button>
                              )}
                              <Button
                                size="sm"
                                variant="outline-danger"
                                onClick={async () => {
                                  if (
                                    window.confirm(
                                      `Supprimer le témoignage de "${testimonial.name}" ?`
                                    )
                                  ) {
                                    try {
                                      await testimonialService.deleteTestimonial(
                                        testimonial.id
                                      );
                                      await loadTestimonials();
                                    } catch {
                                      setError(
                                        "Erreur lors de la suppression du témoignage"
                                      );
                                    }
                                  }
                                }}
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
    </Container>
  );
}
