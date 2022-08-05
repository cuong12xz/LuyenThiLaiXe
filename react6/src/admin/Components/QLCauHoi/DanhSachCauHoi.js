import axios from "axios"
import React, { useEffect, useState } from "react"
import { Button, Container, Form, Modal, Stack, Table, Toast, ToastContainer } from "react-bootstrap"
import { useSearchParams } from "react-router-dom"

const rowth = [
    "Mã",
    "Nội dung câu hỏi",
    "Hình ảnh",
    "Đáp án Đúng",
    "Đáp án A",
    "Đáp án B",
    "Đáp án C",
    "Đáp án D",
    "Giải thích",
    "Loại lý thuyết",
    "Câu Diểm Liệt",
    "Loại bằng lái",
    "Hiệu chỉnh",
]

export const DanhSachCauHoi = () => {
    const [cauhoi, setCauHoi] = useState([])
    const [target, setTarget] = useState({ show: false, id: "" })
    const [thongbao, setThongBao] = useState({ show: false, message: "", success: false })
    const [searchParams, setSearchParams] = useSearchParams()
    const getDataName = async () => {
        const response = await axios.get(process.env.REACT_APP_API_HOST + "/a1/cauhoi")
        setCauHoi(response.data.result)
    }
    useEffect(()=> {
        getDataName()
    },[])
    const handleTarget = (id) => {
        setTarget(() => {
            return { show: true, id: id }
        })
    }

    const handleClose = () => {
        setTarget((target) => {
            return { ...target, show: false }
        })
    }
    const handleDeleteAccept = async () => {
        const response = await axios.delete(process.env.REACT_APP_API_HOST + "/a1/xoacauhoi", { params: { id: target.id } })
        setTarget(() => {
            return { show: false }
        })
        setThongBao(() => {
            return { show: true, message: response.data.message, success: response.data.success }
        })
        getDataName()
    }

   
    return (
        <div className="list">
            <ToastContainer position="top-end" className="p-3 fixed-top">
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
            <tr>
                <th style={{paddingRight:"50px"}}>
                    <Button className="butto" variant="success">
                        <a href="them">Thêm câu hỏi</a>
                    </Button>
                </th>
                <th>
                    
                </th>
            </tr>

            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        {rowth.length === 0
                            ? "khong co ten thuoc tinh nao"
                            : rowth.map((item, index) => {
                                  return <th key={index}>{item}</th>
                              })}
                    </tr>
                </thead>
                <tbody>
                    {cauhoi.length === 0
                        ? "khong co de nao"
                        : cauhoi.map((item, index) => {
                              return (
                                  <tr key={index}>
                                      <td>{item.id}</td>
                                      <td>{item.NoiDungCH}</td>
                                      <td>{item.HinhAnh && <img src={`${process.env.REACT_APP_API_HOST}/images/${item.HinhAnh}`} alt="hinh" />}</td>
                                      <td>{item.DapAnDung}</td>
                                      <td>{item.DapAnA}</td>
                                      <td>{item.DapAnB}</td>
                                      <td>{item.DapAnC}</td>
                                      <td>{item.DapAnD}</td>
                                      <td>{item.GiaThich}</td>
                                      <td>{item.idLoaiLT}</td>
                                      <td>{item.CauDiemLiet}</td>
                                      <td>{item.LoaiBangLai}</td>
                                      <td>
                                          <Button className="butto" variant="success">
                                              <a href={`/admin/cauhoi/sua?id=${item.id}`} key={item.id}>
                                                  Sửa câu hỏi
                                              </a>
                                          </Button>
                                          <Button className="butto" variant="success" onClick={(e) => handleTarget(item.id)}>
                                              Xóa
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
                <Modal.Body>Bạn có chắc muốn xóa mục này không?</Modal.Body>
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
