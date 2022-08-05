import React from "react";
import QLCauHoi from "../Components/QLCauHoi/QLCauHoi";
import DanhSachNguoiDung from "../Components/QLNguoiDung/DanhSachNguoiDung";
import Navbar from "./Navbar/Navbar";
import Sidebar from "./Sidebar/Sidebar";

export default function Home() {
  return (
    <div className="d-flex">
      <Sidebar />
      <DanhSachNguoiDung/>
    </div>

  );
}