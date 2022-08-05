import axios from "axios"
import React, { useEffect, useState } from "react"
import { Button, Container, Form, Modal, Table, Toast, ToastContainer } from "react-bootstrap"
import "./MeoThi.css"
const rowth = ["Mã", "Tên Mẹo Thi", "Nội Dung Mẹo Thi", "Tên loại mẹo thi", "Hiệu chỉnh"]
export default function DanhSachMeothi() {
    const [meothi, setMeoThi] = useState([])
    const [loaimeothi, setLoaiMeoThi] = useState([])
    const [target, setTarget] = useState({ show: false, message: "", id: "" })
    const [thongbao, setThongBao] = useState({ show: false, message: "", success: false })
    useEffect(() => {}, [])
    const getDataName = async () => {
        const response = await axios.get(process.env.REACT_APP_API_HOST + "/a1/meothi")
        setMeoThi(response.data.result)
    }
    const getDataLoai = async () => {
        const response = await axios.get(process.env.REACT_APP_API_HOST + "/a1/loaimeothi")
        setLoaiMeoThi(response.data.result)
    }
    getDataLoai()
    getDataName()

    const handleMeoThiClick = (id) => {
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
        const response = await axios.delete(process.env.REACT_APP_API_HOST + "/a1/xoameothi", { params: { id: target.id } })

        setTarget(() => {
            return { show: false }
        })
        setThongBao(() => {
            if (response) {
                return { show: true, message: response.data.message, success: response.data.success }
            }
            return { ...thongbao }
        })
        getDataName()
    }
  
    return (
        <div className="list">
            <Button className="butto" variant="success">
                <a href="them">Thêm mẹo thi </a>
            </Button>{" "}
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
                        
                    </Toast.Header>
                    <Toast.Body>{thongbao.message}</Toast.Body>
                </Toast>
            </ToastContainer>
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        {rowth.length === 0
                            ? "khong co du dong nao"
                            : rowth.map((item, index) => {
                                  return <th key={index}>{item}</th>
                              })}
                    </tr>
                </thead>
                <tbody>
                    {meothi.length === 0
                        ? "khong co de nao"
                        : meothi.map((item, index) => {
                              return (
                                  <tr>
                                      <td>{item.id}</td>
                                      <td>{item.TenMT}</td>
                                      <td>{item.NoiDungMT}</td>
                                      <td>{(loaimeothi.find(e=>e.id===item.idLoaiMT)).TenLoaiMT}</td>
                                      <td>
                                          <Button className="butto" variant="success">
                                              <a href={`/admin/meothi/sua?id=${item.id}`} key={item.id}>
                                                  Sửa mẹo thi
                                              </a>
                                          </Button>
                                          <Button className="butto" variant="success" onClick={(e) => handleMeoThiClick(item.id)}>
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
                    <Modal.Title>Xóa mẹo thi</Modal.Title>
                </Modal.Header>
                <Modal.Body>Bạn có chắc muốn xóa không!</Modal.Body>
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
