import axios from "axios"
import React, { useEffect, useState } from "react"
import { Container, Form, Toast, ToastContainer } from "react-bootstrap"
import Button from "react-bootstrap/esm/Button"
import './MeoThi.css'

const initmeothi = { TenMT: "" }
export default function ThemMeothi() {
    const [meothi, setMeothi] = useState(initmeothi)
    const [thongbao, setThongBao] = useState({ show: false, message: "", success: false })
    const [loaimeothi, setLoaiMeoThi] = useState([])
    useEffect(() => {
        const getDataName = async () => {
            const response = await axios.get(process.env.REACT_APP_API_HOST + "/a1/loaimeothi")
            setLoaiMeoThi(response.data.result)
        }
        getDataName()
    }, [])
    const handleInputChange = (e) => {
        setMeothi({ ...meothi, [e.target.name]: e.target.value }) //... để rải hết dữ liệu trong câu hỏi
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        const response = await axios.post(process.env.REACT_APP_API_HOST + "/a1/themmeothi", meothi)
        setThongBao(() => {
            if (response) {
                return { show: true, message: response.data.message, success: response.data.success }
            }
            return { ...thongbao }
        })
    }
    return (
        <div style={{ paddingTop: "55px", position: "relative", flexGrow: 1,backgroundColor:"#17a2b8" }}>
            <Container>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="form.Name" className="ib">
                        <Form.Label>Tên mẹo thi</Form.Label>
                        <Form.Control className="inbo" type="text" name="TenMT" value={meothi.TenMT} onChange={handleInputChange} required />
                    </Form.Group>
                    <Form.Group controlId="form.Name" className="ib">
                        <Form.Label>Nội dung mẹo thi</Form.Label>
                        <Form.Control className="inbo" type="text" name="NoiDungMT" value={meothi.NoiDungMT} onChange={handleInputChange} />
                    </Form.Group>
                    <Form.Group controlId="form.LoaiLyThuyet" className="ib">
                        <Form.Label className="inline">Tên loại mẹo thi</Form.Label>

                        <br />
                        <Form.Group className="mb-3">
                            <Form.Select aria-label="Default select example" name="idLoaiMT" onChange={handleInputChange} value={meothi.idLoaiMT} required>
                            <option value="" >Vui lòng chọn</option> {loaimeothi.map((item, index) => {
                                    return (
                                        <option key={index} value={item.id}>
                                            {item.TenLoaiMT}
                                        </option>
                                    )
                                })}
                            </Form.Select>
                        </Form.Group>
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
