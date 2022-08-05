const DeThiModel = require("../model/DeThiModel")

module.exports = new (class DeThiController {
    getCauHoiDeThi = async (req, res, next) => {
        const params = req.query
        try {
            const response = await DeThiModel.getAll(params)
            return res.json({ success: true, result: response })
        } catch (error) {
            return res.json({ success: false, error: "loi" })
        }
    }
    getChiTietDeThi = async (req, res) => {
        const id = req.query.id
        if (!id) {
            return res.json({ success: false, result: [], message: "Tham số không hợp lệ" })
        }
        try {
            const response = await DeThiModel.getDetail(id)
            return res.json({ success: true, result: response })
        } catch (error) {}
    }
    get1DeThi = async (req, res, next) => {
        const id = req.query.id
        if (!id) return res.json({ success: false, result: [], message: "Tham số không hợp lệ" })
        try {
            const response = await DeThiModel.get1detail(id)
            return res.json({ success: true, result: response })
        } catch (error) {
            return res.json({ success: false, error: "loi" })
        }
    }
    getDeThi = async (req, res, next) => {
        try {
            const response = await DeThiModel.getDeThiM()
            return res.json({ success: true, result: response })
        } catch (error) {
            return res.json({ success: false, error: "loi" })
        }
    }
    themDeThi = async (req, res) => {
        const data = req.body
        if (!data) {
            return res.json({ success: false, message: "tham so khong hop le" })
        }
        try {
            const response = await DeThiModel.insert(data)
            return res.json(response)
        } catch (error) {
            return res.json({ success: false, message: "loi nghiem trong" })
        }
    }
    suaDeThi = async (req, res) => {
        const data = req.body
        if (!data) {
            return res.json({ success: false, message: "tham so khong hop le" })
        }
        try {
            const response = await DeThiModel.update(data)
            return res.json(response)
        } catch (error) {
            return res.json({ success: false, message: error })
        }
    }
    suaCauHoiDeThi = async (req, res) => {
        const data = req.body
        if (!data) {
            return res.json({ success: false, message: "tham so khong hop le" })
        }
        try {
            const response = await DeThiModel.updateCauHoiDeThi(data)
            return res.json(response)
        } catch (error) {
            return res.json({ success: false, message: "loi nghiem trong" })
        }
    }
    themCauHoiDeThi = async (req, res) => {
        const data = req.body
        if (!data) {
            return res.json({ success: false, message: "tham so khong hop le" })
        }
        try {
            const response = await DeThiModel.insertCauHoiDeThi(data)
            return res.json(response)
        } catch (error) {
            return res.json({ success: false, message: "loi nghiem trong" })
        }
    }
    xoaCauHoiDeThi = async (req, res, next) => {
        const id = req.query.id
        if (!id) {
            return res.json({ success: false, message: "tham so ko hop le" })
        }
        try {
            const response = await DeThiModel.deletecauhoi(id)
            return res.json(response)
        } catch (error) {
            return res.json({ success: false, message: "loi he thong" })
        }
    }
    xoaDeThi = async (req, res, next) => {
        const id = req.query.id
        if (!id) {
            return res.json({ success: false, message: "tham so ko hop le" })
        }
        try {
            const response = await DeThiModel.delete(id)
            return res.json(response)
        } catch (error) {
            return res.json({ success: false, message: "loi he thong" })
        }
    }
    getRanDom =async (req,res,next)=>{
        try {
            const response= await DeThiModel.randomdiemliet()
            return res.json({success:true, result:response})
        } catch (error) {
            return res.json({success:false,error:"loi"})
        }
    }
    themRanDom = async (req, res) => {
        const data = req.body
        if (!data) {
            return res.json({ success: false, message: "tham so khong hop le" })
        }
        try {
            const response = await DeThiModel.insertrandom(data)
            return res.json(response)
        } catch (error) {
            return res.json({ success: false, message: "loi nghiem trong" })
        }
    }
    getSearch= async (req, res, next) => {
        const ten =  req.query.keyword
        try {
            const response = await DeThiModel.getSeach(ten)
            return res.json({ success: true, result: response })
        } catch (error) {
            return res.json({ success: false, error: "loi" })
        }
    }
})
