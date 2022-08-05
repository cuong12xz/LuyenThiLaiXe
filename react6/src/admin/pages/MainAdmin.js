import React from "react"
import { useParams } from "react-router-dom"
import QLBienBao from "../Components/QLBienBao/QLBienBao"
import QLCauHoi from "../Components/QLCauHoi/QLCauHoi"
import QLDeThi from "../Components/QLDeThi/QLDeThi"
import QLLoaiBienBao from "../Components/QLLoaiBienBao/QLLoaiBienBao"
import QLLoaiLyThuyet from "../Components/QLLoaiLyThuyet/QLLoaiLyThuyet"
import QLLoaiMeoThi from "../Components/QLLoaiMeoThi/QLLoaiMeoThi"
import QLMeoThi from "../Components/QLMeoThi/QLMeoThi"
import QLNguoiDung from "../Components/QLNguoiDung/QLNguoiDung"
import Sidebar from "../layout/Sidebar/Sidebar"
import Denied from "./Denied"
export const MainAdmin = () => {
    const { page, inpage } = useParams()
    var body
    switch (page) {
        case "cauhoi":
            body = <QLCauHoi action={inpage} />
            break
        case "dethi":
            body = <QLDeThi action={inpage} />
            break
        case "meothi":
            body = <QLMeoThi action={inpage} />
            break
        case "bienbao":
            body = <QLBienBao action={inpage} />
            break
        case "loaimeothi":
            body = <QLLoaiMeoThi action={inpage} />
            break
        case "loaibienbao":
            body = <QLLoaiBienBao action={inpage} />
            break
        case "nguoidung":
            if(localStorage.getItem("LEVEL") < 2) {
                body = <Denied />
            }else
            body = <QLNguoiDung action={inpage} />
            break
        case "loailythuyet":
            body = <QLLoaiLyThuyet action={inpage} />
            break
        default:
            break
    }
    return (
        <div className="d-flex">
            <Sidebar />
            {body}
        </div>
    )
}
