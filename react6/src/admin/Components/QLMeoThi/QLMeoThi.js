import React from "react"
import DanhSachMeothi from "./DanhSachMeoThi"
import SuaMeothi from "./SuaMeoThi"
import ThemMeothi from "./ThemMeoThi"

export default function QLMeoThi({ action }) {
    var result
    switch (action) {
        case "danhsach":
            result = <DanhSachMeothi />
            break
        case "them":
            result = <ThemMeothi />
            break
        case "sua":
            result = <SuaMeothi />
            break
        default:
            break
    }

    return result
}
