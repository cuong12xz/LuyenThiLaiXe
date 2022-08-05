const CauHoiModel = require("../model/CauHoiModel")
const path = require("path")

module.exports = new (class CauHoiController {
    getCauHoi = async (req, res, next) => {
        try {
            const response = await CauHoiModel.getAll()
            return res.json({ success: true, result: response })
        } catch (error) {
            return res.json({ success: false, error: "loi" })
        }
    }
    getChiTietCauHoi = async (req, res) => {
        const id = req.query.id
        if (!id) {
            return res.json({ success: false, result: [], message: "Tham số không hợp lệ" })
        }
        try {
            const response = await CauHoiModel.getDetail(id)
            return res.json({ success: true, result: response })
        } catch (error) {}
    }
    getCauHoiExceptDeThi = async (req, res) => {
        const data = req.query
        if (!data) {
            return res.json({ success: false, result: [], message: "Tham số không hợp lệ" })
        }
        try {
            const response = await CauHoiModel.getExcept(data)
            return res.json({ success: true, result: response })
        } catch (error) {}
    }
    themCauHoi = async (req, res) => {
        const data = req.body
        const file = req.file
        if (file && file.filename) {
            data.HinhAnh = file.filename
        }
        if (!data) {
            return res.json({ success: false, message: " tham so khong hop le" })
        }
        try {
            const response = await CauHoiModel.insert(data)
            return res.json(response)
        } catch (error) {
            return res.json({ success: false, message: "loi he thong" })
        }
    }
    xoaCauHoi = async (req, res) => {
        const id = req.query.id
        if (!id) {
            return res.json({ success: false, message: "tham so ko hop le" })
        }
        try {
            const response = await CauHoiModel.delete(id)
            return res.json(response)
        } catch (error) {
            return res.json({ success: false, message: "loi he thong" })
        }
    }
    suaCauHoi = async (req, res) => {
        const data = req.body
        const file = req.file
        if (file && file.filename) {
            data.HinhAnh = file.filename
        }
        if (!data) {
            return res.json({ success: false, message: "tham so khong hop le" })
        }
        try {
            const response = await CauHoiModel.update(data)
            return res.json(response)
        } catch (error) {
            return res.json({ success: false, message: error })
        }
    }
    getSearch= async (req, res, next) => {
        const noidung =  req.query.keyword
        try {
            const response = await CauHoiModel.getSeach(noidung)
            return res.json({ success: true, result: response })
        } catch (error) {
            return res.json({ success: false, error: "loi" })
        }
    }
})()
