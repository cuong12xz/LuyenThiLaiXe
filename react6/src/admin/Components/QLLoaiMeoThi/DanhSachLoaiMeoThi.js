import axios from "axios"
import React, { useEffect, useState } from "react"
import { Button, Container, Form, Stack, Table } from "react-bootstrap"
import { useSearchParams } from "react-router-dom"
import "./LoaiMeoThi.css"
const rowth = ["Mã", "Tên Loại Mẹo Thi", "Hiệu chỉnh"]
export default function DanhSachLoaiMeoThi() {
    const [loaimeothi, setLoaiMeoThi] = useState([])
    useEffect(() => {
        const getDataName = async () => {
            const response = await axios.get(process.env.REACT_APP_API_HOST + "/a1/loaimeothi")
            setLoaiMeoThi(response.data.result)
        }
        getDataName()
    }, [])
    const [searchParams, setSearchParams] = useSearchParams()
    //search
    const fetchDataSearch = async (keyword) => {
        const response = await axios.get(process.env.REACT_APP_API_HOST + "/a1/timkiemloaimeothi", { params: { keyword: keyword } })
        setLoaiMeoThi(response.data.result)
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
        <div className="list">
            <Button className="butto" variant="success">
                <a href="them">Thêm loại mẹo thi </a>
            </Button>{" "}
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
                    {loaimeothi.length === 0
                        ? "khong co de nao"
                        : loaimeothi.map((item, index) => {
                              return (
                                  <tr>
                                      <td>{item.id}</td>
                                      <td>{item.TenLoaiMT}</td>

                                      <td>
                                          <Button className="butto" variant="success">
                                              <a href={`/admin/loaimeothi/sua?id=${item.id}`} key={item.id}>
                                                  Sửa loại mẹo thi
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
