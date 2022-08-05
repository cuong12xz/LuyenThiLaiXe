const LoaiBienBaoModel = require("../model/LoaiBienBaoModel")

module.exports=new class LoaiBienBaoController{
    getLoaiBienBao=async(req,res,next)=>{
        try {
            const response =await LoaiBienBaoModel.getAll()
            return res.json({success:true,result:response})
        } catch (error) {
            return res.json({success:false,error:"loi"})
        }
    }
    themLoaiBienBao =async (req,res)=>{
        const data =req.body
        if(!data)
        return res.json({success:false,message:"khong hop le"})
        try {
            const response= await LoaiBienBaoModel.insert(data)
            return res.json(response)
        } catch (error) {
            return res.json({success:false,message:error.message})
        }
    }
    suaLoaiBienBao=async(req,res)=>{
        const data=req.body
        if(!data)
        return res.json({success:false,message:"khong hop le"})
        try {
            const response =await LoaiBienBaoModel.update(data)
            return res.json(response)
        } catch (error) {
            return res.json({success:false,message:error})
        }
    }
    detail1 =async (req,res)=>{
        const id =req.query.id
        if(!id){
            return res.json({success:false,message:"khong hop le"})
        }
        try {
            const response = await LoaiBienBaoModel.getDetail(id)
            return res.json({success:true,result:response})
        } catch (error) {
            return res.json({success:false,message:error})
        }
    }
    xoaLoaiBienBao = async (req, res, next) => {
        const id = req.query.id
        if (!id) {
            return res.json({ success: false, message: "tham so ko hop le" })
        }
        try {
            const response = await LoaiBienBaoModel.delete(id)
            return res.json(response)
        } catch (error) {
            return res.json({ success: false, message: "loi he thong" })
        }
    }
}