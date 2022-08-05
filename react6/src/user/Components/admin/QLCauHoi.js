import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Container, Form, Table } from 'react-bootstrap'
import './1.css'
const rowth =["Mã","Nội dung câu hỏi","Hình ảnh","Đáp án Đúng","Đáp án A","Đáp án B","Đáp án C","Đáp án D","Giải thích","Loại lý thuyết","Câu Diểm Liệt","Loại bàng lái"]


export default function QLDeThi() {
    const [qlcauhoi,setQLCauHoi] =useState([])
    useEffect(()=>{
        const getDataName=async ()=>{
        const response =await axios.get(process.env.REACT_APP_API_HOST + "/a1/cauhoi")
        setQLCauHoi(response.data.result)
        }
        getDataName()
    },[])
  return (
      <div style={{marginTop:"50px"}}>
           <Button className="butto"variant="success">Thêm câu hỏi</Button>{' '}
        <Table striped bordered hover size="sm">
        <thead>
            <tr>
                {
                    rowth.length===0?"khong co ten thuoc tinh nao":
                    rowth.map((item,index)=>{
                        return (<th key={index}>{item}</th>)
                    })
                }
            
            </tr>
        </thead>
        <tbody>
            {
                qlcauhoi.length===0?"khong co de nao":
                qlcauhoi.map((item,index)=>{
                    return(
                    <tr >
                        <td>{item.id}</td>
                        <td>{item.NoiDungCH}</td>
                        <td>{item.HinhAnh}</td>
                        <td>{item.DapAnDung}</td>
                        <td>{item.DapAnA}</td>
                        <td>{item.DapAnB}</td>
                        <td>{item.DapAnC}</td>
                        <td>{item.DapAnD}</td>
                        <td>{item.GiaThich}</td>
                        <td>{item.idLoai}</td>
                        <td>{item.CauDiemLiet}</td>
                        <td>{item.LoaiBangLai}</td>
                        
                    </tr>)
                })
            }
            
            
        </tbody>
        </Table>
    </div>
  )
}
