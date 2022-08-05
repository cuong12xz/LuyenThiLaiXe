const MeoThiModel = require("../model/meothiModel")
class MeoThiController {
    getMeoThi = async (req, res, next) => {
        try {
            const response = await MeoThiModel.getAll()
            return res.json({ success: true, result: response })
        } catch (error) {
            return res.json({ success: false, error: "loi roi" })
        }
    }
    get1meothi = async (req, res, next) => {
        const id = req.query.id
        if (!id) return res.json({ success: false, result: [], message: "Tham số không hợp lệ" })
        try {
            const response = await MeoThiModel.get1detail(id)
            return res.json({ success: true, result: response })
        } catch (error) {
            return res.json({ success: false, error: "loi" })
        }
    }
    themMeoThi = async (req, res) => {
        const data = req.body
        if (!data) {
            return res.json({ success: false, message: "tham so khong hop le" })
        }
        try {
            const response = await MeoThiModel.insert(data)
            return res.json(response)
        } catch (error) {
            return res.json({ success: false, message: "loi nghiem trong" })
        }
    }
    suaMeoThi = async (req, res) => {
        const data = req.body
        if (!data) {
            return res.json({ success: false, message: "tham so khong hop le" })
        }
        try {
            const response = await MeoThiModel.update(data)
            return res.json(response)
        } catch (error) {
            return res.json({ success: false, message: error })
        }
    }
    xoaMeoThi = async (req, res, next) => {
        const id = req.query.id
        if (!id) {
            return res.json({ success: false, message: "tham so ko hop le" })
        }
        try {
            const response = await MeoThiModel.delete(id)
            return res.json(response)
        } catch (error) {
            return res.json({ success: false, message: "loi he thong" })
        }
    }

    // getmeothi = async(req,res,next) =>{
    //     try {
    //         // connection.query(
    //         //     'select * from meothi join loaimeothi on meothi.idloaimt=loaimeothi.id',
    //         //   function (err, results, fields) {
    //         //       if(err) return res.json({success:false,error:err})
    //         //       if(results.length>0)return res.json({success:true,result:results})
    //         //       return res.json({success:false,error:"khong co du lieu"})
    //         //   }
    //         // );
    //         const res = await connection.execute('select * from meothi join loaimeothi on meothi.idloaimt=loaimeothi.id')
    //         console.log(res);
    //     } catch (error) {
    //         return res.json({success:false,error:"loi server", error1: error})
    //     }finally{
    //       connection.end;
    //     }

    // }
  
}
module.exports = new MeoThiController()
