const DBconnect = require("./DBconnect")

module.exports=new class LoaiLyThuyetModel{
    getAll=async()=>{
        try{
            const query="select *from loailythuyet"
            const res=await DBconnect.query(query)
            return res[0]
        }catch(error){
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
                TenLoaiLT: objData.TenLoaiLT ? objData.TenLoaiLT : "",
                
            }
            const arrValues = [values.TenLoaiLT]
            const query = "insert into LoaiLyThuyet(TenLoaiLT)values(?)"
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
               TenLoaiLT:objData.TenLoaiLT?objData.TenLoaiLT:""
            }
            const query = "update loailythuyet set ? where id=?"
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
            const query ="select * from loailythuyet where id="+id
            const res= await DBconnect.query(query)
            return res[0]
        } catch (error) {
           console.log(error)
        }
    }
}