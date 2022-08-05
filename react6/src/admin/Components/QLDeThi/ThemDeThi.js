import axios from "axios"
import React, { useEffect, useState } from "react"
import { Container, Form, Toast, ToastContainer } from "react-bootstrap"
import Button from "react-bootstrap/esm/Button"

const initdethi = { TenDT: "" }
export default function ThemDeThi() {
    const [dethi, setdethi] = useState(initdethi)
    const [thongbao, setThongBao] = useState({ show: false, message: "", success: false })
    const handleInputChange = (e) => {
        setdethi({ ...dethi, [e.target.name]: e.target.value }) //... để rải hết dữ liệu trong câu hỏi
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        const response = await axios.post(process.env.REACT_APP_API_HOST + "/a1/themdethi", dethi)
        setThongBao(() => {
            if (response) {
                return { show: true, message: response.data.message, success: response.data.success }
            }
            return { ...thongbao }
        })
    }
    return (
        <div  className="bag" style={{ backgroundColor: "rgb(205, 255, 255)" }}>
            <Container>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="form.Name" className="ib">
                        <Form.Label>Ten de thi</Form.Label>
                        <Form.Control className="inbo" type="text" name="TenDT" value={dethi.TenDT} onChange={handleInputChange} />
                    </Form.Group>
                    <Button variant="primary" size="lg" active type="submit">
                        Thêm
                    </Button>
                    {/* <Form.Group controlId="form.Email">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="name@example.com" />
                    </Form.Group>
                    <Form.Group controlId="form.Textarea">
                        <Form.Label>Comment</Form.Label>
                        <Form.Control as="textarea" rows={3} />
                    </Form.Group> */}
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
                        <strong className="me-auto">Thong bao</strong>
                        <small className="text-muted">just now</small>
                    </Toast.Header>
                    <Toast.Body>{thongbao.message}</Toast.Body>
                </Toast>
            </ToastContainer>
        </div>
    )
}
