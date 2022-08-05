const jwt= require('jsonwebtoken')
const auth = (req, res, next) => {
    const token = req.headers['authentication']
    if(!token) {
        return res.json({success: false, message: "khong co quyen truy cap"})
    }
    try {
        const data = jwt.decode(token)
        if(data) {
            req.lv = data.lv
            req.Email = data.Email
        }
        next()
    } catch (error) {
        return res.json({success: false, message: "khong co quyen truy cap"})    
    }
}

module.exports = auth