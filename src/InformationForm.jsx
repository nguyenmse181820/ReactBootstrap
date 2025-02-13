import React, { useState } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import vi from 'date-fns/locale/vi';
import styles from './custom.module.css';

const InformationForm = ({ patientInfo, onInfoChange }) => {
    const [desiredDate, setDesiredDate] = useState(patientInfo.desiredDate || null);
    const [dateError, setDateError] = useState("");

    const handleChange = (field, value) => {
        onInfoChange({
            ...patientInfo,
            [field]: value
        });
    };

    const handleDateChange = (date) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (date > today) {
            setDateError("");
            setDesiredDate(date);
            onInfoChange({ ...patientInfo, desiredDate: date });
        } else {
            setDateError("Ngày mong muốn tiêm phải sau ngày hôm nay.");
        }
    };

    return (
        <Container className='mb-3'>
            <h4>THÔNG TIN NGƯỞI ĐƯỢC TIÊM</h4>
            <Form>
                <Row>
                    <Form.Group as={Col} md={6}>
                        <Form.Label><strong>Họ và tên</strong></Form.Label>
                        <Form.Control
                            value={patientInfo.fullName || ''}
                            required
                            placeholder='Họ và tên'
                            onChange={(e) => handleChange('fullName', e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group as={Col} md={6}>
                        <Form.Label><strong>Mối quan hệ</strong></Form.Label>
                        <Form.Select
                            required
                            value={patientInfo.relationship || ''}
                            onChange={(e) => handleChange('relationship', e.target.value)}
                        >
                            <option value="Con">Con</option>
                            <option value="Anh">Anh</option>
                            <option value="Chị">Chị</option>
                            <option value="Em">Em</option>
                            <option value="Cha">Cha</option>
                            <option value="Mẹ">Mẹ</option>
                            <option value="Vợ">Vợ</option>
                            <option value="Bản Thân">Bản Thân</option>
                        </Form.Select>
                    </Form.Group>
                </Row>

                <Row>
                    <Form.Group as={Col} md={6}>
                        <Form.Label><strong>Ngày sinh</strong></Form.Label>
                        <div>
                            <DatePicker
                                selected={patientInfo.dob ? new Date(patientInfo.dob) : null}
                                onChange={(date) => handleChange('dob', date)}
                                dateFormat="dd/MM/yyyy"
                                locale={vi}
                                required
                                placeholderText="Chọn ngày sinh"
                                className="form-control"
                                showMonthDropdown
                                showYearDropdown
                                dropdownMode="select"
                                wrapperClassName={styles.datepickerInput}
                            />
                        </div>
                    </Form.Group>
                    <Form.Group as={Col} md={6}>
                        <Form.Label><strong>Giới tính</strong></Form.Label>
                        <div aria-required="true">
                            <Form.Check
                                inline
                                type="radio"
                                id="male"
                                label="Nam"
                                name="gender"
                                value="Nam"
                                onChange={(e) => handleChange('gender', e.target.value)}
                                checked={patientInfo.gender === 'Nam'}
                            />
                            <Form.Check
                                inline
                                type="radio"
                                id="female"
                                label="Nữ"
                                name="gender"
                                value="Nữ"
                                onChange={(e) => handleChange('gender', e.target.value)}
                                checked={patientInfo.gender === 'Nữ'}
                            />
                        </div>
                    </Form.Group>
                </Row>

                <Row>
                    <Form.Group as={Col} md={6}>
                        <Form.Label><strong>Số điện thoại</strong></Form.Label>
                        <Form.Control
                            placeholder='Số điện thoại'
                            type='tel'
                            required
                            value={patientInfo.phone || ''}
                            onChange={(e) => handleChange('phone', e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group as={Col} md={6}>
                        <Form.Label><strong>Email</strong></Form.Label>
                        <Form.Control
                            placeholder='Email'
                            type="email"
                            value={patientInfo.email || ''}
                            onChange={(e) => handleChange('email', e.target.value)}
                        />
                    </Form.Group>
                </Row>

                <Row>
                    <Form.Group as={Col} md={4}>
                        <Form.Label><strong>Tỉnh/Thành</strong></Form.Label>
                        <Form.Select
                            required
                            value={patientInfo.province || ''}
                            onChange={(e) => handleChange('province', e.target.value)}
                        >
                            <option>Tỉnh/Thành</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group as={Col} md={4}>
                        <Form.Label><strong>Quận/Huyện</strong></Form.Label>
                        <Form.Select
                            required
                            value={patientInfo.district || ''}
                            onChange={(e) => handleChange('district', e.target.value)}
                        >
                            <option>Quận/Huyện</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group as={Col} md={4}>
                        <Form.Label><strong>Phường/Xã</strong></Form.Label>
                        <Form.Select
                            required
                            value={patientInfo.ward || ''}
                            onChange={(e) => handleChange('ward', e.target.value)}
                        >
                            <option>Phường/Xã</option>
                        </Form.Select>
                    </Form.Group>
                </Row>

                <Row>
                    <Form.Group as={Col} md={12}>
                        <Form.Label><strong>Địa chỉ</strong></Form.Label>
                        <Form.Control
                            required
                            value={patientInfo.address || ''}
                            onChange={(e) => handleChange('address', e.target.value)}
                            placeholder='Nhập địa chỉ'
                        />
                    </Form.Group>
                </Row>

                <Row>
                    <Form.Group as={Col} md={6}>
                        <Form.Label><strong>Ngày mong muốn tiêm</strong></Form.Label>
                        <div>
                            <DatePicker
                                required
                                selected={desiredDate}
                                onChange={handleDateChange}
                                dateFormat="dd/MM/yyyy"
                                locale={vi}
                                placeholderText="Ngày mong muốn tiêm"
                                className="form-control full-width"
                                showMonthDropdown
                                showYearDropdown
                                dropdownMode="select"
                                wrapperClassName={styles.datepickerInput}
                            />
                            {dateError && <small className="text-danger">{dateError}</small>}
                        </div>
                    </Form.Group>
                </Row>
            </Form>
        </Container>
    );
}

export default InformationForm;
