import axios from "axios"
import React, { useEffect, useState } from "react"
import { Container, Figure, Form, Toast, ToastContainer } from "react-bootstrap"
import Button from "react-bootstrap/esm/Button"
import { useSearchParams } from "react-router-dom"

const initCauHoi = { NoiDungCH: "", GiaiThich: "" }
export default function SuaCauHoi() {
    const [lythuyet, setLyThuyet] = useState([])
    useEffect(() => {
        const getDataName = async () => {
            const response = await axios.get(process.env.REACT_APP_API_HOST + "/a1/loailythuyet")
            console.log(response)

            setLyThuyet(response.data.result)
        }
        getDataName()
    }, [])
    const [check, setCheck] = useState([])
    const [cauhoi, setCauHoi] = useState(initCauHoi)
    const [thongBao, setThongBao] = useState({ show: false, message: "", success: false })
    const handleInputChange = (e) => {
        setCauHoi((cauhoi) => {
            if (e.target.name === "CauDiemLiet" || e.target.name === "a1" || e.target.name === "a2" || e.target.name === "b2") {
                console.log(cauhoi)
                return { ...cauhoi, [e.target.name]: e.target.checked }
            } else {
                return { ...cauhoi, [e.target.name]: e.target.value }
            }
        }) //... để rải hết dữ liệu trong câu hỏi
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append("file", file)
        const arrKey = Object.keys(cauhoi)  
        for(let index=0;index<arrKey.length; index++)
        formData.append(arrKey[index],cauhoi[arrKey[index]])
        const response = await axios.put(process.env.REACT_APP_API_HOST + "/a1/suacauhoi", formData)
        setThongBao(() => {
            if (response) {
                return { show: true, message: response.data.message, success: response.data.success }
            }
            return { ...thongBao }
        })
    }
    const [searchParams, setSearchParams] = useSearchParams()
    useEffect(() => {
        const getDataName = async () => {
            let id = searchParams.get("id")
            const response = await axios.get(process.env.REACT_APP_API_HOST + "/a1/chitietcauhoi", { params: { id: id } })
            console.log(response)
            setCauHoi(response.data.result[0])
        }
        getDataName()
    }, [])

    const handleImageChange = (event) => {
        var selectedFile = event.target.files[0]
        var reader = new FileReader()

        var imgtag = document.getElementById("outImage")
        imgtag.title = selectedFile.name

        reader.onload = function (event) {
            imgtag.src = event.target.result
        }

        reader.readAsDataURL(selectedFile)
    }
    const [file, setFile] = useState()
    const [fileName, setFileName] = useState("")

    const saveFile = (e) => {
        handleImageChange(e)
        setFile(e.target.files[0])
    }

   console.log(cauhoi);

    return (
        <div className="cauhoibag">
            <h1>Sửa câu hỏi</h1>
            <ToastContainer position="top-end" className="p-3">
                <Toast
                    bg={thongBao.success ? "success" : "danger"}
                    onClose={() => setThongBao({ ...thongBao, show: false })}
                    show={thongBao.show}
                    delay={3000}
                    autohide>
                    <Toast.Header>
                        <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
                        <strong className="me-auto">Thong bao</strong>
                        <small className="text-muted">just now</small>
                    </Toast.Header>
                    <Toast.Body>{thongBao.message}</Toast.Body>
                </Toast>
            </ToastContainer>
            <Container>
                <Form onSubmit={handleSubmit}>
                    <table>
                        <tr>
                            <td>
                                <Form.Label className="inline">Nội dung:</Form.Label>
                            </td>

                            <td className="inline2">
                                <Form.Control
                                    type="text"
                                    name="NoiDungCH"
                                    value={cauhoi.NoiDungCH}
                                    onChange={handleInputChange}
                                    style={{ width: "100vh" }}
                                    required
                                />
                            </td>
                        </tr>

                        <tr>
                            <td>
                                <Form.Label className="inline">Hình ảnh</Form.Label>
                            </td>
                            <td className="inline2">
                                <Form.Control type="file" name="HinhAnh" onChange={saveFile} />
                                <Figure>
                                    <Figure.Image
                                        style={{ maxWidth: "300px", height: "auto", maxHeight: "300px" }}
                                        alt=""
                                        id="outImage"
                                        src={`${process.env.REACT_APP_API_HOST}/images/${cauhoi.HinhAnh}`}
                                    />
                                </Figure>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <Form.Label className="inline">Đáp án đúng</Form.Label>
                            </td>
                            <td className="inline2">
                                <Form.Group className="mb-3">
                                    <Form.Select
                                        aria-label="Default select example"
                                        name="DapAnDung"
                                        onChange={handleInputChange}
                                        value={cauhoi.DapAnDung}
                                        required>
                                        <option value="">Chọn đáp án</option>
                                        <option value="A">Đáp Án A</option>
                                        <option value="B">Đáp Án B</option>
                                        <option value="C">Đáp Án C</option>
                                        <option value="D">Đáp Án D</option>
                                    </Form.Select>
                                </Form.Group>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <Form.Label className="inline">Đáp án A</Form.Label>
                            </td>
                            <td className="inline2">
                                <Form.Control type="text" name="DapAnA" value={cauhoi.DapAnA} onChange={handleInputChange} />
                            </td>
                        </tr>

                        <tr>
                            <td>
                                <Form.Label className="inline">Đáp án B</Form.Label>
                            </td>
                            <td className="inline2">
                                <Form.Control type="text" name="DapAnB" value={cauhoi.DapAnB} onChange={handleInputChange} />
                            </td>
                        </tr>

                        <tr>
                            <td>
                                <Form.Label className="inline">Đáp án C</Form.Label>
                            </td>
                            <td className="inline2">
                                <Form.Control type="text" name="DapAnC" value={cauhoi.DapAnC} onChange={handleInputChange} />
                            </td>
                        </tr>

                        <tr>
                            <td>
                                <Form.Label className="inline">Đáp án D</Form.Label>
                            </td>
                            <td className="inline2">
                                <Form.Control type="text" name="DapAnD" value={cauhoi.DapAnD} onChange={handleInputChange} />
                            </td>
                        </tr>

                        <tr>
                            <td>
                                <Form.Label className="inline">Giải thích</Form.Label>
                            </td>
                            <td className="inline2">
                                <Form.Control type="text" name="GiaiThich" value={cauhoi.GiaiThich} onChange={handleInputChange} />
                            </td>
                        </tr>

                        <tr>
                            <td>
                                <Form.Label className="inline">Tên loại lý thuyết</Form.Label>
                            </td>
                            <td className="inline2">
                                <Form.Group className="mb-3">
                                    <Form.Select
                                        aria-label="Default select example"
                                        name="idLoaiLT"
                                        onChange={handleInputChange}
                                        value={cauhoi.idLoaiLT}
                                        required>
                                        <option value="">Chọn đáp án</option>
                                        {lythuyet.map((item, index) => {
                                            return (
                                                <option key={index} value={item.id}>
                                                    {item.TenLoaiLT}
                                                </option>
                                            )
                                        })}
                                    </Form.Select>
                                </Form.Group>
                            </td>
                        </tr>

                        <Form.Label className="inline">Câu điểm liệt</Form.Label>
                        <Form.Check aria-label="option 1" label="Là câu điểm liệt" name="CauDiemLiet" checked={cauhoi.CauDiemLiet ? "true" : ""} onChange={handleInputChange} value={cauhoi.CauDiemLiet} />

                        <Form.Label className="inline">Loại bằng lái</Form.Label>
                        <Form.Check aria-label="option 1" label="Bằng lái A1" name="a1" onChange={handleInputChange} value={cauhoi.a1} />
                        <Form.Check aria-label="option 1" label="Bằng lái A2" name="a2" onChange={handleInputChange} value={cauhoi.a2} />
                        <Form.Check aria-label="option 1" label="Bằng lái B2" name="b2" onChange={handleInputChange} value={cauhoi.b2} />

                        <Button variant="primary" className="submitend" size="lg" active type="submit">
                            Cập nhật câu hỏi
                        </Button>
                    </table>
                </Form>
            </Container>
        </div>
    )
}
