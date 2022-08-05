import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Tab, Tabs } from 'react-bootstrap'

export default function LoaiLyThuyet() {
    const [loailythuyet,setLoaiLyThuyet]=useState([])
    const [cauhoi,setCauHoi]=useState([])
    const [dapan,setDapAn]=useState(false)
    const [anwser,setAnswer]=useState([])
    const [question,setQuestion]=useState([])
    const[finish,setFinish]=useState({show:false,index:{}})
    useEffect(()=>{
        const getDataName=async()=>{
            const response = await axios.get(process.env.REACT_APP_API_HOST+"/a1/cauhoi")
            const responseLoai= await axios.get(process.env.REACT_APP_API_HOST+"/a1/loailythuyet")
            setLoaiLyThuyet(responseLoai.data.result)
            setCauHoi(response.data.result)
        }
        getDataName()
    })
    const handleChooseAnwser=(que,anwser)=>{
        setAnswer((as)=>{
            var arrAs={...as}
            arrAs[que.id]={id:que.id,anwser:anwser}
            return arrAs
        })
        console.log('====================================');
        console.log(finish);
        console.log('====================================');
    
       
    }

  return (
    <div className="container bg-white">
            <Tabs defaultActiveKey="0" id="uncontrolled-tab-example" className="mb-3 top1">
                {loailythuyet.length === 0
                    ? "không có data"
                    : loailythuyet.map((iteml, index) => {
                          return (
                              <Tab eventKey={index} key={index} title={iteml.TenLoaiLT} className="bg-light ms-1">
                                  <table>
                                      {cauhoi.map((item, index) => {
                                          if (item.idLoaiLT !== iteml.id) {
                                              return ""
                                          }
                                          return (
                                              <div key={index}>
                                                  <tr>
                                                      <td  className="trbb" >
                                                          <div>{item.NoiDungCH}</div>
                                                          <p><label style={{color:`${finish.show&&finish.index[index]===index&&"DapAnA"==="DapAn"+item.DapAnDung?"green":finish.show&&finish.index[index]===index&&anwser[item.id]&&anwser[item.id].anwser==="DapAnA"?"red":""}`}}><input type="radio" onClick={()=>handleChooseAnwser(cauhoi[index],"DapAnA")} name="lemon"/>A. {item.DapAnA}</label></p>
                                                          <p><label style={{color:`${finish.show&&finish.index[index]===index&&"DapAnB"==="DapAn"+item.DapAnDung?"green":finish.show&&finish.index[index]===index&&anwser[item.id]&&anwser[item.id].anwser==="DapAnB"?"red":""}`}}><input type="radio" onClick={()=>handleChooseAnwser(cauhoi[index],"DapAnB")} name="lemon"/>B. {item.DapAnB}</label></p>
                                                          {item.DapAnC&&<p><label style={{color:`${finish.show&&finish.index[index]===index&&"DapAnC"==="DapAn"+item.DapAnDung?"green":finish.show&&finish.index[index]===index&&anwser[item.id]&&anwser[item.id].anwser==="DapAnC"?"red":""}`}}><input type="radio" onClick={()=>handleChooseAnwser(cauhoi[index],"DapAnC")} name="lemon"/>C. { item.DapAnC}</label></p>}
                                                          {item.DapAnD&&<p><label style={{color:`${finish.show&&finish.index[index]===index&&"DapAnD"==="DapAn"+item.DapAnDung?"green":finish.show&&finish.index[index]===index&&anwser[item.id]&&anwser[item.id].anwser==="DapAnD"?"red":""}`}}><input type="radio" onClick={()=>handleChooseAnwser(cauhoi[index],"DapAnD")} name="lemon"/>D. { item.DapAnD}</label></p>}
                                                            <button onClick={(e)=>setFinish({show:true,index:{...finish.index,[index]: index}} )} hidden={finish.index[index]===index&&finish.show?"true":""}>+Xem đáp án</button>
                                                          <div hidden={finish.index[index]===index&&finish.show?"":"true"}><p>Đáp án đúng là đáp án {item.DapAnDung} vì:</p>
                                                          <p style={{color:"green", fontWeight:"700"}}>{item.GiaiThich}</p></div>
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
