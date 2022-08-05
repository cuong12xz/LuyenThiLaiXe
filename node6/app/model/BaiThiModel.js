nmodule.exports= new class BaiThiModel{
    getAll =async()=>{
        try {
            const query ="select * from baithi "
            const res = await   DBConnect.query(query);
            return res[0];
        } catch (error) {
            console.log(error)
        }
    }
    
}