const DBconnect =require("./DBconnect")
class LoaiMeoThiModel {
    getAll = async() => {
        try {
            const query = "select * from loaimeothi"
            const res = await DBconnect.query(query)
            return res[0]
        } catch (error) {
            console.log(error);
        }
    }
    insert = async (objData) => {
        var error = []
        if (!objData) {
            return error.push("loi da ta")
        }
        try {
            if (error.length > 0) {
                return { success: false, message: "du lieu khong hop le", error }
            }
            const values = {
                TenLoaiMT: objData.TenLoaiMT ? objData.TenLoaiMT : "",
                
            }
            const arrValues = [values.TenLoaiMT]
            const query = "insert into LoaiMeoThi(TenLoaiMT)values(?)"
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
            return error.push("du lieu sai")
        }
        try {
            if (error.length > 0) return { success: false, message: "du lieu khong hop le", error }
            const values = {
               TenLoaiMT:objData.TenLoaiMT?objData.TenLoaiMT:""
            }
            const query = "update loaimeothi set ? where id=?"
            const response = await DBconnect.query(query, [values, objData.id])
            if (!response || !response[0] || response[0].affectedRows === 0) {
                return { success: false, message: "sua thong tin that bai" }
            }
            return { success: true, message: "sua thanh cong" }
        } catch (error) {
            return { success: false, message: error.message }
        }
    }
    getDetail=async(id)=>{
        try {
            const query ="select * from Loaimeothi where id="+id
            const res= await DBconnect.query(query)
            return res[0]
        } catch (error) {
           console.log(error)
        }
    }
    getSeach = async (ten) => {
        try {
            const query = "select * from loaimeothi where loaimeothi.tenloaiMT like ?"
            const res = await DBconnect.query(query, `%${ten}%`)
            return res[0]
        } catch (error) {
            console.log(error)
        }
    }
}
module.exports = new LoaiMeoThiModel()