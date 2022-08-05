import React from "react"
import DanhSachLoaiLyThuyet from "./DanhSachLoaiLyThuyet"

import SuaLoaiLyThuyet from "./SuaLoaiLyThuyet"
import ThemLoaiLyThuyet from "./ThemLoaiLyThuyet"

export default function QLLoaiLyThuyet({ action }) {
    var result
    switch (action) {
        case "danhsach":
            result = <DanhSachLoaiLyThuyet />
            break
        case "them":
            result = <ThemLoaiLyThuyet />
            break
        case "sua":
            result = <SuaLoaiLyThuyet />
            break
        default:
            break
    }

    return result
}
