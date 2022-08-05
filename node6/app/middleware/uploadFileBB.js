const path = require('path')
const multer = require('multer')
var storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, path.join(__dirname,'../..', 'public', 'images',"bienbao"))     // './public/images/' directory name where save the file
    },
    filename: (req, file, callBack) => {
        callBack(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})
 
var uploadFileBB = multer({
    storage: storage
});

module.exports = uploadFileBB