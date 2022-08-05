import axios from "axios"
import React, { useEffect, useState } from "react"
import { Button, Container, Form, Table } from "react-bootstrap"
const rowth = ["Mã", "Tên Đề thi", "Hiệu chỉnh"]

export default function DanhSachDeThi() {
    const [dethi, setDeThi] = useState([])
    useEffect(() => {
        const getDataName = async () => {
            const response = await axios.get(process.env.REACT_APP_API_HOST + "/a1/dethi")
            setDeThi(response.data.result)
        }
        getDataName()
    }, [])
    const handleDeThiClick = (id) => {
        const getDeleteId = async () => {
            const response = await axios.delete(process.env.REACT_APP_API_HOST + "/a1/xoadethi", { params: {id} })
            setDeThi(response.data.result)
        }
        // const getDataName = async () => {
        //     const response = await axios.get(process.env.REACT_APP_API_HOST + "/a1/dethi")
        //     setDeThi(response.data.result)
        // }
        getDeleteId()
        // getDataName()
    }
    return (
        <div className="list listdethi">
            <Button className="butto" variant="success">
                <a href="them" className="widthbutton">
                    Thêm đề thi{" "}
                </a>
            </Button>{" "}
            <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        {rowth.length === 0
                            ? "khong co du dong nao"
                            : rowth.map((item, index) => {
                                  return <th key={index} >{item}</th>
                              })}
                    </tr>
                </thead>
                <tbody>
                    {dethi&&dethi.length !== 0
                        ?  dethi.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>{item.id}</td>
                                    <td>{item.TenDT}</td>
                                    <td>
                                        <Button className="butto" variant="success">
                                            <a href={`/admin/dethi/chitietdethi?id=${item.id}`} key={item.id}>
                                                Các câu trong đề
                                            </a>
                                        </Button>
                                        <Button className="butto" variant="success">
                                            <a href={`/admin/dethi/sua?id=${item.id}`} key={item.id}>
                                                Sửa Đề Thi
                                            </a>
                                        </Button>
                                        <Button className="butto" variant="success" onClick={(e)=>handleDeThiClick(item.id)}>
                                        <a href={`/admin/dethi/danhsach`}>Xóa</a>
                                        </Button>
                                    </td>
                                </tr>
                            )
                        })
                        : "ko co đe thi"}
                </tbody>
            </Table>
        </div>
    )
}
