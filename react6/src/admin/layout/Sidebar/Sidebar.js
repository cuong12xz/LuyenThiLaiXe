import React from "react"
import { Accordion } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import { logout } from "../../utils/user"
import { CustomToggle } from "./CustomToggle"

import "./Sidebar.css"
const side = [
    {
        id: 1,
        ten: "người dùng",
        tenn: "nguoidung",
        icon: "sa",
    },
    {
        id: 2,
        ten: "câu hỏi",
        tenn: "cauhoi",
        icon: "sa",
    },
    {
        id: 3,
        ten: "đề thi",
        tenn: "dethi",
        icon: "sa",
    },
    {
        id: 4,
        ten: "mẹo thi",
        tenn: "meothi",
        icon: "sa",
    },
    {
        id: 5,
        ten: "biển báo",
        tenn: "bienbao",
        icon: "sa",
    },
    {
        id: 6,
        ten: "loại lý thuyết",
        tenn: "loailythuyet",
    },
    {
        id: 7,
        ten: "loại mẹo thi",
        tenn: "loaimeothi",
    },
    {
        id: 8,
        ten: "loại biển báo",
        tenn: "loaibienbao",
    },
]
export default function Sidebar() {
    const navigate = useNavigate()
    const handleLogout = (e) => {
        e.preventDefault()
        logout()
        navigate("/admin")
    }
    return (
        <>
            <nav id="sidebar">
                <Accordion defaultActiveKey="0">
                    <div className="p-4 pt-5">
                        <h1>
                            <a href="/admin/nguoidung/danhsach" className="logo">
                                UCAN
                            </a>
                        </h1>
                        <ul className="list-unstyled components mb-5">
                            {side.map((item, index) => {
                                if(item.id ===1) {
                                    if(localStorage.getItem("LEVEL") < 2) {
                                        return null
                                    }
                                }
                                return (
                                    <li key={index}>
                                        <CustomToggle eventKey={item.id}>
                                            <span>Quản lý {item.ten} </span>
                                        </CustomToggle>
                                        <Accordion.Collapse eventKey={item.id}>
                                            <>
                                                <Link to={`/admin/${item.tenn}/them`}> Thêm {item.ten}</Link>
                                                <Link to={`/admin/${item.tenn}/danhsach`}> Danh sách {item.ten}</Link>
                                            </>
                                        </Accordion.Collapse>
                                    </li>
                                )
                            })}
                        </ul>

                        <div className="mb-5">
                            <h3 className="h6">Chào Quản trị viên</h3>
                            <CustomToggle>
                                <span>{localStorage.getItem("HOTEN")} </span>
                            </CustomToggle>
                            <Accordion.Collapse>
                                <>
                                    {localStorage.getItem("LOGIN") !== "1" && <Link to={`/admin/dangnhap`}> Đăng nhập </Link>}
                                    {localStorage.getItem("LOGIN") === "1" && (
                                        <Link to={`/admin/dangxuat`} onClick={handleLogout}>
                                            {" "}
                                            Đăng xuất
                                        </Link>
                                    )}
                                </>
                            </Accordion.Collapse>
                            {/* <form action="#" className="colorlib-subscribe-form">
                <div className="form-group d-flex">
                  <div className="icon">
                    <span className="icon-paper-plane"></span>
                  </div>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Email Address"
                  />
                </div>
              </form> */}
                        </div>

                        <div className="footer"></div>
                    </div>
                </Accordion>
            </nav>
        </>
    )
}
