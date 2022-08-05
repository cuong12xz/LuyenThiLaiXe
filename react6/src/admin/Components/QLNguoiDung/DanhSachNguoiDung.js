import axios from "axios"
import React, { useEffect, useState } from "react"
import { Button, Modal, Table, Toast } from "react-bootstrap"
import "./NguoiDung.css"
const rowth = ["Mã", "Họ Tên", "Email", "Level", "Hiệu chỉnh"]
export default function DanhSachNguoiDung() {
    const [nguoidung, setNguoiDung] = useState([])
    useEffect(() => { }, [])
        const getDataName = async () => {
            const response = await axios.get(process.env.REACT_APP_API_HOST + "/user/nguoidung")
            setNguoiDung(response.data.result)
        }
        getDataName()
   
   
    const [target,setTarget]=useState({show:false,message:"",id:""})
    const [thongbao,setThongBao]=useState({show:false,message:"",success:false})
    const handleNguoiDungClickDelete = (id) => {
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
        const response = await axios.delete(process.env.REACT_APP_API_HOST + "/user/xoanguoidung", { params: { id: target.id } })

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
                <a href="them">Thêm người dùng</a>
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
                    {nguoidung.length === 0
                        ? "khong co nguoi dung nao"
                        : nguoidung.map((item, index) => {
                              return (
                                  <tr key={index}>
                                      <td>{item.id}</td>
                                      <td>{item.HoTen}</td>
                                      <td>{item.Email}</td>
                                      <td>{item.lv}</td>
                                      <td>
                                          <Button className="butto" variant="success">
                                              <a href={`/admin/nguoidung/sua?id=${item.id}`} key={item.id}>
                                                  Sửa người dùng
                                              </a>
                                          </Button>
                                          <Button className="butto" variant="success" onClick={(e) => handleNguoiDungClickDelete(item.id)}>
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
                    <Modal.Title>Xóa tk nguoi dung</Modal.Title>
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
