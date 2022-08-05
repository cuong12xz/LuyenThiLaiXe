const DBconnect = require("./DBconnect")

class MeoThiModel {
    getAll = async () => {
        try {
            const query = "select * from meothi "
            const res = await DBconnect.query(query)

            return res[0]
        } catch (error) {
            console.log(error)
        }
    }
    get1detail = async (id) => {
        try {
            const query = "select * from meothi where id=" + id
            const res = await DBconnect.query(query)
            return res[0]
        } catch (error) {
            console.log(error)
        }
    }
    insert = async (objData) => {
        var error = []
        if (!objData) {
            return error.push("loi da ta")
        }
        try {
            if (!objData.TenMT) {
                error.push("Noi dung khong duoc bo trong.")
            }
            if (error.length > 0) {
                return { success: false, message: "du lieu khong hop le", error }
            }
            const values = {
                TenMT: objData.TenMT ? objData.TenMT : "",
                NoiDungMT: objData.NoiDungMT ? objData.NoiDungMT : "",
                idLoaiMT: objData.idLoaiMT ? objData.idLoaiMT : null,
            }
            const arrValues = [values.TenMT, values.NoiDungMT, values.idLoaiMT]
            const query = "insert into MeoThi(TenMT,NoiDungMT,idLoaiMT)values(?)"
            const response = await DBconnect.query(query, [arrValues])
            if (!response || !response[0] || response[0].affectedRows === 0) {
                return { success: false, message: "Them That bai" }
            }
            return { success: true, message: "Them thanh cong" }
        } catch (error) {
            return { success: false, message: "loi he Thong" }
        }
    }
    update = async (objData) => {
        var error = []
        if (!objData) {
            return error.push("loi da ta")
        }
        try {
            if (!objData.TenMT) {
                error.push("Noi dung khong duoc bo trong.")
            }
            if (error.length > 0) {
                return { success: false, message: "du lieu khong hop le", error }
            }
            const values = {
                TenMT: objData.TenMT ? objData.TenMT : "",
                NoiDungMT: objData.NoiDungMT ? objData.NoiDungMT : "",
                idLoaiMT: objData.idLoaiMT ? objData.idLoaiMT : null,
            }
            const arrValues = [values.TenMT, values.NoiDungMT, values.idLoaiMT]
            const query = "update meothi set ? where id=?"
            const response = await DBconnect.query(query, [values, objData.id])
            if (!response || !response[0] || response[0].affectedRows === 0) {
                return { success: false, message: "Sửa That bai" }
            }
            return { success: true, message: "Sửa thanh cong" }
        } catch (error) {
            return { success: false, message: error }
        }
    }
    delete = async (id) => {
        try {
            if (!id) {
                return error.push("khong lay dc id")
            }
            const query = "delete from meothi where id=" + id
            const res=await DBconnect.query(query)
            if (!res || !res[0] || res[0].affectedRows === 0) {
                return { success: false, message: "Xoa That bai" }
            }
            return {success:true,message:"xoa thanh cong"}
        } catch (error) {
            return { success: false, message: error }
        }
    }
}

module.exports = new MeoThiModel()
