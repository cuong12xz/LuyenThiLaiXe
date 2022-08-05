import axios from "axios"
import React, { useEffect, useState } from "react"
import { Container, Figure, Form, Toast, ToastContainer } from "react-bootstrap"
import Button from "react-bootstrap/esm/Button"
import './BienBao.css'
const initbienbao = { TenBB: "" }
export default function ThemBienBao() {
    const [bienbao, setBienBao] = useState(initbienbao)
    const [thongbao, setThongBao] = useState({ show: false, message: "", success: false })
    const [loaibienbao, setLoaiBienBao] = useState([])
    useEffect(() => {
        const getDataName = async () => {
            const response = await axios.get(process.env.REACT_APP_API_HOST + "/a1/loaibienbao")
            setLoaiBienBao(response.data.result)
        }
        getDataName()
    }, [])
    const handleInputChange = (e) => {
        setBienBao({ ...bienbao, [e.target.name]: e.target.value }) //... để rải hết dữ liệu trong câu hỏi
    }
    const [file, setFile] = useState()
    const handleSubmit = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append("filebb", file)

        const arrKey = Object.keys(bienbao)
        // console.log(arrKey)
        for (let index = 0; index < arrKey.length; index++) {
            formData.append(arrKey[index], bienbao[arrKey[index]])
        }
        const response = await axios.post(process.env.REACT_APP_API_HOST + "/a1/thembienbao", formData)
        setThongBao(() => {
            if (response) {
                return { show: true, message: response.data.message, success: response.data.success }
            }
            return { ...thongbao }
        })
    }
    const handleImageChange = (event) => {
        var selectedFile = event.target.files[0]

        var imgtag = document.getElementById("outImage")
        imgtag.title = selectedFile.name

        var reader = new FileReader()
        reader.onload = function (event) {
            imgtag.src = event.target.result
        }

        reader.readAsDataURL(selectedFile)
    }

    const saveFile = (e) => {
        handleImageChange(e)
        setFile(e.target.files[0])
    }
    return (
        <div className="bag">
            <Container>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="form.Name" className="ib">
                        <Form.Label>Tên biển báo</Form.Label>
                        <Form.Control className="inbo" type="text" name="TenBB" value={bienbao.TenBB} onChange={handleInputChange} required />
                    </Form.Group>
                    <Form.Group controlId="form.Name" className="ib">
                        <Form.Label>Nội dung biển báo</Form.Label>
                        <Form.Control className="inbo" type="text" name="NoiDungBB" value={bienbao.NoiDungBB} onChange={handleInputChange} />
                    </Form.Group>
                    <Form.Group controlId="form.Image" className="ib">
                        <tr>
                            <td>
                                <Form.Label className="inline">Hình ảnh</Form.Label>
                            </td>

                            <td className="inline2">
                                <Form.Control type="file" name="HinhAnhBB" onChange={saveFile} />

                                <Figure>
                                    <Figure.Image style={{ maxWidth: "300px", height: "auto" }} alt="" id="outImage" src="" />
                                </Figure>
                            </td>
                        </tr>
                    </Form.Group>
                    <Form.Group controlId="form.LoaiBienBao" className="ib">
                        <Form.Label className="inline">Tên loại biển báo</Form.Label>

                        <br />
                        <Form.Group className="mb-3">
                            <Form.Select aria-label="Default select example" required name="idLoaiBB" onChange={handleInputChange} value={bienbao.idLoaiBB}>
                                <option value="" >Vui lòng chọn</option>
                                {loaibienbao.map((item, index) => {
                                    return (
                                        <option key={index} value={item.id}>
                                            {item.TenLoaiBB}
                                        </option>
                                    )
                                })}
                            </Form.Select>
                        </Form.Group>
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
                        <strong className="me-auto">Thong bao</strong>
                        <small className="text-muted">just now</small>
                    </Toast.Header>
                    <Toast.Body>{thongbao.message}</Toast.Body>
                </Toast>
            </ToastContainer>
        </div>
    )
}
