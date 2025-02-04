import React from 'react';
import { Carousel, Row, Col } from 'react-bootstrap';
import VaccineCard from './VaccineCard';
import { vaccines } from './Appointment';

const VaccineSelector = ({ selectedVaccines, onSelect, isMobile }) => {
  return (
    <div className="vaccine-selector">
      {isMobile ? (
        <Carousel className="bg-dark-subtle mb-3" style={{ minHeight: "300px" }}>
          {vaccines.map((vaccine) => {
            const isSelected = selectedVaccines.some(v => v.id === vaccine.id);
            return (
              <Carousel.Item key={vaccine.id}>
                <div className="d-flex justify-content-center h-100 pt-4">
                  <VaccineCard
                    vaccine={vaccine}
                    onSelect={onSelect}
                    isSelected={isSelected}
                    className="w-100"
                  />
                </div>
              </Carousel.Item>
            );
          })}
        </Carousel>
      ) : (
        <Row className="vaccine-grid">
          {vaccines.map((vaccine) => {
            const isSelected = selectedVaccines.some(v => v.id === vaccine.id);
            return (
              <Col key={vaccine.id} xl={4} lg={6}>
                <VaccineCard
                  vaccine={vaccine}
                  isSelected={isSelected}
                  onSelect={onSelect}
                  className="w-100"
                />
              </Col>
            );
          })}
        </Row>
      )}
    </div>
  );
};

export default VaccineSelector;