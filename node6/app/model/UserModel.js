const DBconnect = require("./DBconnect")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
module.exports = new (class UserModel {
    constructor() {
        this.user = "nguoidung"
    }
    getAll = async () => {
        try {
            const query = `select * from ${this.user}  `
            const res = await DBconnect.query(query)
            return res[0]
        } catch (error) {
            console.log(error)
        }
    }
    add = async (objData) => {
        if (Object.keys(objData).length === 0 ) {
            return { success: false, message: "du lieu khong hop le" }
        }
        var errors = []
        if (!objData) {
            return errors.push("Du lieu khong hop lệ")
        }
        if (!objData.HoTen) {
            errors.push("Họ tên không được để trống")
        }
        if (!objData.Email) {
            errors.push("Email không được bỏ trống")
        }
        if (
            !String(objData.Email)
                .toLowerCase()
                .match(
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                )
        ) {
            errors.push("Email không hợp lệ")
        }
        // if (String(objData.Password).trim().length < 6) {
        //     errors.push("Password phải lớn hơn 6 ký tự")
        // }
        try {
            const arrGetAccountResult = await DBconnect.query("select * from nguoidung where  Email = ? Limit 1", [objData.Email])
            if (arrGetAccountResult.length === 0) return { success: false, message: "Lỗi hệ thống" }
            if (arrGetAccountResult[0].length > 0) return { success: false, message: "Email đã tồn tại" }
            //format
            const salt = bcrypt.genSaltSync(process.env.BCRYPT_SALT_ROUNDS * 1)
            const hash = bcrypt.hashSync(objData.Password, salt)
            const hashedPassword = hash
            const values = {
                HoTen: objData.HoTen,
                Email: objData.Email,
                Password: hashedPassword,
            }
         
            const arrValues = [values.HoTen, values.Email, values.Password]
            const query = `insert into nguoidung(HoTen,Email,Password) values(?)`
            const response = await DBconnect.query(query, [arrValues])

            if (response[0].affectedRows > 0) {
                const adfs = process.env.JSON_WEB_TOKEN_SECRET_KEY
                const token = jwt.sign({ Email: objData.Email }, process.env.JSON_WEB_TOKEN_SECRET_KEY, { expiresIn: "24h" })
                return { success: true, message: "Tạo tài khoản thành công", data: [token] }
            }
        } catch (error) {
            return { success: false, message: "Lỗi hệ thống, Vui lòng liên hệ chăm sóc khách hàng.", error: error.message }
        }
    }
    updatesingle =async(objData)=>{
        if (Object.keys(objData).length === 0 && objData.constructor === Object) {
            return { success: false, message: "du lieu khong hop le" }
        }
        var errors = []
        if (!objData) {
            return errors.push("Du lieu khong hop lệ")
        }
        if (!objData.HoTen) {
            errors.push("Họ tên không được để trống")
        }

        if (!objData.Email) {
            errors.push("Email không được bỏ trống")
        }
        if (
            !String(objData.Email)
                .toLowerCase()
                .match(
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                )
        ) {
            errors.push("Email không hợp lệ")
        }
        if (String(objData.Password).trim().length < 6) {
            errors.push("Password phải lớn hơn 6 ký tự")
        }
        try {
            const arrGetAccountResult = await DBconnect.query("select * from nguoidung where  Email = ? Limit 1", [objData.Email])
            if (arrGetAccountResult.length === 0) return { success: false, message: "Lỗi hệ thống" }
            if (arrGetAccountResult[0].length > 0) return { success: false, message: "Email đã tồn tại" }
            //format
            const salt = bcrypt.genSaltSync(process.env.BCRYPT_SALT_ROUNDS * 1)
            const hash = bcrypt.hashSync(objData.Password, salt)
            const hashedPassword = hash
            const values = {
                HoTen: objData.HoTen,
                Email: objData.Email,
                Password: hashedPassword,
            }
            const arrValues = [values.HoTen, values.Email, values.Password]
            const query = `update nguoidung set ? where id=?`
            const response = await DBconnect.query(query, [arrValues,objData.id])
            if (response[0].affectedRows > 0) {
                const adfs = process.env.JSON_WEB_TOKEN_SECRET_KEY
                const token = jwt.sign({ Email: objData.Email }, process.env.JSON_WEB_TOKEN_SECRET_KEY, { expiresIn: "24h" })
                return { success: true, message: "Tạo tài khoản thành công", data: [token] }
            }
        } catch (error) {
            return { success: false, message: "Lỗi hệ thống, Vui lòng liên hệ chăm sóc khách hàng.", error: error.message }
        }
    }
    login = async (objDataUser) => {
        if (Object.keys(objDataUser).length === 0) {
            return { success: false, message: "du lieu khong hop le" }
        }
        if (
            !String(objDataUser.Email)
                .toLowerCase()
                .match(
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                )
        ) {
            return { success: false, message: "email khong hop le" }
        }
        if (String(objDataUser.Password).trim().length < 6) {
            return { success: false, message: "mat khau khong hop le" }
        }
        try {
            const query = "select * from nguoidung where Email = ? limit 1"
            const result = await DBconnect.query(query, objDataUser.Email)
            if (!result[0] || result[0].length === 0) {
                return { success: false, message: "Đăng nhập không thành công,Email hoặc mật khẩu không chính xác" }
            }

            const objUserInfo = result[0][0]
            if (Object.keys(objUserInfo).length === 0 && objUserInfo.constructor === Object) {
                return { success: false, message: "du lieu khong hop le" }
            }
            const isValidPassword = bcrypt.compareSync(objDataUser.Password, objUserInfo.Password)
            if (!isValidPassword) {
                return { success: false, message: "Đăng nhập không thành công,Email hoặc mật khẩu không chính xác" }
            }
            // nếu có Remember thì giữ đăng nhập 1 tháng, nếu không có thì giữ đăng nhập 1 ngày
            const token = jwt.sign({ Email: objUserInfo.Email, lv: objUserInfo.lv }, process.env.JSON_WEB_TOKEN_SECRET_KEY, {
                expiresIn: objDataUser.Remember === 1 ? 60 * 60 * 24 * 30 : "24h",
            })
            delete objUserInfo.Password
            return { success: true, message: "Đăng nhập thanh cong", data: [{ ...objUserInfo, token }] }
        } catch (error) {
            return { success: false, message: "loi he thong" }
        }
    }
    getDetail = async (objData) => {
        try {
            var strWhere = this._buildWhereQuery(objData)
            const query = `select * from ${this.user} ${strWhere} limit 1`
            const res = await DBconnect.query(query)

            return res[0]
        } catch (error) {
            console.log(error)
        }
    }
    _buildWhereQuery = (objData) => {
        var strWhere = " where 1=1 "
        if (objData.id) {
            strWhere += ` and ${this.user}.id = ${objData.id}`
        }
        if (objData.Email) {
            strWhere += ` and ${this.user}.Email = ${objData.Email}`
        }

        return strWhere
    }
    update = async (objData) => {
        var error = []
        if (!objData) {
            return error.push("du lieu sai")
        }
        try {
            if (error.length > 0) return { success: false, message: "du lieu khong hop le", error }
            const values = {
                HoTen: objData.HoTen ? objData.HoTen : "",
                Email: objData.Email ? objData.Email : "",
                lv: objData.lv ? 1 : 0,
            }
            const query = "update nguoidung set ? where id=?"
            const response = await DBconnect.query(query, [values, objData.id])
            if (!response || !response[0] || response[0].affectedRows === 0) {
                return { success: false, message: "sua thong tin nguoi dung that bai" }
            }
            return { success: true, message: "sua thanh cong" }
        } catch (error) {
            return { success: false, message: error }
        }
    }
    delete = async (objData)=>{
        try {
            // var strWhere = this._buildWhereQuery(objData)
            // const query =`delete from ${this.user} ${strWhere}}`
            const query = "delete from nguoidung where id="+objData
            const res= await DBconnect.query(query)
            if (!res || !res[0] || res[0].affectedRows === 0) {
                return { success: false, message: "xoa thong tin nguoi dung that bai" }
            }
            return { success: true, message: "xoa thanh cong" }
        } catch (error) {
            return {success:false,message:error.message}
        }
    }
    themNguoiDung = async (objData) => {
        if (Object.keys(objData).length === 0 && objData.constructor === Object) {
            return { success: false, message: "du lieu khong hop le" }
        }
        var errors = []
        if (!objData) {
            return errors.push("Du lieu khong hop lệ")
        }
        if (!objData.HoTen) {
            errors.push("Họ tên không được để trống")
        }

        if (!objData.Email) {
            errors.push("Email không được bỏ trống")
        }
        if (
            !String(objData.Email)
                .toLowerCase()
                .match(
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                )
        ) {
            errors.push("Email không hợp lệ")
        }
        // if (String(objData.Password).trim().length < 6) {
        //     errors.push("Password phải lớn hơn 6 ký tự")
        // }
        try {
            const arrGetAccountResult = await DBconnect.query("select * from nguoidung where  Email = ? Limit 1", [objData.Email])
            if (arrGetAccountResult.length === 0) return { success: false, message: "Lỗi hệ thống" }
            if (arrGetAccountResult[0].length > 0) return { success: false, message: "Email đã tồn tại" }
            //format
            const salt = bcrypt.genSaltSync(process.env.BCRYPT_SALT_ROUNDS * 1)
            const hash = bcrypt.hashSync(objData.Password, salt)
            const hashedPassword = hash
            const values = {
                HoTen: objData.HoTen,
                Email: objData.Email,
                Password: hashedPassword,
                lv: objData.lv ? 1 : 0,
            }
            const arrValues = [values.HoTen, values.Email, values.Password,values.lv]
            const query = `insert into nguoidung(HoTen,Email,Password,lv) values(?)`
            const response = await DBconnect.query(query, [arrValues])
            if (response[0].affectedRows > 0) {
               
                return { success: true, message: "Tạo tài khoản thành công" }
            }
        } catch (error) {
            return { success: false, message: "Lỗi hệ thống, Vui lòng liên hệ chăm sóc khách hàng.", error: error.message }
        }
    }
})()
