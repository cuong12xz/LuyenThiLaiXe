import axios from "axios"
import React, { useEffect, useState } from "react"
import { Container, Form, Toast, ToastContainer } from "react-bootstrap"
import Button from "react-bootstrap/esm/Button"
import './LoaiLyThuyet.css'

const initloailythuyet = { TenLoaiLT: "" }
export default function ThemLoaiLyThuyet() {
    const [loailythuyet, setLoaiLyThuyet] = useState(initloailythuyet)
    const [thongbao, setThongBao] = useState({ show: false, message: "", success: false })
    
    const handleInputChange = (e) => {
        setLoaiLyThuyet({ ...loailythuyet, [e.target.name]: e.target.value }) //... để rải hết dữ liệu trong câu hỏi
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        const response = await axios.post(process.env.REACT_APP_API_HOST + "/a1/themloailythuyet", loailythuyet)
        setThongBao(() => {
            if (response) {
                return { show: true, message: response.data.message, success: response.data.success }
            }
            return { ...thongbao }
        })
    }
    return (
        <div style={{ paddingTop: "55px", position: "relative", flexGrow: 1,backgroundColor:"#17a2b8"}}>
            <Container>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="form.Name" className="ib">
                        <Form.Label>Tên loại lý thuyết</Form.Label>
                        <Form.Control className="inbo" type="text" name="TenLoaiLT" value={loailythuyet.TenLoaiLT} onChange={handleInputChange} />
                    </Form.Group>
                    
                   
                    <Button variant="primary" size="lg" active type="submit">
                        Thêm
                    </Button>
                </Form>
            </Container>
            <ToastContainer position="middle-center" className="p-3">
                <Toast
                    bg={thongbao.success ? "success" : "danger"}
                    onClose={() => setThongBao({ ...thongbao, show: false })}
                    show={thongbao.show}
                    delay={3000}
                    autohide>
                    <Toast.Header>
                        <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
                        <strong className="me-auto">Thông báo</strong>
                        <small className="text-muted">just now</small>
                    </Toast.Header>
                    <Toast.Body>{thongbao.message}</Toast.Body>
                </Toast>
            </ToastContainer>
        </div>
    )
}
