const DBconnect = require("./DBconnect")

class BienBaoModel {
    get = async () => {
        try {
            const query = "select * from bienbao join loaibienbao on loaibienbao.id=bienbao.idLoaiBB"
            const res = await DBconnect.query(query)
            return res[0]
        } catch (error) {
            console.log(error)
        }
    }
    getAll = async () => {
        try {
            const query = "select * from bienbao "
            const res = await DBconnect.query(query)

            return res[0]
        } catch (error) {
            console.log(error)
        }
    }
    get1detail = async (id) => {
        try {
            const query = "select * from bienbao where id=" + id
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
            if (!objData.TenBB) {
                error.push("Noi dung khong duoc bo trong.")
            }
            if (error.length > 0) {
                return { success: false, message: "du lieu khong hop le", error }
            }
            const values = {
                TenBB: objData.TenBB ? objData.TenBB : "",
                NoiDungBB: objData.NoiDungBB ? objData.NoiDungBB : "",
                HinhAnhBB:objData.HinhAnhBB?objData.HinhAnhBB:"",
                idLoaiBB: objData.idLoaiBB ? objData.idLoaiBB : null,
            }
            const arrValues = [values.TenBB, values.NoiDungBB,values.HinhAnhBB, values.idLoaiBB]
            const query = "insert into BienBao(TenBB,NoiDungBB,HinhAnhBB,idLoaiBB)values(?)"
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
            if (!objData.TenBB) {
                error.push("Noi dung khong duoc bo trong.")
            }
            if (error.length > 0) {
                return { success: false, message: "du lieu khong hop le", error }
            }
            const values = {
                TenBB: objData.TenBB ? objData.TenBB : "",
                NoiDungBB: objData.NoiDungBB ? objData.NoiDungBB : "",
                HinhAnhBB:objData.HinhAnhBB?objData.HinhAnhBB:"",
                idLoaiBB: objData.idLoaiBB ? objData.idLoaiBB : null,
            }
            const arrValues = [values.TenBB, values.NoiDungBB,values.HinhAnhBB, values.idLoaiBB]
            const query = "update bienbao set ? where id=?"
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
            const query = "delete from bienbao where id=" + id
            const response =await DBconnect.query(query)
            if (!response || !response[0] || response[0].affectedRows === 0) {
                return { success: false, message: "Xoa That bai" }
            }
            return { success: true, message: "Xoa thanh cong" }
        } catch (error) {
            return { success: false, message: error }
        }
    }
}

module.exports = new BienBaoModel()
