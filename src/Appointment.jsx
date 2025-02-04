import { Container, Row, Col, Carousel, Button } from "react-bootstrap"
import "bootstrap/dist/css/bootstrap.min.css";
import SummaryCard from "./SummaryCard";
import InformationForm from "./InformationForm";
import VaccineSelector from "./VaccineSelector";
import React, { useState, useEffect } from "react";
import { Toaster, toast } from 'sonner';

export const vaccines = [
  { id: "1", name: "Vắc xin Shingrix", manufacturer: "GSK (Bỉ)", price: 3890000, use: "Zona thần kinh" },
  { id: "2", name: "Vắc xin QDenga", manufacturer: "Takeda (Germany)", price: 1390000, use: "Sốt xuất huyết" },
  { id: "3", name: "Vắc xin Priorix", manufacturer: "GSK (Bỉ)", price: 495000, use: "Sởi, Quai bị, Rubella" },
  { id: "4", name: "Vắc xin MMR II", manufacturer: "MSD (Mỹ)", price: 445000, use: "Sởi, Quai bị, Rubella" },
  { id: "5", name: "Vắc xin Varilrix", manufacturer: "GSK (Bỉ)", price: 1085000, use: "Thủy đậu" },
  { id: "6", name: "Vắc xin Varivax", manufacturer: "MSD (Mỹ)", price: 1085000, use: "Thủy đậu" },
  { id: "7", name: "Vắc xin Infanrix Hexa", manufacturer: "GSK (Bỉ)", price: 1850000, use: "Bạch hầu, Ho gà, Uốn ván, Viêm gan B, Bại liệt, Hib" },
  { id: "8", name: "Vắc xin Pentaxim", manufacturer: "Sanofi Pasteur (Pháp)", price: 980000, use: "Bạch hầu, Ho gà, Uốn ván, Bại liệt, Hib" },
  { id: "9", name: "Vắc xin Prevenar 13", manufacturer: "Pfizer (Mỹ)", price: 1400000, use: "Phòng bệnh do phế cầu khuẩn" },
  { id: "10", name: "Vắc xin Engerix-B", manufacturer: "GSK (Bỉ)", price: 350000, use: "Viêm gan B" },
  { id: "11", name: "Vắc xin Twinrix", manufacturer: "GSK (Bỉ)", price: 1150000, use: "Viêm gan A và B" },
  { id: "12", name: "Vắc xin Havrix", manufacturer: "GSK (Bỉ)", price: 850000, use: "Viêm gan A" },
  { id: "13", name: "Vắc xin Gardasil 9", manufacturer: "MSD (Mỹ)", price: 2100000, use: "Phòng ung thư cổ tử cung do HPV" },
  { id: "14", name: "Vắc xin Rotarix", manufacturer: "GSK (Bỉ)", price: 970000, use: "Phòng tiêu chảy do Rotavirus" },
  { id: "15", name: "Vắc xin Ixiaro", manufacturer: "Valneva (Áo)", price: 1900000, use: "Viêm não Nhật Bản" },
  { id: "16", name: "Vắc xin Menactra", manufacturer: "Sanofi Pasteur (Pháp)", price: 1300000, use: "Phòng viêm màng não do não mô cầu" }
];


function Appointment() {
  const [isMobile, setIsMobile] = useState(false);
  const [patients, setPatients] = useState([
    { id: 1, info: {}, selectedVaccines: [] }
  ]);
  const [currentPatientIndex, setCurrentPatientIndex] = useState(0);

  const handleVaccineSelect = (vaccine) => {
    setPatients((prev) => {
      const updatedPatients = [...prev];
      const currentPatient = updatedPatients[currentPatientIndex];
      const isSelected = currentPatient.selectedVaccines.some(v => v.id === vaccine.id);
      if (isSelected) {
        currentPatient.selectedVaccines = currentPatient.selectedVaccines.filter(v => v.id !== vaccine.id);
        toast.warning(`Đã xóa ${vaccine.name} từ danh sách của Patient ${currentPatientIndex + 1}`);
      } else {
        currentPatient.selectedVaccines = [...currentPatient.selectedVaccines, vaccine];
        toast.success(`Đã thêm ${vaccine.name} vào danh sách của Patient ${currentPatientIndex + 1}`);
      }
      return updatedPatients;
    })
  };

  const validatePatient = (patient) => {
    return patient.info.fullName &&
      patient.info.dob &&
      patient.info.gender &&
      patient.info.phone &&
      patient.selectedVaccines.length > 0;
  };

  const addPatient = () => {
    const currentPatient = patients[currentPatientIndex];
    if (!validatePatient(currentPatient)) {
      toast.error('Vui lòng điền đầy đủ thông tin người được tiêm hiện tại.');
      return;
    }
    if (patients.length < 5) {
      setPatients((prev) => [...prev,
      { id: prev.length + 1, info: {}, selectedVaccines: [] }
      ]);
      setCurrentPatientIndex(patients.length);
    }
  }

  const handleFormSubmit = () => {
    if (patients.every(validatePatient)) {
      toast.success('Đăng ký thành công!');
    } else {
      toast.error('Vui lòng nhập đủ các thông tin cần thiết và chọn ít nhất 1 vắc xin!');
    }
  }

  const handleInfoChange = (newInfo) => {
    setPatients((prevPatients) => {
      const updatedPatients = [...prevPatients];
      updatedPatients[currentPatientIndex].info = newInfo;
      return updatedPatients;
    })
  }

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 992);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Container fluid>
      <Toaster position="bottom-right" />
      <Row>
        <h2 className="text-center my-5">ĐĂNG KÝ MŨI TIÊM</h2>
      </Row>
      <Row className="mb-3">
        <Col className="d-flex gap-2 flex-wrap">
          {patients.map((patient, index) => (
            <Button
              className="rounded-0"
              key={patient.id}
              variant={index === currentPatientIndex ? "primary" : "outline-primary"}
              onClick={() => setCurrentPatientIndex(index)}
            >
              Patient {index + 1}
            </Button>
          ))}
          {patients.length < 5 && (
            <Button className="rounded-0" variant="success" onClick={addPatient}>
              Add Patient +
            </Button>
          )}
        </Col>
      </Row>
      <Row>
        <Col lg={8}>
          <InformationForm
            patientInfo={patients[currentPatientIndex].info}
            onInfoChange={handleInfoChange}
          />
          <div className="w-100 d-flex justify-content-center">
            <Button
              className="mt-2 mb-4 w-50 rounded-0"
              onClick={() => { handleFormSubmit() }}
            >
              Submit Registration
            </Button>
          </div>
          <h4 className="my-3">DANH SÁCH VẮC XIN</h4>
          <VaccineSelector isMobile={isMobile} onSelect={handleVaccineSelect} selectedVaccines={patients[currentPatientIndex].selectedVaccines} />

        </Col>
        <Col lg={4} md={12}>
          <SummaryCard patients={patients} />
        </Col>
      </Row>
    </Container>
  );
}

export default Appointment;