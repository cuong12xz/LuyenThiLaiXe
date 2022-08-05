import axios from "axios"
import React, { useEffect, useRef, useState } from "react"
import { CloseButton, Container, Form, ListGroup, Modal, Overlay, OverlayTrigger, Stack, Table, Toast, ToastContainer, Tooltip } from "react-bootstrap"
import Button from "react-bootstrap/esm/Button"
import { useSearchParams } from "react-router-dom"
import "./dethi.css"

export default function ChiTietDeThi() {
    const [thongbao, setThongBao] = useState({ show: false, message: "", success: false })
    const [searchParams, setSearchParams] = useSearchParams() //2
    const [cauhoidethi, setCauHoiDeThi] = useState([]) //1

    const [loaiLyThuyet, setLoaiLyThuyet] = useState([]) //6
    const getDataCauHoiDeThi = async () => {
        let idDT = searchParams.get("id")
        const response = await axios.get(process.env.REACT_APP_API_HOST + "/a1/cauhoidethi", { params: { idDeThi: idDT } })
        setCauHoiDeThi(response.data.result)
    }
    const fetchLoaiLyThuyet = async () => {
        const response = await axios.get(process.env.REACT_APP_API_HOST + "/a1/loailythuyet")
        setLoaiLyThuyet(response.data.result)
    }
    useEffect(() => {
        fetchLoaiLyThuyet() //t3
        getDataCauHoiDeThi() //t1
    }, [])
    const [idLoaiLT, setIdLoaiLT] = useState(
        [] //searchParams.get("idLoaiLT")
    ) //9//14
    const handleLoaiLyThuyetClick = (idLoaiLT) => {
        //11//a4
        setSearchParams({ id: searchParams.get("id"), idLoaiLT }) //t4
        setIdLoaiLT(idLoaiLT)
    }
    const [excauhoidethi, setExCauHoiDeThi] = useState([]) //12
    const getDataEx = async () => {
        let idDT = searchParams.get("id")
        const response = await axios.get(process.env.REACT_APP_API_HOST + "/a1/exchdt", { params: { idDT: idDT, idLoaiLT: idLoaiLT } })
        setExCauHoiDeThi(response.data.result)
    }
    useEffect(() => {
        //a5

        getDataEx()
    }, [idLoaiLT]) //10
    const [showRelate, setShowRelate] = useState({ show: false, index: -1 }) //16
    const handleCauHoiClick = async (e, item) => {
        let id = searchParams.get("id")
        const response = await axios.post(process.env.REACT_APP_API_HOST + "/a1/themchdt", { idCH: item.id, idDT: id })
        setThongBao(() => {
            if (response) {
                return { show: true, message: response.data.message, success: response.data.success }
            }
            return { thongbao }
        })
        getDataEx()
        getDataCauHoiDeThi()
        setShowRelate((e) => ({ ...e, show: !e.show }))
    }
    const handleCauHoiUpdateClick = async (e, idCHMoi, idCHCu) => {
        let id = searchParams.get("id")
        var arrAs = { idCHCu: idCHCu, idCHMoi: idCHMoi, idDT: id }
        const response = await axios.put(process.env.REACT_APP_API_HOST + "/a1/suachdt", arrAs)
        setThongBao(() => {
            if (response) {
                return { show: true, message: response.data.message, success: response.data.success }
            }
            return thongbao
        })
        getDataEx()
        getDataCauHoiDeThi()
        setShowRelate((e) => ({ ...e, show: !e.show }))
    }
    const handleLoadRelate = async () => {
        //a3
        setShowRelate({ show: !showRelate.show, index: -2 }) //t2
    }
    const [target, setTarget] = useState({ show: false, message: "", id: "" })

    const handleCauHoiDeThiClickDelete = (id) => {
        setTarget(() => {
            return { show: true, id: id }
        })
    }
    const handleClose = () => {
        setTarget(() => {
            return { show: false }
        })
    }
    const handleDeleteAccept = async () => {
        const response = await axios.delete(process.env.REACT_APP_API_HOST + "/a1/xoacauhoidethi", { params: { id: target.id } })
        setTarget(() => {
            return { show: false }
        })
        setThongBao(() => {
            if (response) return { show: true, message: response.data.message, success: response.data.success }
            return thongbao
        })
        getDataCauHoiDeThi()
    }
    const [cauhoirandom, setCauHoiRanDom] = useState([])
    const handleCauHoiClickRanDom = async () => {
        let id = searchParams.get("id")
        const response = await axios.post(process.env.REACT_APP_API_HOST + "/a1/themrandomchdt", { question: cauhoirandom, idDT: id })
        setThongBao(() => {
            if (response) return { show: true, message: response.data.message, success: response.data.success }
            return thongbao
        })

        getDataCauHoiDeThi()
    }
    useEffect(() => {
        const getDataName = async () => {
            const response = await axios.get(process.env.REACT_APP_API_HOST + "/a1/randomchdt")
            setCauHoiRanDom(response.data.result)
        }
        getDataName()
    }, [])
    console.log("====================================")
    console.log(cauhoidethi)
    console.log("====================================")
   
    //search
    const fetchDataSearch = async (keyword) => {
        let idDT = searchParams.get("id")
        const response = await axios.get(process.env.REACT_APP_API_HOST + "/a1/timkiemexcauhoi", { params: { keyword: keyword,idDT:idDT ,idLoaiLTL:idLoaiLT} })
        setExCauHoiDeThi(response.data.result)
    }
    useEffect(() => {
        const keyword = searchParams.get("keyword")
        fetchDataSearch(keyword)
    }, [searchParams])
    const handleSearch = (e) => {
        const params = new URLSearchParams({ [e.target.name]: e.target.value })
        setSearchParams(params)
    }
    return (
        <div className="dethibag">
            <OverlayTrigger
                trigger="click"
                show={showRelate.show && showRelate.index === -2}
                // key={"themcauhoi"}
                placement="right"
                overlay={
                    <div className="themsua">
                        <tr>
                            <td>
                                <Stack direction="horizontal" gap={1}>
                                    <tr>
                                        <td>
                                            <Form.Control
                                                className="me-auto"
                                                type="text"
                                                name="keyword"
                                                onChange={(e) => {
                                                    setTimeout(() => {
                                                        handleSearch(e)
                                                    }, 1000)
                                                }}
                                                placeholder="Add your item here..."
                                            />
                                        </td>
                                        <td>
                                            <Button variant="secondary">Submit</Button>
                                        </td>
                                    </tr>
                                </Stack>
                            </td>
                            <td style={{ float: "right", top: "0px" }}>
                                <CloseButton className="bg-black" style={{ height: "50px" }} onClick={handleLoadRelate}>
                                    X
                                </CloseButton>
                            </td>
                        </tr>
                        <div className="d-flex overlay-container chitiet">
                            <div className="overlay-left">
                                <ul>
                                    {loaiLyThuyet &&
                                        loaiLyThuyet.length > 0 &&
                                        loaiLyThuyet.map((loai, index) => {
                                            return (
                                                <li key={index} onClick={() => handleLoaiLyThuyetClick(loai.id)}>
                                                    {" "}
                                                    {loai.TenLoaiLT}{" "}
                                                </li>
                                            )
                                        })}
                                </ul>
                            </div>
                            <div className="overlay-right">
                                <ul>
                                    {excauhoidethi &&
                                        excauhoidethi.length > 0 &&
                                        excauhoidethi.map((item, index) => {
                                            return (
                                                <li key={index} onClick={(e) => handleCauHoiClick(e, item)}>
                                                    {" "}
                                                    {item.NoiDungCH}{" "}
                                                </li>
                                            )
                                        })}
                                </ul>
                            </div>
                        </div>
                    </div>
                }>
                {
                    <Button variant="success" style={{ width: "auto" }} hidden={cauhoidethi.length >= 25 ? true : false} onClick={handleLoadRelate}>
                        Thêm câu hỏi
                    </Button>
                }
            </OverlayTrigger>
            <Button
                variant="success"
                style={{ width: "auto", marginLeft: "20px" }}
                hidden={cauhoidethi.length >= 25 ? true : false}
                onClick={handleCauHoiClickRanDom}>
                Thêm câu hỏi tự động
            </Button>

            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th style={{ backgroundColor: "blueviolet" }}>STT</th>
                        <th style={{ backgroundColor: "blueviolet" }}>ID Đề Thi</th>
                        <th style={{ backgroundColor: "blueviolet" }}>ID Câu Hỏi</th>
                        <th style={{ backgroundColor: "blueviolet" }}>
                            Nội dung câu hỏi
                            <ToastContainer position="top-end" className="p-3">
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
                        </th>
                        <th style={{ backgroundColor: "blueviolet" }}>Hiệu chỉnh</th>
                    </tr>
                </thead>
                <tbody>
                    {cauhoidethi &&
                        cauhoidethi.map((item, index) => {
                            return (
                                <tr>
                                    <td>{item.stt ? item.stt : ""}</td>
                                    <td>{item.idDT ? item.idDT : ""}</td>
                                    <td>{item.idCH ? item.idCH : ""}</td>
                                    <td>{item.NoiDungCH ? item.NoiDungCH : ""}</td>
                                    <td>
                                        <OverlayTrigger
                                            trigger="click"
                                            show={showRelate.show && showRelate.index === index}
                                            key={index}
                                            placement="left"
                                            overlay={
                                                <div className="d-flex overlay-container chitiet">
                                                    <div className="overlay-left">
                                                        <ul>
                                                            {loaiLyThuyet.length > 0 &&
                                                                loaiLyThuyet.map((loai, index) => {
                                                                    return (
                                                                        <li key={index} onClick={() => handleLoaiLyThuyetClick(loai.id)}>
                                                                            {" "}
                                                                            {loai.TenLoaiLT}{" "}
                                                                        </li>
                                                                    )
                                                                })}
                                                        </ul>
                                                    </div>
                                                    <div className="overlay-right">
                                                        <ul>
                                                            {excauhoidethi &&
                                                                excauhoidethi.length > 0 &&
                                                                excauhoidethi.map((item1, index) => {
                                                                    return (
                                                                        <li key={index} onClick={(e) => handleCauHoiUpdateClick(e, item1.id, item.idCH)}>
                                                                            {" "}
                                                                            {item1.NoiDungCH}{" "}
                                                                        </li>
                                                                    )
                                                                })}
                                                        </ul>
                                                    </div>
                                                    <CloseButton className="bg-black" style={{ height: "50px" }} onClick={handleLoadRelate}>
                                                        X
                                                    </CloseButton>
                                                </div>
                                            }>
                                            <Button onClick={() => setShowRelate({ show: !showRelate.show, index })}>Sửa</Button>
                                        </OverlayTrigger>
                                        <Button className="butto" variant="success" onClick={(e) => handleCauHoiDeThiClickDelete(item.stt)}>
                                            Xóa câu hỏi
                                        </Button>
                                    </td>
                                </tr>
                            )
                        })}
                </tbody>
            </Table>
            <Modal show={target.show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Xóa câu hỏi</Modal.Title>
                </Modal.Header>
                <Modal.Body>Bạn có chắc muốn xóa nó không</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleDeleteAccept}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}
