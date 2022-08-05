import axios from "axios"
import "./BienBao.css"

import React, { useEffect, useState } from "react"
import { Tab, Tabs } from "react-bootstrap"

export default function BienBao() {
    const [bienbao, setBienBao] = useState([])
    const [loaibienbao, setLoaiBienBao] = useState([])
    useEffect(() => {
        const getData = async () => {
            const response = await axios.get(process.env.REACT_APP_API_HOST + "/a1/bienbao")
            const responseLoai = await axios.get(process.env.REACT_APP_API_HOST + "/a1/loaibienbao")
            setBienBao(response.data.result)
            setLoaiBienBao(responseLoai.data.result)
        }
        getData()
    }, [])
    return (
        <div className="container bg-white">
            <Tabs defaultActiveKey="0" id="uncontrolled-tab-example" className="mb-3 top1">
                {loaibienbao.length === 0
                    ? "không có data"
                    : loaibienbao.map((iteml, index) => {
                          return (
                              <Tab eventKey={index} key={index} title={iteml.TenLoaiBB} className="bg-light ms-1">
                                  <table>
                                      {bienbao.map((item, index) => {
                                          if (item.idLoaiBB !== iteml.id) {
                                              return ""
                                          }
                                          return (
                                              <div key={index}>
                                                  {/* <h3 className="quendi">{item.TenBB}</h3>
                                                  <div className="quendi">{item.NoiDungBB}</div> */}

                                                  <tr>
                                                      <td ><img className="imgbb" src={`${process.env.REACT_APP_API_HOST}/images/bienbao/${item.HinhAnhBB}`} alt="hinh" /></td>
                                                      <td  className="trbb" >
                                                          <div>{item.TenBB}</div>
                                                          <div>{item.NoiDungBB}</div>
                                                      </td>
                                                  </tr>
                                              </div>
                                          )
                                      })}
                                  </table>
                              </Tab>
                          )
                      })}
            </Tabs>
        </div>
    )
}
