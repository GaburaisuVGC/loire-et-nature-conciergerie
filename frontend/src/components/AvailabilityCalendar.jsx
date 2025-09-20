/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Card, Button, Badge, Alert, Spinner, Row, Col } from 'react-bootstrap';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isToday, addMonths, subMonths } from 'date-fns';
import { fr } from 'date-fns/locale';

export default function AvailabilityCalendar({ propertyId, availability, loading, onDateSelect, onMonthChange }) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDates, setSelectedDates] = useState({ checkIn: null, checkOut: null });
  const [hoveredDate, setHoveredDate] = useState(null);

  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const weekDays = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];

  const handlePrevMonth = () => {
    const newMonth = subMonths(currentMonth, 1);
    setCurrentMonth(newMonth);
    if (onMonthChange) {
      onMonthChange(newMonth);
    }
  };

  const handleNextMonth = () => {
    const newMonth = addMonths(currentMonth, 1);
    setCurrentMonth(newMonth);
    if (onMonthChange) {
      onMonthChange(newMonth);
    }
  };

    // Fonction pour trouver la première date indisponible après une date donnée
  const findNextUnavailableDate = (fromDate) => {
    if (!availability) return null;
    
    // Commence le lendemain de la date de départ
    const checkDate = new Date(fromDate);
    checkDate.setDate(checkDate.getDate() + 1);
    
    // Cherche jusqu'à 1 an dans le futur maximum
    const maxDate = new Date(fromDate);
    maxDate.setFullYear(maxDate.getFullYear() + 1);
    
    while (checkDate <= maxDate) {
      const dateKey = format(checkDate, 'yyyy-MM-dd');
      const dayAvailability = availability[dateKey];
      
      // Si la date n'existe pas dans availability ou n'est pas disponible
      if (!dayAvailability || !dayAvailability.available) {
        return new Date(checkDate);
      }
      
      checkDate.setDate(checkDate.getDate() + 1);
    }
    
    return null; // Aucune date indisponible trouvée
  };

  // Fonction pour calculer la date de départ maximale autorisée
  const getMaxCheckOutDate = (checkInDate) => {
    if (!checkInDate) return null;
    
    const nextUnavailableDate = findNextUnavailableDate(checkInDate);
    
    if (nextUnavailableDate) {
      // La date de départ max est la veille de la première date indisponible
      const maxCheckOut = new Date(nextUnavailableDate);
      maxCheckOut.setDate(maxCheckOut.getDate() - 1);
      return maxCheckOut;
    }
    
    // Si aucune date indisponible n'est trouvée, limite à 1 an
    const maxDate = new Date(checkInDate);
    maxDate.setFullYear(maxDate.getFullYear() + 1);
    return maxDate;
  };

  const handleDateClick = (date) => {
    const dateKey = format(date, 'yyyy-MM-dd');
    const dayAvailability = availability?.[dateKey];

    if (!dayAvailability?.available) return;

    if (!selectedDates.checkIn || (selectedDates.checkIn && selectedDates.checkOut)) {
      // Première sélection : date d'arrivée
      setSelectedDates({ checkIn: date, checkOut: null });
    } else if (date > selectedDates.checkIn) {
      // Vérification que la date de départ respecte la limite
      const maxCheckOutDate = getMaxCheckOutDate(selectedDates.checkIn);
      
      if (maxCheckOutDate && date <= maxCheckOutDate) {
        // La date de départ est valide
        setSelectedDates(prev => ({ ...prev, checkOut: date }));
        if (onDateSelect) {
          onDateSelect({ checkIn: selectedDates.checkIn, checkOut: date });
        }
      } else {
        // La date de départ dépasse la limite, ne fait rien ou affiche un message
        console.warn(`Date de départ trop tardive. Maximum autorisé : ${maxCheckOutDate ? format(maxCheckOutDate, 'dd/MM/yyyy') : 'Non défini'}`);
        return;
      }
    } else {
      // Date antérieure à l'arrivée : nouvelle sélection d'arrivée
      setSelectedDates({ checkIn: date, checkOut: null });
    }
  };

  const getDayStatus = (date) => {
    const dateKey = format(date, 'yyyy-MM-dd');
    const dayAvailability = availability?.[dateKey];
    
    if (!dayAvailability) return 'unknown';
    if (!dayAvailability.available) return 'unavailable';
    
    const { checkIn, checkOut } = selectedDates;
    
    // Si une date d'arrivée est sélectionnée, vérifier les limitations pour les dates de départ
    if (checkIn && !checkOut && date > checkIn) {
      const maxCheckOutDate = getMaxCheckOutDate(checkIn);
      if (maxCheckOutDate && date > maxCheckOutDate) {
        return 'blocked'; // Nouvelle classe pour les dates bloquées
      }
    }
    
    if (checkIn && format(checkIn, 'yyyy-MM-dd') === dateKey) return 'check-in';
    if (checkOut && format(checkOut, 'yyyy-MM-dd') === dateKey) return 'check-out';
    if (checkIn && checkOut && date > checkIn && date < checkOut) return 'in-range';
    if (checkIn && !checkOut && hoveredDate && date > checkIn && date <= hoveredDate) {
      // Vérifier aussi pour la prévisualisation
      const maxCheckOutDate = getMaxCheckOutDate(checkIn);
      if (maxCheckOutDate && hoveredDate <= maxCheckOutDate) {
        return 'preview-range';
      }
    }
    
    return 'available';
  };

  const getDayClassName = (date) => {
    const status = getDayStatus(date);
    const isCurrentMonth = isSameMonth(date, currentMonth);
    const isCurrentDay = isToday(date);
    
    let className = 'calendar-day';
    
    if (!isCurrentMonth) className += ' other-month';
    if (isCurrentDay) className += ' today';
    
    switch (status) {
      case 'unavailable':
        className += ' unavailable';
        break;
      case 'blocked':
        className += ' blocked';
        break;
      case 'available':
        className += ' available';
        break;
      case 'check-in':
        className += ' selected check-in';
        break;
      case 'check-out':
        className += ' selected check-out';
        break;
      case 'in-range':
        className += ' in-range';
        break;
      case 'preview-range':
        className += ' preview-range';
        break;
      default:
        className += ' unknown';
    }
    
    return className;
  };

  const getDatePrice = (date) => {
    const dateKey = format(date, 'yyyy-MM-dd');
    return availability?.[dateKey]?.price;
  };

  // Calcul des jours du calendrier avec le décalage pour commencer par lundi
  const startDate = new Date(monthStart);
  const dayOfWeek = startDate.getDay();
  const mondayOffset = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
  startDate.setDate(startDate.getDate() - mondayOffset);

  const calendarDays = [];
  for (let i = 0; i < 42; i++) { 
    const day = new Date(startDate);
    day.setDate(startDate.getDate() + i);
    calendarDays.push(day);
  }

  const calculateTotalPrice = () => {
    if (!selectedDates.checkIn || !selectedDates.checkOut) return 0;
    
    let total = 0;
    const currentDate = new Date(selectedDates.checkIn);
    
    while (currentDate < selectedDates.checkOut) {
      const dateKey = format(currentDate, 'yyyy-MM-dd');
      const price = availability?.[dateKey]?.price || 0;
      total += price;
      currentDate.setDate(currentDate.getDate() + 1);
    }
    
    return total;
  };

  const calculateNights = () => {
    if (!selectedDates.checkIn || !selectedDates.checkOut) return 0;
    return Math.ceil((selectedDates.checkOut - selectedDates.checkIn) / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="availability-calendar">
      <style>{`
        .calendar-day {
          aspect-ratio: 1;
          border: 1px solid #e9ecef;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          position: relative;
          font-size: 0.875rem;
          transition: all 0.2s ease;
          background-color: white;
          min-height: 50px;
        }
        
        .calendar-day:hover {
          background-color: #f8f9fa;
        }
        
        .calendar-day.other-month {
          color: #adb5bd;
          background-color: #f8f9fa;
        }
        
        .calendar-day.today {
          font-weight: bold;
          border-color: var(--color-vert-nature, #6E8C4B);
          border-width: 2px;
        }
        
        .calendar-day.unavailable {
          background-color: #f8d7da;
          color: #721c24;
          cursor: not-allowed;
        }
        
        .calendar-day.available {
          background-color: #d1edda;
          color: #155724;
        }
        
        .calendar-day.available:hover {
          background-color: #c3e6cb;
        }
        
        .calendar-day.selected {
          background-color: var(--color-vert-nature, #6E8C4B);
          color: white;
        }
        
        .calendar-day.check-in {
          border-top-left-radius: 50%;
          border-bottom-left-radius: 50%;
        }
        
        .calendar-day.check-out {
          border-top-right-radius: 50%;
          border-bottom-right-radius: 50%;
        }
        
        .calendar-day.in-range {
          background-color: rgba(110, 140, 75, 0.3);
          color: #155724;
        }
        
        .calendar-day.preview-range {
          background-color: rgba(110, 140, 75, 0.1);
          color: #155724;
        }
        
        .calendar-price {
          font-size: 0.7rem;
          font-weight: bold;
          color: var(--color-vert-nature, #6E8C4B);
          margin-top: 2px;
        }
        
        .calendar-grid {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: 1px;
          background-color: #dee2e6;
          border: 1px solid #dee2e6;
          border-radius: 8px;
          overflow: hidden;
        }
        
        .calendar-header {
          background-color: var(--color-rose, #D8CBB5);
          padding: 0.75rem 0.5rem;
          text-align: center;
          font-weight: bold;
          color: var(--color-gris-ardoise, #404040);
          font-size: 0.875rem;
        }
        
        @media (max-width: 576px) {
          .calendar-day {
            font-size: 0.75rem;
            min-height: 40px;
          }
          
          .calendar-price {
            font-size: 0.6rem;
          }
          
          .calendar-header {
            padding: 0.5rem 0.25rem;
            font-size: 0.75rem;
          }
        }
      `}</style>

      <Card>
        <Card.Header>
          <div className="d-flex justify-content-between align-items-center">
            <Button 
              variant="outline-secondary" 
              size="sm" 
              onClick={handlePrevMonth}
              disabled={loading}
            >
              <i className="bi bi-chevron-left"></i>
            </Button>
            
            <h5 className="mb-0 text-primary-custom">
              {format(currentMonth, 'MMMM yyyy', { locale: fr })}
            </h5>
            
            <Button 
              variant="outline-secondary" 
              size="sm" 
              onClick={handleNextMonth}
              disabled={loading}
            >
              <i className="bi bi-chevron-right"></i>
            </Button>
          </div>
        </Card.Header>
        
        <Card.Body className="p-0">
          {loading ? (
            <div className="text-center py-4">
              <Spinner animation="border" variant="primary" />
              <p className="mt-2 mb-0">Chargement du calendrier...</p>
            </div>
          ) : (
            <>
              <div className="calendar-grid">

                {weekDays.map(day => (
                  <div key={day} className="calendar-header">
                    {day}
                  </div>
                ))}
                

                {calendarDays.map((date, index) => {
                  const price = getDatePrice(date);
                  const isCurrentMonth = isSameMonth(date, currentMonth);
                  
                  return (
                    <div
                      key={index}
                      className={getDayClassName(date)}
                      onClick={() => isCurrentMonth && handleDateClick(date)}
                      onMouseEnter={() => setHoveredDate(date)}
                      onMouseLeave={() => setHoveredDate(null)}
                    >
                      <span>{format(date, 'd')}</span>
                      {price && isCurrentMonth && (
                        <span className="calendar-price">{price}€</span>
                      )}
                    </div>
                  );
                })}
              </div>
              

              <div className="p-3 border-top">
                <Row className="text-center small">
                  <Col>
                    <div className="d-flex align-items-center justify-content-center mb-2">
                      <div 
                        className="me-2" 
                        style={{
                          width: '12px',
                          height: '12px',
                          backgroundColor: '#d1edda',
                          border: '1px solid #c3e6cb'
                        }}
                      ></div>
                      <span>Disponible</span>
                    </div>
                  </Col>
                  <Col>
                    <div className="d-flex align-items-center justify-content-center mb-2">
                      <div 
                        className="me-2" 
                        style={{
                          width: '12px',
                          height: '12px',
                          backgroundColor: '#f8d7da',
                          border: '1px solid #f5c6cb'
                        }}
                      ></div>
                      <span>Occupé</span>
                    </div>
                  </Col>
                  <Col>
                    <div className="d-flex align-items-center justify-content-center mb-2">
                      <div 
                        className="me-2" 
                        style={{
                          width: '12px',
                          height: '12px',
                          backgroundColor: 'var(--color-vert-nature, #6E8C4B)',
                          border: '1px solid var(--color-vert-nature, #6E8C4B)'
                        }}
                      ></div>
                      <span>Sélectionné</span>
                    </div>
                  </Col>
                </Row>
              </div>
            </>
          )}
        </Card.Body>
        

        {(selectedDates.checkIn || selectedDates.checkOut) && (
          <Card.Footer>
            <Row>
              <Col md={8}>
                <div className="small">
                  {selectedDates.checkIn && (
                    <p className="mb-1">
                      <strong>Arrivée :</strong> {format(selectedDates.checkIn, 'dd/MM/yyyy')}
                    </p>
                  )}
                  {selectedDates.checkOut && (
                    <p className="mb-1">
                      <strong>Départ :</strong> {format(selectedDates.checkOut, 'dd/MM/yyyy')}
                    </p>
                  )}
                  {selectedDates.checkIn && selectedDates.checkOut && (
                    <p className="mb-0">
                      <strong>{calculateNights()} nuit(s)</strong>
                    </p>
                  )}
                </div>
              </Col>
              <Col md={4} className="text-end">
                {selectedDates.checkIn && selectedDates.checkOut && (
                  <div>
                    <div className="h5 mb-1 text-primary-custom">
                      {calculateTotalPrice().toFixed(2)}€
                    </div>
                    <small className="text-muted">Total</small>
                  </div>
                )}
              </Col>
            </Row>
            
            {selectedDates.checkIn && selectedDates.checkOut && (
              <div className="mt-3">
                <Button className="btn-primary w-100" size="lg">
                  <i className="bi bi-calendar-check me-2"></i>
                  Réserver ces dates
                </Button>
              </div>
            )}
          </Card.Footer>
        )}
      </Card>
      
      <Alert variant="info" className="mt-3">
        <div className="small">
          <strong>Comment réserver :</strong>
          <ul className="mb-0 mt-1">
            <li>Cliquez sur votre date d'arrivée</li>
            <li>Cliquez ensuite sur votre date de départ</li>
            <li>Contactez-nous pour finaliser la réservation</li>
          </ul>
        </div>
      </Alert>
    </div>
  );
}