import axios from "axios"
import React, { useEffect, useState } from "react"
import { Button, Container, Form, Table } from "react-bootstrap"
import "./LoaiLyThuyet.css"
const rowth = ["Mã", "Tên Loại Lý Thuyết", "Hiệu chỉnh"]
export default function DanhSachLoaiLyThuyet() {
    const [loailythuyet, setLoaiLyThuyet] = useState([])
    useEffect(() => {
        const getDataName = async () => {
            const response = await axios.get(process.env.REACT_APP_API_HOST + "/a1/loailythuyet")
            setLoaiLyThuyet(response.data.result)
        }
        getDataName()
    }, [])
    return (
        <div className="list">
            <Button className="butto" variant="success">
                <a href="them">Thêm loại lý thuyết </a>
            </Button>{" "}
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
                    {loailythuyet.length === 0
                        ? "khong co de nao"
                        : loailythuyet.map((item, index) => {
                              return (
                                  <tr>
                                      <td>{item.id}</td>
                                      <td>{item.TenLoaiLT}</td>

                                      <td>
                                          <Button className="butto" variant="success">
                                              <a href={`/admin/loailythuyet/sua?id=${item.id}`} key={item.id}>
                                                  Sửa loại lý thuyết
                                              </a>
                                          </Button>
                                      </td>
                                  </tr>
                              )
                          })}
                </tbody>
            </Table>
        </div>
    )
}
