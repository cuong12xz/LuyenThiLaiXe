import React from "react"
import DanhSachBienBao from "./DanhSachBienBao"
import SuaBienBao from "./SuaBienBao"
import ThemBienBao from "./ThemBienBao"

export default function QLBienBao({ action }) {
    var result
    switch (action) {
        case "danhsach":
            result = <DanhSachBienBao />
            break
        case "them":
            result = <ThemBienBao />
            break
        case "sua":
            result = <SuaBienBao />
            break
        default:
            break
    }

    return result
}
