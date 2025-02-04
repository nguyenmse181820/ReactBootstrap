import React from 'react'
import { Card } from 'react-bootstrap'

const SummaryCard = ({ patients }) => {
    return (
        <>
            <Card className='rounded-0'>
                <Card.Header className='d-flex justify-content-center align-content-center fw-bold fs-5 text-uppercase'>
                    <p className='mb-0 py-2'>Danh sách người được tiêm</p>
                </Card.Header>
                <Card.Body>
                    {patients.map((patient, index) => (
                        <div key={patient.id} className="mb-3">
                            <h6>Patient {index + 1}</h6>
                            <p>Họ và tên: {patient.info.fullName || 'N/A'}</p>
                            <p>Số lượng vắc xin đã chọn: {patient.selectedVaccines.length}</p>
                            <ul>
                                {patient.selectedVaccines.map(vaccine => (
                                    <li key={vaccine.id}>{vaccine.name}</li>
                                ))}
                            </ul>
                            <p>Tổng cộng: {patient.selectedVaccines.reduce((sum, v) => sum + v.price, 0).toLocaleString()} VND</p>
                            <hr />
                        </div>
                        
                    ))}
                </Card.Body>
            </Card>
        </>
    )
}

export default SummaryCard
