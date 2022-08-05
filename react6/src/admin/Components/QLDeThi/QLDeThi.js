import React from "react"

import DanhSachDeThi from "./DanhSachDeThi"
import Hai from "../QLCauHoi/Hai"
import ThemDeThi from "./ThemDeThi"
import ChiTietDeThi from "./ChiTietDeThi"
import SuaDeThi from "./SuaDeThi"

export default function QLDeThi({ action }) {
    var result
    switch (action) {
        case "danhsach":
            result = <DanhSachDeThi />
            break
        case "them":
            result = <ThemDeThi />
            break
        case "sua":
            result = <SuaDeThi />
            break
        case "chitietdethi":
            result = <ChiTietDeThi />
            break
        default:
            break
    }

    return result
}
