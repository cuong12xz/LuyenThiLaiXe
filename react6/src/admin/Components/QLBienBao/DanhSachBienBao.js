import axios from "axios"
import React, { useEffect, useState } from "react"
import { Button, Container, Form, Modal, Table, Toast, ToastContainer } from "react-bootstrap"
const rowth = ["Mã", "Tên Biển Báo", "Nội Dung Biển Báo", "HinhAnhBB", "Hiệu chỉnh"]

export default function DanhSachBienBao() {
    const [bienbao, setBienBao] = useState([])
    useEffect(() => { }, [])
        const getDataName = async () => {
            const response = await axios.get(process.env.REACT_APP_API_HOST + "/a1/bienbao")
            setBienBao(response.data.result)
        }
        getDataName()
   
    const [target,setTarget]=useState({show:false,message:"",id:""})
    const [thongbao,setThongBao]=useState({show:false,message:"",success:false})
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
        const response = await axios.delete(process.env.REACT_APP_API_HOST + "/a1/xoabienbao", { params: { id: target.id } })

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
                <a href="them">Thêm </a>
            </Button>{" "}<ToastContainer position="top-end" className="p-3 fixed-top">
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
                    {bienbao.length === 0
                        ? "khong co de nao"
                        : bienbao.map((item, index) => {
                              return (
                                  <tr>
                                      <td>{item.id}</td>
                                      <td>{item.TenBB}</td>
                                      <td>{item.NoiDungBB}</td>
                                      <td>
                                          {item.HinhAnhBB && (
                                              <img
                                                  src={`${process.env.REACT_APP_API_HOST}/images/bienbao/${item.HinhAnhBB}`}
                                                  alt="hinh"
                                                  style={{ maxWidth: "70px", height: "auto" }}
                                              />
                                          )}
                                      </td>
                                      <td>
                                          <Button className="butto" variant="success">
                                              <a href={`/admin/bienbao/sua?id=${item.id}`} key={item.id}>
                                                  Sửa
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
            </Table><Modal show={target.show} onHide={handleClose}>
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
