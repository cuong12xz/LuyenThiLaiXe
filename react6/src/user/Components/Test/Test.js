import axios from 'axios'
import React, { useEffect, useState } from 'react'

export default function Test() {
    const [bienbao, setBienBao] = useState([])
    
    useEffect(() => {
        const getData = async () => {
            const response = await axios.get(process.env.REACT_APP_API_HOST + "/a1/test")
            
            setBienBao(response.data.result)
           
        }
        getData()
    }, [])
  return (
    <div>
      sa
        {
          bienbao.map((item,index)=>{
            return(
              <div>
              {item.TenBB}
              loai
              {item.TenLoaiBB}
              </div>
            )
          })
       }
        
    </div>
  )
}
