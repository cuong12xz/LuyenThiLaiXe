const path = require('path')
const multer = require('multer')
var storage = multer.diskStorage({
    destination: (req, file, callBack) => {
    //điểm đến 
        callBack(null, path.join(__dirname,'../..', 'public', 'images'))     
    },
    filename: (req, file, callBack) => {
        callBack(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})
 
var upload = multer({
    storage: storage
});

module.exports = upload