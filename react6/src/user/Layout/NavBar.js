import React from "react"
import "../assets/css/bootstrap.min.css"
import "./style.css"
import { NavDropdown, Nav } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
export default function NavBar() {
    const navigate = useNavigate()
    const handleLogout = (e) => {
        e.preventDefault()
        if (localStorage.getItem("LOGIN")) {
            localStorage.clear();
            navigate("/")
        }
    }
    return (
        <nav id="nav-wrap" className="bgcolornav  ">
            <a className="mobile-btn" href="#nav-wrap" title="Show navigation">
                Show navigation
            </a>
            <a className="mobile-btn" href="#home" title="Hide navigation">
                Hide navigation
            </a>
            <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#ContactnavbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <ul id="nav" className="nav displayIB navbar-nav">
                <li className="current">
                    <a className="smoothscroll" href="/">
                        Home
                    </a>
                </li>

                <li className="">
                    <NavDropdown title="Thi sát hạch" id="navbarScrollingDropdown">
                        <NavDropdown.Item className="navbar-dropdown-item" href="/thisathach/a1">
                            A1
                        </NavDropdown.Item>
                        <NavDropdown.Item className="navbar-dropdown-item" href="/thisathach/a1">
                            A2
                        </NavDropdown.Item>
                        <NavDropdown.Item className="navbar-dropdown-item" href="/thisathach/a1">
                            B2
                        </NavDropdown.Item>
                        {/* <NavDropdown.Divider />
                  <NavDropdown.Item href="#action5">
                    Something else here
                  </NavDropdown.Item> */}
                    </NavDropdown>
                </li>
                <li className="">
                    <NavDropdown title="Thi lý thuyết" id="navbarScrollingDropdown">
                        <NavDropdown.Item className="navbar-dropdown-item" href="/hoclythuyet/a1">
                            A1
                        </NavDropdown.Item>
                        <NavDropdown.Item className="navbar-dropdown-item" href="/hoclythuyet/a1">
                            A2
                        </NavDropdown.Item>
                        <NavDropdown.Item className="navbar-dropdown-item" href="/hoclythuyet/a1">
                            B2
                        </NavDropdown.Item>
                    </NavDropdown>
                </li>
                <li className="">
                    <NavDropdown title="Học lý thuyết" id="navbarScrollingDropdown">
                        <NavDropdown.Item className="navbar-dropdown-item" href="/loailythuyet">
                            A1
                        </NavDropdown.Item>
                        <NavDropdown.Item className="navbar-dropdown-item" href="/loailythuyet">
                            A2
                        </NavDropdown.Item>
                        <NavDropdown.Item className="navbar-dropdown-item" href="/loailythuyet">
                            B2
                        </NavDropdown.Item>
                    </NavDropdown>
                </li>
                <li className="">
                    <NavDropdown title="Học biển báo" id="navbarScrollingDropdown">
                        <NavDropdown.Item className="navbar-dropdown-item" href="/bienbao">
                            A1
                        </NavDropdown.Item>
                        <NavDropdown.Item className="navbar-dropdown-item" href="/bienbao">
                            A2
                        </NavDropdown.Item>
                        <NavDropdown.Item className="navbar-dropdown-item" href="/bienbao">
                            B2
                        </NavDropdown.Item>
                    </NavDropdown>
                </li>
                <li className="">
                    <NavDropdown title="Học mẹo thi" id="navbarScrollingDropdown">
                        <NavDropdown.Item className="navbar-dropdown-item" href="/meothi">
                            A1
                        </NavDropdown.Item>
                        <NavDropdown.Item className="navbar-dropdown-item" href="/meothi">
                            A2
                        </NavDropdown.Item>
                        <NavDropdown.Item className="navbar-dropdown-item" href="/meothi">
                            B2
                        </NavDropdown.Item>
                    </NavDropdown>
                </li>
                <li className="">
                    <a className="smoothscroll" href="/huongdan">
                        Hướng dẫn
                    </a>
                </li>
                <li className="">
                    <NavDropdown
                        title={localStorage.getItem("LOGIN") === "1" ? localStorage.getItem("HOTEN") : "Login/Logout"}
                        class="navright"
                        id="navbarScrollingDropdown">
                        {localStorage.getItem("LOGIN") !== "1" && (
                            <NavDropdown.Item className="navbar-dropdown-item" href="/dangnhap">
                                {" "}
                                Đăng nhập{" "}
                            </NavDropdown.Item>
                        )}
                        <NavDropdown.Item className="navbar-dropdown-item" href="/dangky" hidden={localStorage.getItem("LOGIN") !== "1" ? "" : "true"}>
                            Đăng ký
                        </NavDropdown.Item>
                        {localStorage.getItem("LOGIN") === "1" && (
                            <NavDropdown.Item className="navbar-dropdown-item" href="/dangxuat" onClick={handleLogout}>
                                {" "}
                                Đăng xuất
                            </NavDropdown.Item>
                        )}
                    </NavDropdown>
                </li>
            </ul>
        </nav>
    )
}
