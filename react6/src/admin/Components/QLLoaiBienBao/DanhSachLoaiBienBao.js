import axios from "axios"
import React, { useEffect, useState } from "react"
import { Button, Container, Form, Modal, Table, Toast } from "react-bootstrap"
import "./LoaiBienBao.css"
const rowth = ["Mã", "Tên Loại Biển Báo", "Hiệu chỉnh"]
export default function DanhSachLoaiBienBao() {
    const [loaibienbao, setLoaiBienBao] = useState([])
    const getDataName = async () => {
        const response = await axios.get(process.env.REACT_APP_API_HOST + "/a1/loaibienbao")
        setLoaiBienBao(response.data.result)
    }
    useEffect(() => {
        getDataName()
    }, [])
    const [target, setTarget] = useState({ show: false, message: "", id: "" })
    const [thongbao, setThongBao] = useState({ show: false, message: "", success: false })
    const handleBienBaoClickDelete = (id) => {
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
        const response = await axios.delete(process.env.REACT_APP_API_HOST + "/a1/xoaloaibienbao", { params: { id: target.id } })

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
                <a href="them">Thêm loại biển báo </a>
            </Button>{" "}
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
                    {loaibienbao.length === 0
                        ? "khong co de nao"
                        : loaibienbao.map((item, index) => {
                              return (
                                  <tr>
                                      <td>{item.id}</td>
                                      <td>{item.TenLoaiBB}</td>

                                      <td>
                                          <Button className="butto" variant="success">
                                              <a href={`/admin/loaibienbao/sua?id=${item.id}`} key={item.id}>
                                                  Sửa loại biển báo
                                              </a>
                                          </Button>
                                          <Button className="butto" variant="success" onClick={(e) => handleBienBaoClickDelete(item.id)}>
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
                    <Modal.Title>Xóa biển báo</Modal.Title>
                </Modal.Header>
                <Modal.Body>Bạn có chắc muốn xóa thật không?</Modal.Body>
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
