import { Tab, Tabs } from "react-bootstrap"
import React, { useEffect, useState } from "react"

import axios from "axios"
import "./meothi.css"
export default function MeoThi() {
    const [meothi, setMeoThi] = useState([])
    const [loaiMeoThi, setLoaiMeoThi] = useState([])
    useEffect(() => {
        const getData = async () => {
            const response = await axios.get(process.env.REACT_APP_API_HOST + "/a1/meothi")
            const loaimeothiResponse = await axios.get(process.env.REACT_APP_API_HOST + "/a1/loaimeothi")
            setMeoThi(response.data.result)
            setLoaiMeoThi(loaimeothiResponse.data.result)
        }
        getData()
    }, [])
    return (
        <div className="container bg-white">
            <Tabs defaultActiveKey="0" id="uncontrolled-tab-example" className="mb-3 top1">
                {loaiMeoThi.length === 0
                    ? "không có data"
                    : loaiMeoThi.map((iteml, index) => {
                          return (
                              <Tab eventKey={index} key={index} title={iteml.TenLoaiMT} className="bg-light ms-1">
                                  {meothi.map((item, index) => {
                                      if (item.idLoaiMT !== iteml.id) {
                                          return ""
                                      }
                                      return (
                                          <div key={index}>
                                              <h3 className="quendi">{item.TenMT}</h3>
                                              <div className="quendi">{item.NoiDungMT}</div>
                                          </div>
                                      )
                                  })}
                              </Tab>
                          )
                      })}
            </Tabs>
        </div>
    )
}
