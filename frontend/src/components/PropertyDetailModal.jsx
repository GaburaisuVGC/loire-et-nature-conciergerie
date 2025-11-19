import React, { useState } from "react";
import {
  Modal,
  Container,
  Row,
  Col,
  Badge,
  Button,
  Card,
  Carousel,
  Alert,
  Tabs,
  Tab,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { FEATURE_TRANSLATIONS } from "../utils/featureTranslations";

export default function PropertyDetailModal({ show, onHide, property }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  property = property.content;

  if (!property) return null;

  // Extract images from new API structure
  let images = [];
  if (property.images && property.images.external) {
    images = Object.values(property.images.external)
      .filter((img) => img.url)
      .map((img, idx) => ({
        url: img.url,
        alt: img.caption?.FR || `Image ${idx + 1}`,
      }));
  }

  // Helper to format price to 2 decimals
  const formatPrice = (price) => {
    if (typeof price === "string" || typeof price === "number") {
      const num = Number(price);
      if (!isNaN(num)) return num.toFixed(2);
    }
    return price;
  };

  // Extract features from featureCodes (array of arrays)
  const features = property.featureCodes
    ? property.featureCodes.flat().filter(Boolean)
    : [];

  // Extract description and house rules
  const description =
    property.texts?.propertyDescriptionText?.FR ||
    property.texts?.propertyDescription1?.FR ||
    property.name;
  const houseRules = property.texts?.houseRules?.FR || "";
  const locationDescription = property.texts?.locationDescription?.FR || "";

  // Extract upsell (services)
  const upsell = property.bookingData?.upsell
    ? Object.values(property.bookingData.upsell).filter(
        (u) => u.type && u.type !== "0"
      )
    : [];

  // Extract name
  const displayName = property.texts?.headlineText?.FR || property.name;

  const handleImageSelect = (index) => {
    setCurrentImageIndex(index);
  };

  const translatedFeatures = features.map((f) => FEATURE_TRANSLATIONS[f] || f);

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="xl"
      fullscreen="lg-down"
      scrollable
    >
      <Modal.Header closeButton className="border-bottom">
        <Modal.Title className="text-primary-custom">{displayName}</Modal.Title>
      </Modal.Header>

      <Modal.Body className="p-0">
        <Container fluid className="py-4">
          <Row className="justify-content-center">
            <Col lg={10}>
              {/* IMAGES */}
              {images.length > 0 ? (
                <div className="mb-4">
                  <Carousel
                    activeIndex={currentImageIndex}
                    onSelect={setCurrentImageIndex}
                    className="property-carousel"
                  >
                    {images.map((image, index) => (
                      <Carousel.Item key={index}>
                        <div
                          className="carousel-image"
                          style={{
                            height: "400px",
                            backgroundImage: `url(${image.url})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            backgroundColor: "#f8f9fa",
                          }}
                        ></div>
                      </Carousel.Item>
                    ))}
                  </Carousel>

                  {/* Thumbnails */}
                  <div className="d-flex mt-3 gap-2 overflow-auto">
                    {images.map((image, index) => (
                      <div
                        key={index}
                        className={`thumbnail ${
                          index === currentImageIndex ? "active" : ""
                        }`}
                        style={{
                          width: "80px",
                          height: "60px",
                          backgroundColor: "#f8f9fa",
                          border:
                            index === currentImageIndex
                              ? "2px solid var(--color-vert-nature)"
                              : "1px solid #dee2e6",
                          borderRadius: "4px",
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                          overflow: "hidden",
                        }}
                        onClick={() => handleImageSelect(index)}
                      >
                        <img
                          src={image.url}
                          alt={image.alt}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="mb-4 text-center py-5 bg-light rounded">
                  <i
                    className="bi bi-image text-muted"
                    style={{ fontSize: "3rem" }}
                  ></i>
                  <p className="mt-2 text-muted">Aucune image disponible</p>
                </div>
              )}

              {/* DESCRIPTION */}
              <Card className="mb-4">
                <Card.Body>
                  <h4 className="text-primary-custom mb-3">Description</h4>
                  <div style={{ whiteSpace: "pre-line" }}>{description}</div>

                  {locationDescription && (
                    <div className="mt-3">
                      <h6>Localisation :</h6>
                      <div>{locationDescription}</div>
                    </div>
                  )}
                </Card.Body>
              </Card>

              {/* TABS */}
              <Tabs defaultActiveKey="features" className="mb-4">
                {/* FEATURES */}
                <Tab eventKey="features" title="Caractéristiques">
                  <Card>
                    <Card.Body>
                      {features.length > 0 ? (
                        <ul className="list-unstyled">
                          {translatedFeatures.map((feature, idx) => (
                            <li key={idx}>
                              <i className="bi bi-check-circle-fill text-success me-2"></i>
                              {feature}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <div className="text-muted">
                          Aucune caractéristique disponible.
                        </div>
                      )}
                    </Card.Body>
                  </Card>
                </Tab>

                {/* UPSELL */}
                <Tab eventKey="upsell" title="Services & Options">
                  <Card>
                    <Card.Body>
                      {upsell.length > 0 ? (
                        <ul className="list-unstyled">
                          {upsell.map((item, idx) => (
                            <li key={idx}>
                              <strong>
                                {item.description?.FR || "Service optionnel"}:
                              </strong>{" "}
                              {formatPrice(item.price)}€
                              {item.description2?.FR && (
                                <span className="text-muted ms-2">
                                  {item.description2.FR}
                                </span>
                              )}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <div className="text-muted">
                          Aucun service optionnel.
                        </div>
                      )}
                    </Card.Body>
                  </Card>
                </Tab>

                {/* RULES */}
                <Tab eventKey="rules" title="Règlement intérieur">
                  <Card>
                    <Card.Body>
                      {houseRules ? (
                        <div style={{ whiteSpace: "pre-line" }}>
                          {houseRules}
                        </div>
                      ) : (
                        <div className="text-muted">
                          Aucun règlement intérieur renseigné.
                        </div>
                      )}
                    </Card.Body>
                  </Card>
                </Tab>
              </Tabs>

              {/* BOOKING BUTTON */}
              <div className="text-center mt-4 mb-2">
                <Button
                  as="a"
                  href={`https://beds24.com/booking2.php?propid=${property.propId}`}
                  className="btn-primary px-4 py-2"
                  size="lg"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="bi bi-calendar-check me-2"></i>
                  Réserver sur Beds24
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </Modal.Body>
    </Modal>
  );
}
