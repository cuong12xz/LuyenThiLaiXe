import axios from 'axios'
import React, { useState } from 'react'
import { Toast, ToastContainer } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import './Register.css'
const initDangKy = { HoTen: "", Email: "",Password:"" }
export default function SuaTaiKhoan() {

	const [dangky, setDangKy] = useState(initDangKy)
	const [thongbao, setThongBao] = useState({ show: false, message: "", success: false })
	const handleSubmit = async (e) => {
        e.preventDefault()
		var isValid = true
		if(dangky.Password!==dangky.Repassword)
		{
			isValid =  false
		}
		setThongBao(() => {
            if (!isValid) {
                return { show: true, message: "Mat khong trung", success:false }
            }
            return { ...thongbao }
        })
		if(!isValid) return
        const response = await axios.post(process.env.REACT_APP_API_HOST + "/user/logon", dangky)
        setThongBao(() => {
            if (response) {
                return { show: true, message: response.data.message, success: response.data.success }
            }
            return { ...thongbao }
        })
		if(response.data.success){
            navigate("/dangnhap?success=true")
        }
    }
	const handleInputChange = (e) => {
		
        setDangKy({ ...dangky, [e.target.name]: e.target.value }) //... để rải hết dữ liệu trong câu hỏi
    }
	console.log(dangky);
	const navigate = useNavigate()
  return (
    <div className='bodyin'>
    <div class="wrapper overlay">
		<h1>Sửa thông tin tài khoản</h1>
		<div class="main-agileinfo">
			<div class="agileits-top">
				<form action="#" method="post"onSubmit={handleSubmit}>
                    
                        <div class="leftfloat">Họ Tên:</div>
					<input class="text" type="text" name="HoTen" placeholder="HoTen" required="" value={dangky.HoTen} onChange={handleInputChange}/>
                    <div class="leftfloat">Email</div>
					<input class="text email" type="email" name="Email" placeholder="Email" required="" value={dangky.Email} onChange={handleInputChange}/>
                    <div class="leftfloat">Password</div>
					<input class="text" type="password" name="Password" placeholder="Password" required="" value={dangky.Password} onChange={handleInputChange}/>
                    <div class="leftfloat">Confirm Password</div>
					<input class="text mr2em" type="password" name="Repassword" placeholder="Confirm Password" required=""  value={dangky.Repassword}onChange={handleInputChange}/>
					<div class="wthree-text">
						<label class="anim">
							<input type="checkbox" class="checkbox" required=""/>
							<span>I Agree To The Terms & Conditions</span>
						</label>
						<div class="clear"> </div>
					</div>
					<input type="submit" value="SIGNUP" href="/dangnhap"/>
				</form>
				<p>Don't have an Account? <a href="/dangnhap"> Login Now!</a></p>
			</div>
		</div>
		
		
		
		<ul class="colorlib-bubbles">
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
		</ul>
	</div>
	<ToastContainer position="top-end" className="p-3" >
                <Toast
                    bg={thongbao.success ? "success" : "danger"}
                    onClose={() => setThongBao({ ...thongbao, show: false })}
                    show={thongbao.show}
                    delay={3000}
                    autohide>
                    <Toast.Header>
                        <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
                        <strong className="me-auto">Thong bao</strong>
                        <small className="text-muted">just now</small>
                    </Toast.Header>
                    <Toast.Body>{thongbao.message}</Toast.Body>
                </Toast>
            </ToastContainer>
	</div>
    
  )
}
