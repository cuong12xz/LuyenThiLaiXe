import axios from "axios"
import React, { useEffect, useState } from "react"
import { Container, Form, Toast, ToastContainer } from "react-bootstrap"
import Button from "react-bootstrap/esm/Button"
import './LoaiBienBao.css'

const initloaibienbao = { TenLoaiBB: "" }
export default function ThemLoaiBienBao() {
    const [loaibienbao, setLoaiBienBao] = useState(initloaibienbao)
    const [thongbao, setThongBao] = useState({ show: false, message: "", success: false })
    
    const handleInputChange = (e) => {
        setLoaiBienBao({ ...loaibienbao, [e.target.name]: e.target.value }) //... để rải hết dữ liệu trong câu hỏi
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        const response = await axios.post(process.env.REACT_APP_API_HOST + "/a1/themloaibienbao", loaibienbao)
        setThongBao(() => {
            if (response) {
                return { show: true, message: response.data.message, success: response.data.success }
            }
            return { ...thongbao }
        })
    }
    return (
        <div style={{ paddingTop: "55px", position: "relative", flexGrow: 1,width:"1000px"}}>
            <Container>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="form.Name" className="ib">
                        <Form.Label>Tên loại biển báo</Form.Label>
                        <Form.Control className="inbo" type="text" name="TenLoaiBB" value={loaibienbao.TenLoaiBB} onChange={handleInputChange} />
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
