import React from "react";
import { Card, Button } from "react-bootstrap";

const VaccineCard = ({ vaccine, onSelect, isSelected }) => {
  return (
    <>
      <Card className={`shadow-sm border-2 rounded-0 w-100 mb-3 ${isSelected ? 'border-primary border-2' : 'border-white'}`}
        style={{
          maxWidth: "320px",
          minHeight: "280px",
          cursor: 'pointer',
          transition: 'border-color 0.2s'
        }}
        onClick={() => onSelect(vaccine)}>
        <Card.Header className="text-white rounded-0 pt-4" style={{ background: "black" }}>
          <h6 className="text-uppercase fs-6 mb-1">{vaccine.name}</h6>
          <p className="small">Manufacturer: {vaccine.manufacturer}</p>
        </Card.Header>
        <Card.Body className="p-4 d-flex flex-column">
          <div className="d-flex align-items-center mb-2">
            <h5 className="fw-bold fs-5 fs-sm-4">
              {vaccine.price.toLocaleString()} VND
            </h5>
          </div>

          <div>
            <p className="small">
              <strong>Use:</strong> {vaccine.use}
            </p>
          </div>
        </Card.Body>
      </Card>
    </>
  );
};

export default VaccineCard;