const express = require("express")
const userController = require("../controller/userController")
const auth = require("../middleware/auth")
const router = express.Router() 

    router.post("/logon", userController.logon)
    router.put("/suanguoidungsingle",userController.suaUserSingle)
    router.post('/login', userController.login)
    router.get('/detailuser', userController.getDetail)
    router.get('/nguoidung',userController.getNguoiDung)
    router.put('/suanguoidung',userController.suaUser)
    router.delete('/xoanguoidung',auth ,userController.xoaUser)
    router.post('/themnguoidung',userController.themNguoiDung)
module.exports = router