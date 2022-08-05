import axios from "axios"
import React, { useEffect, useState } from "react"
import { Container, Figure, Form, Toast, ToastContainer } from "react-bootstrap"
import Button from "react-bootstrap/esm/Button"
import { useSearchParams } from "react-router-dom"
import './BienBao.css'
const initbienbao = { TenBB: "" }
export default function SuaBienBao() {
    const [bienbao, setBienBao] = useState(initbienbao)
    const [thongbao, setThongBao] = useState({ show: false, message: "", success: false })
    const [loaibienbao,setLoaiBienBao]=useState([])
    useEffect(()=>{
        const getDataName=async ()=>{
            const response=await axios.get(process.env.REACT_APP_API_HOST+"/a1/loaibienbao")
            setLoaiBienBao(response.data.result)
        }
        getDataName()
    },[])
    const handleInputChange = (e) => {
        setBienBao({ ...bienbao, [e.target.name]: e.target.value }) //... để rải hết dữ liệu trong câu hỏi
    }
    
    const [searchParams, setSearchParams] = useSearchParams()
    useEffect(() => {
        const getDataName = async () => {
            let id = searchParams.get("id")
            const response = await axios.get(process.env.REACT_APP_API_HOST + "/a1/1bienbao", { params: { id: id } })
            console.log(response);
            setBienBao(response.data.result[0])
        }
        getDataName()
    }, [])
    const handleSubmit = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append("filebb", file)

        const arrKey = Object.keys(bienbao)
        // console.log(arrKey)
        for (let index = 0; index < arrKey.length; index++) {
            formData.append(arrKey[index], bienbao[arrKey[index]])
        }
        const response = await axios.put(process.env.REACT_APP_API_HOST + "/a1/suabienbao", formData)
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
    const [file, setFile] = useState()

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
                        <Form.Control className="inbo" type="text" name="TenBB" value={bienbao.TenBB} onChange={handleInputChange} />
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
                                        <Figure.Image
                                            
                                            style={{ maxWidth: "300px", height: "auto" }}
                                            alt=""
                                            id="outImage"
                                            src={`${process.env.REACT_APP_API_HOST}/images/bienbao/${bienbao.HinhAnhBB}`}
                                        />
                                    </Figure>
                                </td>
                            </tr>
                        </Form.Group>
                    <Form.Group controlId="form.LoaiBienBao" className="ib">
                            
                                    <Form.Label className="inline">Tên loại biển báo</Form.Label>
                         
                                    <br/>
                                    <Form.Group className="mb-3">
                                        <Form.Select
                                            aria-label="Default select example"
                                            
                                            name="idLoaiBB"
                                            onChange={handleInputChange}
                                            value={bienbao.idLoaiBB} required>
                                                <option value="">Vui lòng chọn</option>
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
                        Sua
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
