const UserModel = require("../model/UserModel")

module.exports = new (class userController {
    getNguoiDung = async (req, res) => {
        try {
            const response = await UserModel.getAll()
            return res.json({ success: true, result: response })
        } catch (error) {
            return res.json({ success: false, error: "loi" })
        }
    }
    logon = async (req, res) => {
        const data = req.body
        if (Object.keys(data).length === 0) {
            return res.json({ success: false, message: "Dữ liệu truyền vào không hợp lệ" })
        }
        const objResult = await UserModel.add(data)
        if (Object.keys(objResult).length === 0) {
            return res.json({ success: false, message: "Có lỗi xảy ra, vui lòng thử lại" })
        }
        return res.json(objResult)
    }
    suaUserSingle=async(req,res)=>{
        const data=req.body
        if(!data) return res.json({success:false,message:"du lieu ko hop le"})
        try {
            const response= await UserModel.updatesingle(data)
            return res.json(response)
        } catch (error) {
            return res.json({success:false,message:error.message})
        }
    }
    login = async (req, res) => {
        const data = req.body
        if (Object.keys(data).length === 0 && data.constructor === Object) {
            return res.json({ success: false, message: "Dữ liệu truyền vào không hợp lệ" })
        }

        const objResult = await UserModel.login(data)

        if (!objResult) {
            return res.json({ success: false, message: "Có lỗi xảy ra, vui lòng thử lại" })
        }

        return res.json(objResult)
    }
    getDetail = async (req, res, next) => {
        const objData = req.query
        if (!objData) {
            return res.json({ success: false, result: [], message: "Tham số không hợp lệ" })
        }
        try {
            const response = await UserModel.getDetail(objData)
            return res.json({ success: true, result: response })
        } catch (error) {
            return res.json({ success: false, error: "loi" })
        }
    }
    suaUser = async (req, res, next) => {
        const data = req.body
        if (!data){
             return res.json({ success: false, message: "tham số không hợp lệ" })}
        try {
            const response = await UserModel.update(data)
            return res.json(response)
        } catch (error) {
            return res.json({ success: false, message: error })
        }
    }
    xoaUser = async(req,res)=>{
        const data= req.query.id
        if(req.lv && req.lv < 2) {
            return res.json({success: false, message: "khong du quyen"})
        }
        if(!data)
        return res.json({success:false,message:"tham so khong hop le"})
        try {
            const response=await UserModel.delete(data)
                return res.json(response)
        } catch (error) {
            return res.json({success:false,message:"loi hệ thống"})
        }
    }
    themNguoiDung =async (req,res)=>{
        const data =req.body
        if (Object.keys(data).length === 0) {
            return res.json({ success: false, message: "Dữ liệu truyền vào không hợp lệ" })
        }
        const objResult = await UserModel.themNguoiDung(data)
        if (Object.keys(objResult).length === 0) {
            return res.json({ success: false, message: "Có lỗi xảy ra, vui lòng thử lại" })
        }
        return res.json(objResult)
    }
})()
