const DBconnect = require("./DBconnect")
module.exports = new (class DeThiModel {
    getAll = async (params) => {
        var strWhere = "where 1=1 "
        //de where co nghia
        if (params && params.idDeThi) {
            strWhere += " and dethi.id =" + params.idDeThi
        }
        try {
            const query = "SELECT dethi.*, cauhoidethi.idCH, cauhoidethi.idDT, cauhoidethi.id stt, cauhoi.NoiDungCH from dethi JOIN cauhoidethi on dethi.id=cauhoidethi.idDT JOIN cauhoi on cauhoidethi.idCH= cauhoi.id " + strWhere
            const res = await DBconnect.query(query)
            return res[0]
        } catch (error) {
            console.log(error)
        }
    }
    get1detail = async (id) => {
        try {
            const query = "select * from dethi where id=" + id
            const res = await DBconnect.query(query)
            return res[0]
        } catch (error) {
            console.log(error)
        }
    }
    getDetail = async (id) => {
        try {
            const query =
            "select * from dethi left join cauhoidethi on dethi.id=cauhoidethi.idDT left join cauhoi on \
            cauhoi.id=cauhoidethi.idCH where dethi.id =" +id
            const res = await DBconnect.query(query)
            return res[0]
        } catch (error) {}
    }
    getDeThiM = async () => {
        try {
            const query = "SELECT *from dethi"
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
            if (!objData.TenDT) {
                error.push("Noi dung khong duoc bo trong.")
            }
            if (error.length > 0) {
                return { success: false, message: "du lieu khong hop le", error }
            }
            const values = {
                TenDT: objData.TenDT ? objData.TenDT : "",
            }
            const arrValues = [values.TenDT]
            const query = "insert into Dethi(TenDT) values(?)"
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
            if (!objData.TenDT) {
                error.push("Noi dung khong duoc bo trong.")
            }
            if (error.length > 0) {
                return { success: false, message: "du lieu khong hop le", error }
            }
            const values = {
                TenDT: objData.TenDT ? objData.TenDT : "",
            }
            const query = "UPDATE `dethi` SET ? WHERE dethi.id= ?"
            const response = await DBconnect.query(query, [values, objData.id]) // mảng bên trong có một cái mảng nữa ko là trong có sẽ ? ? nữa
            //kết quả mà rỗng thì return
            if (!response || !response[0] || response[0].affectedRows === 0) {
                return { success: false, message: "sua de thi that bai" }
            }
            return { success: true, message: "sua de thi thanh cong" }
        } catch (error) {
            return { success: false, message: error }
        }
    }
    insertCauHoiDeThi = async (objData) => {
        var error = []
        if (!objData) {
            return error.push("loi da ta")
        }
        try {
            if (!objData.idCH || !objData) {
                error.push("Noi dung khong duoc bo trong.")
            }
            if (error.length > 0) {
                return { success: false, message: "du lieu khong hop le", error }
            }
            const values = {
                idDT: objData.idDT ? objData.idDT : "",
                idCH: objData.idCH ? objData.idCH : "",
            }
            const arrValues = [values.idDT, values.idCH]
            const query = "insert into cauhoidethi(idDT,idCH)values(?)"
            const response = await DBconnect.query(query, [arrValues])
            if (!response || !response[0] || response[0].affectedRows === 0) {
                return { success: false, message: "Them That bai" }
            }
            return { success: true, message: "Them cau hoi trong de thi thanh cong" }
        } catch (error) {
            return { success: false, message: "loi he Thong" }
        }
    }
    updateCauHoiDeThi = async (objData) => {
        var error = []
        if (!objData) {
            return error.push("loi da ta")
        }
        try {
            if (!objData.idCHCu || !objData.idCHMoi || !objData) {
                error.push("Noi dung khong duoc bo trong.")
            }
            if (error.length > 0) {
                return { success: false, message: "du lieu khong hop le", error }
            }
            const query = " UPDATE `cauhoidethi` SET `idCH` = ? WHERE `cauhoidethi`.`idCH` = ? AND `cauhoidethi`.`idDT` = ? "
            const response = await DBconnect.query(query, [objData.idCHMoi, objData.idCHCu, objData.idDT])
            if (!response || !response[0] || response[0].affectedRows === 0) {
                return { success: false, message: "Sua That bai" }
            }
            return { success: true, message: "Sua cau hoi trong de thi thanh cong" }
        } catch (error) {
            return { success: false, message: error.message }
        }
    }
    deletecauhoi = async (id) => {
        try {
            if(!id)return error.push("khong lay dc id")

            const query = "DELETE FROM `cauhoidethi` WHERE id=" + id
            const res = await DBconnect.query(query)
            if(!res||!res[0]||res[0].affectedRows===0){return {success:false,message:"Xóa thất bại"}}
            return {success:true,message:'Xóa thành công'}
        } catch (error) {return {success:false,message:"loi he thong"}}
    }
    delete = async (id) => {
        try {
            const remove = await DBconnect.query("delete from cauhoidethi where idDT = ?" , id)
            const query = "DELETE FROM `dethi` WHERE id=" + id
            const res = await DBconnect.query(query)
            return res[0]
        } catch (error) {
            return {success:false,message:"loi he thong"}
        }
    }
    randomdiemliet =async ()=>{
        try {
            const query ="(select * from cauhoi where caudiemliet=1 order by rand() limit 5) union (select * from cauhoi where caudiemliet=0 order by rand() limit 20)"
            const res = await DBconnect.query(query)
            return res[0]
        } catch (error) {
            console.log(error);
        }
    }
    insertrandom =async (objData)=>{
        var error = []
        if (!objData) {
            return error.push("loi da ta")
        }
        try {
            if (!objData.idDT || !objData) {
                error.push("Noi dung khong duoc bo trong.")
            }
            if (error.length > 0) {
                return { success: false, message: "du lieu khong hop le", error }
            }
            const arrCauHoi = objData.question
            const arrValues = []
            for (let index = 0; index < arrCauHoi.length; index++) {
                const arrItem = [objData.idDT, arrCauHoi[index].id] // [id de thi, id cauhoi]
                arrValues.push(arrItem)
            }
            const query = `insert into cauhoidethi(idDT, idCH) values ?`
            const result = await DBconnect.query(query, [arrValues])
            if(!result || !result[0]) {
                throw new Error('ket noi that bai')
            }
            if(result[0].affectedRows === 0) {
                return { success: false, message: "them that bai" }
            }
            return { success: true, message: "Them cau hoi trong de thi thanh cong" }
        } catch (error) {
            return { success: false, message: error.message}
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
})
