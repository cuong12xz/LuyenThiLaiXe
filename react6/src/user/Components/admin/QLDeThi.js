import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Container, Form, Table } from 'react-bootstrap'
import './1.css'
const rowth =["Mã","Tên Đề thi"]
    

export default function QLDeThi() {
    const [qldethi,setQLDeThi] =useState([])
    useEffect(()=>{
        const getDataName=async ()=>{
        const response =await axios.get(process.env.REACT_APP_API_HOST + "/a1/")
        setQLDeThi(response.data.result)
        }
        getDataName()
    },[])
  return (
      <div style={{marginTop:"50px"}}>
           <Button className="butto"variant="success">Thêm đề thi</Button>{' '}
        <Table striped bordered hover size="sm">
        <thead>
            <tr>
                {
                    rowth.length===0?"khong co du dong nao":
                    rowth.map((item,index)=>{
                        return (<th key={index}>{item}</th>)
                    })
                }
            
            </tr>
        </thead>
        <tbody>
            {
                qldethi.length===0?"khong co de nao":
                qldethi.map((item,index)=>{
                    return(
                    <tr >
                        <td>{item.id}</td>
                        <td>{item.TenDT}</td>
                        
                    </tr>)
                })
            }
            
            
        </tbody>
        </Table>
    </div>
  )
}
