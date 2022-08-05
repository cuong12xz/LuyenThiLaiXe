import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Container, Form } from 'react-bootstrap'
export default function QLDeThi() {
    const rowth=["Mã","Tên Đề"]
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
    <Container>
      <Form>
          {
              rowth.length===0?"ko co de nao het":
              rowth.map((item,index)=>{
                  return (
                    <Form.Group controlId="form.Name">
                        <Form.Label>{item}</Form.Label>
                    <   Form.Control type="text" placeholder="Enter name" />
                    </Form.Group>
                  )
              })
          }
        {/* <Form.Group controlId="form.Email">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="name@example.com" />
        </Form.Group>
        <Form.Group controlId="form.Textarea">
            <Form.Label>Comment</Form.Label>
            <Form.Control as="textarea" rows={3} />
        </Form.Group> */}
      </Form>
    </Container>
    </div>
  )
}
