import React from "react"
import DanhSachNguoiDung from "./DanhSachNguoiDung"
import SuaNguoiDung from "./SuaNguoiDung"
import ThemNguoiDung from "./ThemNguoiDung"

export default function QLNguoiDung({ action }) {
    var result
    switch (action) {
        case "danhsach":
            result = <DanhSachNguoiDung />
            break
        case "sua":
            result = <SuaNguoiDung />
            break
            case"them":
            result=<ThemNguoiDung/>
            break
        default:
            break
    }
    return result
}
