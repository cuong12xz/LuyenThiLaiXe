import React from "react"
import DanhSachLoaiBienBao from "./DanhSachLoaiBienBao"
import SuaLoaiBienBao from "./SuaLoaiBienBao"
import ThemLoaiBienBao from "./ThemLoaiBienBao"

export default function QLLoaiBienBao({ action }) {
    var result
    switch (action) {
        case "danhsach":
            result = <DanhSachLoaiBienBao />
            break
        case "them":
            result = <ThemLoaiBienBao />
            break
        case "sua":
            result = <SuaLoaiBienBao />
            break
        default:
            break
    }
    return <div>{result}</div>
}
