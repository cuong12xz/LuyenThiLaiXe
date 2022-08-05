import axios from "axios"
import React, { useEffect, useState } from "react"
import { Container, Form, Toast, ToastContainer } from "react-bootstrap"
import Button from "react-bootstrap/esm/Button"
import { useSearchParams } from "react-router-dom"
import './dethi.css'
const initdethi = { TenDT: "" }
export default function SuaDeThi() {
    const [dethi, setDeThi] = useState(initdethi)
    const [thongbao, setThongBao] = useState({ show: false, message: "", success: false })
    const handleInputChange = (e) => {
        setDeThi({ ...dethi, [e.target.name]: e.target.value }) //... để rải hết dữ liệu trong câu hỏi
    }
   
    const handleSubmit = async (e) => {
        e.preventDefault()
        const response = await axios.put(process.env.REACT_APP_API_HOST + "/a1/suadethi", dethi)
        setThongBao(() => {
            if (response) {
                return { show: true, message: response.data.message, success: response.data.success }
            }
            return { ...thongbao }
        })
    }
    const [searchParams, setSearchParams] = useSearchParams()
    useEffect(() => {
        const getDataName = async () => {
            let idDeThi = searchParams.get("id")
            const response = await axios.get(process.env.REACT_APP_API_HOST + "/a1/1dethi", { params: { id: idDeThi } })
            console.log(response);
            setDeThi(response.data.result[0])
        }
        getDataName()
    }, [])
    return (
        <div className="dethibag">
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
