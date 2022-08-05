const LoaiMeoThiModel = require("../model/LoaiMeoThiModel")
class LoaiMeoThiController {
    //method: GET
    //url: /CoLoaiMeoThiController/getall
    getLoaiMeoThi = async (req, res) => {
        const response = await LoaiMeoThiModel.getAll()
        return res.json({ success: true, result: response })
    }
    themLoaiMeoThi = async (req, res) => {
        const data = req.body
        if (!data) return res.json({ success: false, message: "khong hop le" })
        try {
            const response = await LoaiMeoThiModel.insert(data)
            return res.json(response)
        } catch (error) {
            return res.json({ success: false, message: error })
        }
    }
    detail1 = async (req, res) => {
        const id = req.query.id
        if (!id) {
            return res.json({ success: false, result: [], message: "tham so khong hop le" })
        }
        try {
            const response = await LoaiMeoThiModel.getDetail(id)
            return res.json({ success: true, result: response })
        } catch (error) {
            return res.json({ success: false, message: error })
        }
    }
    suaLoaiMeoThi = async (req, res) => {
        const data = req.body
        if (!data) {
            return res.json({ success: false, message: "tham so khong hop le" })
        }
        try {
            const response = await LoaiMeoThiModel.update(data)
            return res.json(response)
        } catch (error) {
            return res.json({ success: false, message: error })
        }
    }
    getSearch= async (req, res, next) => {
        const ten =  req.query.keyword
        try {
            const response = await LoaiMeoThiModel.getSeach(ten)
            return res.json({ success: true, result: response })
        } catch (error) {
            return res.json({ success: false, error: "loi" })
        }
    }
}

module.exports = new LoaiMeoThiController()
