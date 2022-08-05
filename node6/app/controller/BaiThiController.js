module.exports = new  class BaiThiController{
    getBaiThi=async(req,res,next)=>{
        try {
            const response=await DeThiModel.getAll()
            return res.json({success:true,result:response})
        } catch (error) {
            return res.json({success:false,error:"loi"})
        }
    }
}