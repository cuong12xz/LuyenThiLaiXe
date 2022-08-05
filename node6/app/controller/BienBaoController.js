const BienBaoModel = require("../model/bienbaoModel")
class BienBaoController {
    test= async (req, res, next) => {
        try {
            const response = await BienBaoModel.get()
            return res.json({ success: true, result: response })
        } catch (error) {
            return res.json({ success: false, error: "loi roi" })
        }
    }
    getBienBao = async (req, res, next) => {
        try {
            const response = await BienBaoModel.getAll()
            return res.json({ success: true, result: response })
        } catch (error) {
            return res.json({ success: false, error: "loi roi" })
        }
    }
    get1dethi = async (req, res, next) => {
        const id = req.query.id
        if (!id) return res.json({ success: false, result: [], message: "Tham số không hợp lệ" })
        try {
            const response = await BienBaoModel.get1detail(id)
            return res.json({ success: true, result: response })
        } catch (error) {
            return res.json({ success: false, error: "loi" })
        }
    }
    themBienBao = async (req, res) => {
        const data = req.body 
        const file = req.file
       if(file &&file.filename) 
        data.HinhAnhBB = file.filename
        if (!data) {
            return res.json({ success: false, message: "tham so khong hop le" })
        }
        try {
            const response = await BienBaoModel.insert(data)
            return res.json(response)
        } catch (error) {
            return res.json({ success: false, message: "loi nghiem trong" })
        }
    }
    suaBienBao = async (req, res) => {
        const data = req.body
        const file = req.file
       if(file &&file.filename) 
        data.HinhAnhBB = file.filename
        if (!data) {
            return res.json({ success: false, message: "tham so khong hop le" })
        }
        try {
            const response = await BienBaoModel.updnate(data)
            return res.json(response)
        } catch (error) {
            return res.json({ success: false, message: error })
        }
    }
    xoaBienBao = async (req, res, next) => {
        const id = req.query.id
        if (!id) {
            return res.json({ success: false, message: "tham so ko hop le" })
        }
        try {
            const response = await BienBaoModel.delete(id)
            return res.json(response)
        } catch (error) {
            return res.json({ success: false, message: "loi he thong" })
        }
    }
    
   
}
module.exports = new BienBaoController()
