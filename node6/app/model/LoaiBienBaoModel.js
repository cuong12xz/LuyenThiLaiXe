const DBconnect =require("./DBconnect")
module .exports = new class LoaiBienBaoModel{
    getAll=async()=>{
        try {
            const query="select * from loaibienbao"
            const res= await DBconnect.query(query)
            return res[0];
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
                TenLoaiBB: objData.TenLoaiBB ? objData.TenLoaiBB : "",
                
            }
            const arrValues = [values.TenLoaiBB]
            const query = "insert into loaibienbao(TenLoaiBB)values(?)"
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
               TenLoaiBB:objData.TenLoaiBB?objData.TenLoaiBB:""
            }
            const query = "update loaibienbao set ? where id=?"
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
            const query ="select * from Loaibienbao where id="+id
            const res= await DBconnect.query(query)
            return res[0]
        } catch (error) {
           console.log(error)
        }
    }
    delete = async (id) => {
        try {
            if (!id) {
                return error.push("khong lay dc id")
            }
            const query = "delete from loaibienbao where id=" + id
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