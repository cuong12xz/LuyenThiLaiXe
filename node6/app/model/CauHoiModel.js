const DBconnect = require("./DBconnect")
module.exports = new (class CauHoiModel {
    getAll = async () => {
        try {
            const query = "select * from cauhoi "
            const res = await DBconnect.query(query)
            return res[0]
        } catch (error) {
            console.log(error)
        }
    }
    getDetail = async (id) => {
        try {
            const query = "select * from cauhoi where id =" + id
            const res = await DBconnect.query(query)
            return res[0]
        } catch (error) {}
    }
    getExcept = async (data) => {
        try {
            const query = `SELECT cauhoi.* from cauhoi where cauhoi.id not in  (SELECT cauhoidethi.idCH from cauhoidethi WHERE  cauhoidethi.idDT=${data.idDT}) and cauhoi.idLoaiLT = ${data.idLoaiLT} `
            const res = await DBconnect.query(query)
            return res[0]
        } catch (error) {}
    }
    insert = async (objData) => {
        var errors = []
        if (!objData) {
            return errors.push("Du lieu khong hop lệ")
        }
        try {
            if (!objData.NoiDungCH) {
                errors.push("Nội dung không được bỏ trống")
            }
            if (errors.length > 0) {
                return { success: false, message: "du lieu khong hop le", errors }
            }

            var arrLoaiBangLai = []
            if (objData.a1) {
                arrLoaiBangLai.push("A1")
            }

            if (objData.a2) {
                arrLoaiBangLai.push("A2")
            }

            if (objData.b2) {
                arrLoaiBangLai.push("B2")
            }
            var strLoaiBangLai = ""
            if (arrLoaiBangLai.length > 0) {
                strLoaiBangLai = arrLoaiBangLai.join(",")
            }
            const values = {
                TenCH: objData.TenCH ? objData.TenCH : "",
                NoiDungCH: objData.NoiDungCH.trim(),
                DapAnDung: objData.DapAnDung ? objData.DapAnDung : "",
                DapAnA: objData.DapAnA ? objData.DapAnA : "",
                DapAnB: objData.DapAnB ? objData.DapAnB : "",
                DapAnC: objData.DapAnC ? objData.DapAnC : "",
                DapAnD: objData.DapAnD ? objData.DapAnD : "",
                GiaiThich: objData.GiaiThich ? objData.GiaiThich : "",
                idLoaiLT: objData.idLoaiLT ? objData.idLoaiLT : null,
                CauDiemLiet: objData.CauDiemLiet ? 1 : 0,
                LoaiBangLai: strLoaiBangLai,
                HinhAnh: objData.HinhAnh ? objData.HinhAnh : "",
            }
            const arrValues = [
                values.TenCH,
                values.NoiDungCH,
                values.HinhAnh,
                values.DapAnDung,
                values.DapAnA,
                values.DapAnB,
                values.DapAnC,
                values.DapAnD,
                values.GiaiThich,
                values.idLoaiLT,
                values.CauDiemLiet,
                values.LoaiBangLai,
            ]

            const query =
                "insert into cauhoi(TenCH, NoiDungCH,HinhAnh, DapAnDung, DapAnA, DapAnB, DapAnC,DapAnD,\
                GiaiThich, idLoaiLT, CauDiemLiet, LoaiBangLai) values(?)"
            const response = await DBconnect.query(query, [arrValues]) // mảng bên trong có một cái mảng nữa ko là trong códon sẽ ? ? nữa
           
            if (!response || !response[0] || response[0].affectedRows === 0) {
                return { success: false, message: "Them that bai" }
            }
            return { success: true, message: "them thanh cong" }
        } catch (error) {
            return { success: false, message: "loi he thong" }
        }
    }
    delete = async (id) => {
        try {
            if (!id) {
                return error.push("ko lay dc id")
            }
            const query = "DELETE FROM cauhoi WHERE id=" + id
            const res = await DBconnect.query(query)
            return res[0]
        } catch (error) {
            return { success: false, message: error.message }
        }
    }
    update = async (objData) => {
        var errors = []
        if (!objData) {
            return errors.push("Du lieu khong hop lệ")
        }
        try {
            if (errors.length > 0) {
                return { success: false, message: "du lieu khong hop le", errors }
            }

            var arrLoaiBangLai = []
            if (objData.a1) {
                arrLoaiBangLai.push("A1")
            }

            if (objData.a2) {
                arrLoaiBangLai.push("A2")
            }

            if (objData.b2) {
                arrLoaiBangLai.push("B2")
            }
            var strLoaiBangLai = ""
            if (arrLoaiBangLai.length > 0) {
                strLoaiBangLai = arrLoaiBangLai.join(",")
            }
            const values = {
                TenCH: objData.TenCH ? objData.TenCH : "",
                NoiDungCH: objData.NoiDungCH,
                DapAnDung: objData.DapAnDung ? objData.DapAnDung : "",
                DapAnA: objData.DapAnA ? objData.DapAnA : "",
                DapAnB: objData.DapAnB ? objData.DapAnB : "",
                DapAnC: objData.DapAnC ? objData.DapAnC : "",
                DapAnD: objData.DapAnD ? objData.DapAnD : "",
                GiaiThich: objData.GiaiThich ? objData.GiaiThich : "",
                idLoaiLT: objData.idLoaiLT ? objData.idLoaiLT : null,
                CauDiemLiet: objData.CauDiemLiet ? 1 : 0,
                LoaiBangLai: strLoaiBangLai,
                HinhAnh:objData.HinhAnh?objData.HinhAnh:""
            }
            const query = "UPDATE `cauhoi` SET ? WHERE id= ?"
            const response = await DBconnect.query(query, [values, objData.id]) // mảng bên trong có một cái mảng nữa ko là trong có sẽ ? ? nữa
            //kết quả mà rỗng thì return
            if (!response || !response[0] || response[0].affectedRows === 0) {
                return { success: false, message: "Them that bai" }
            }
            return { success: true, message: "sua thanh cong" }
        } catch (error) {
            return { success: false, message: error }
        }
    }
    uploadIMG = async (img) => {}
    getSeach = async (noidung) => {
        try {
            const query = "select * from cauhoi where cauhoi.noidungch like ?"
            const res = await DBconnect.query(query, `%${noidung}%`)
            return res[0]
        } catch (error) {
            console.log(error)
        }
    }
})()
