import axios from "axios"
import React, { useEffect, useState } from "react"
import { Button, Container, Form, Toast, ToastContainer } from "react-bootstrap"
import { useSearchParams } from "react-router-dom"

export default function SuaNguoiDung() {
    const [nguoidung, setNguoiDung] = useState([])
    const [thongbao, setThongBao] = useState({ show: false, message: "", success: false })
    const handleInputChange=async(e)=>{
        setNguoiDung({...nguoidung,[e.target.name]:e.target.value})
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        const response = await axios.put(process.env.REACT_APP_API_HOST+"/user/suanguoidung",nguoidung)
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
            let id = searchParams.get("id")
            const response = await axios.get(process.env.REACT_APP_API_HOST + "/user/detailuser", { params: { id: id } })
            console.log(response);
            setNguoiDung(response.data.result[0])
        }
        getDataName()
    }, [])
    return (
        <div style={{ paddingTop: "55px", position: "relative", flexGrow: 1, backgroundColor: "#17a2b8" }}>
            <Container>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="form.Name" className="ib">
                        <Form.Label>Họ Tên</Form.Label>
                        <Form.Control className="inbo" type="text" name="HoTen" value={nguoidung.HoTen} onChange={handleInputChange} />
                    </Form.Group>
                    <Form.Group controlId="form.Name" className="ib">
                        <Form.Label>Email</Form.Label>
                        <Form.Control className="inbo" type="text" name="Email" value={nguoidung.Email} onChange={handleInputChange} disabled />
                    </Form.Group>
                    <Form.Group controlId="form.CauDiemLiet" className="ib">
                            <Form.Label className="inline">Level</Form.Label>
                            <Form.Check aria-label="option 1" label="Quyền quản trị viên" name="lv" onChange={handleInputChange} value={nguoidung.lv} />
                        </Form.Group>
                    <Button variant="primary" size="lg" active type="submit">
                        Cập nhật
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
                        <strong className="me-auto">Thong bao</strong>
                        <small className="text-muted">just now</small>
                    </Toast.Header>
                    <Toast.Body>{thongbao.message}</Toast.Body>
                </Toast>
            </ToastContainer>
        </div>
    )
}
