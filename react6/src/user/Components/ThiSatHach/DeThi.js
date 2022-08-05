import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './DeThi.css'
export default function DeThi() {
    const [dethi,setDeThi]=useState([])
    useEffect(()=>{
        const getData=async()=>{
            const response = await axios.get(process.env.REACT_APP_API_HOST+"/a1/dethi")
            setDeThi(response.data.result)
        }
        getData()
    },[])
  return (
    <div class="container bg-white" style={{}}>
        <div className='padding5px'>
		    <div><h1 class="text-center">PHẦN MỀM THI THỬ BẰNG LÁI XE A1 ONLINE 2022</h1></div>
		    <div className="row">
		<div class="col-md-4 col-sm-12 col-xs-12 margin1">
			<div class="panel panel-default border1 " id="blockA">
            <div class="panel-body">
            <div style={{marginBottom:"10px"}}>
						<strong style={{fontSize: "12pt", color: "blue"}}>
							Các đề thi có trong 200 câu hỏi thi bằng lái A1
						</strong>						
					</div>
			<p style={{textAlign: "center"}} className="hathi"></p>
			<p style={{textAlign: "justify"}}>Để ôn tập phần thi lý thuyết bằng lái xe A1 học viên có thể sử dụng trực tiếp phần mềm thi bằng lái xe A1 online do Trung Tâm xây dựng chính thức áp dụng từ <b style={{color:"red"}}>21/08/2022.</b></p> 
            <p style={{textAlign: "justify"}}>Bộ phần mềm đề thi này được tổng hợp đầy đủ từ <strong>200 câu hỏi sát hạch lái xe A1 </strong> do Tổng Cục Đường Bộ Việt Nam ban hành.</p>
			<p style={{textAlign: "justify"}}>Chỉ cần có kết nối mạng Wifi,3G,4G,5G là bạn có thể sử dụng ứng dụng, phù hợp với các loại phương tiện hiện tại như: laptop, điện thoại, iphone, ipad, máy tính bảng, điện thoại chạy Android,Samsung, điện thoại Nokia...</p>
			<p style={{textAlign: "justify"}}>Chúc quý học viên thi tốt, nếu có khó khăn gì trong quá trình học, hãy để lại bình luận để chúng tôi có thể hỗ trợ bạn !</p>
		  </div>					
			</div>					
			
			
		</div>
	
		<div class="col-md-8 col-sm-12 col-xs-12 border1">
			<div class="panel panel-default" id="blockD">
                <div class="panel-body"> 
					<div>
                        <p style={{textAlign: "justify"}}>Cấu trúc bộ đề thi sát hạch giấy phép lái xe hạng A1 sẽ bao gồm 
                            <strong>25 câu hỏi</strong>, mỗi câu hỏi chỉ có <strong>duy nhất 1 đáp trả lời đúng</strong>. Khác hẳn với bộ đề thi luật cũ là 2 đáp án. Mỗi đề thi chúng tôi sẽ bố trí từ 
                            <strong> 2 - 4 câu hỏi điểm liệt</strong> để học viên có thể làm quen và ghi nhớ, tránh việc làm sai câu hỏi liệt.
                        </p>
                            <ul style={{textAlign: "justify"}}>
                                <li>Số lượng câu hỏi: <strong><span style={{color: "#ff0000"}}>25 Câu</span></strong>.</li>
                                <li>Yêu cầu làm đúng <span style={{color: "#ff0000"}}><strong>21/25 Câu</strong></span>.</li>
                                <li>Thời gian: <span style={{color: "#ff0000"}}><strong>19 Phút</strong></span>.</li>
                            </ul>
                                <p style={{textAlign: "justify"}}><strong>Lưu ý đặc biệt:</strong> 
                                    <span style={{color: "#0000ff"}}>Tuyệt đối không được làm sai câu hỏi điểm liệt, vì trong kỳ thi thật nếu học viên làm sai "
                                    <strong>Câu Điểm Liệt</strong>" đồng nghĩa với việc "<strong>KHÔNG ĐẠT</strong>" dù cho các câu khác trả lời đúng!</span>
                                </p>
                <div>
                    <div style={{marginBottom:"10px"}}>
                        <strong style={{fontsize: "16px", color: "red"}}>
                            Chọn đề thi để luyện:
                        </strong>
                    </div>
                    <div>
                        {}
                        <strong style={{fontSize: "16px"}}>
                            {
                                dethi.length=== 0?"khong co de thi":
                                dethi.map((item,index )=>{
                                    return (
                                        <a  class="btn btn-suc btn-thongtin" name="chondethi" value="de1" href={`/thisathach/chitietdethi?id=${item.id}`}>{item.TenDT}</a>

                                    )
                                })

                            }
                        </strong>
                    </div>
                </div>
                <div style={{marginBottom:"10px"}}>
                        <strong style={{color: "red"}}>
                            Luyện thêm: <a href="https://hoclaixemoto.com/20-cau-hoi-diem-liet-a1/" class="btn btn-suc btn-thongtin2" role="button" aria-pressed="true" target="_blank" rel="noopener">20 Câu Hỏi Liệt A1</a>


                        </strong>
                </div>
            </div>
		        </div>						
			</div>
		</div>
		
			
	
		
	        </div>
        </div>
	</div>
  )
}
