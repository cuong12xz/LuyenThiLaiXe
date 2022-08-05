const LoaiLyThuyetModel = require("../model/LoaiLyThuyetModel")

module.exports=new class LoaiLyThuyetController{
    getLoaiLyThuyet=async(req,res,next)=>{
        try{
            const response = await LoaiLyThuyetModel.getAll()
            return res.json({success:true,result:response})
        }catch(error){
            return res.json({success:false,error:"loi"})
        }
    }
    themLoaiLyThuyet = async (req, res) => {
        const data = req.body
        if (!data) return res.json({ success: false, message: "khong hop le" })
        try {
            const response = await LoaiLyThuyetModel.insert(data)
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
            const response = await LoaiLyThuyetModel.getDetail(id)
            return res.json({ success: true, result: response })
        } catch (error) {
            return res.json({ success: false, message: error })
        }
    }
    suaLoaiLyThuyet = async (req, res) => {
        const data = req.body
        if (!data) {
            return res.json({ success: false, message: "tham so khong hop le" })
        }
        try {
            const response = await LoaiLyThuyetModel.update(data)
            return res.json(response)
        } catch (error) {
            return res.json({ success: false, message: error })
        }
    }
}