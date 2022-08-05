import React from "react"
import DanhSachLoaiMeoThi from "./DanhSachLoaiMeoThi"

import SuaLoaiMeoThi from "./SuaLoaiMeoThi"
import ThemLoaiMeoThi from "./ThemLoaiMeoThi"

export default function QLLoaiMeoThi({ action }) {
    var result
    switch (action) {
        case "danhsach":
            result = <DanhSachLoaiMeoThi />
            break
        case "them":
            result = <ThemLoaiMeoThi />
            break
        case "sua":
            result = <SuaLoaiMeoThi />
            break
        default:
            break
    }

    return result
}
