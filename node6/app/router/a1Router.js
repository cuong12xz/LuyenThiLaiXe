const express =require("express");
const BienBaoController = require("../controller/BienBaoController");
const cauhoiController = require("../controller/cauhoiController");
const DeThiController = require("../controller/DeThiController");
const LoaiBienBaoController = require("../controller/LoaiBienBaoController");
const LoaiLyThuyetController = require("../controller/LoaiLyThuyetController");
const LoaiMeoThiController = require("../controller/LoaiMeoThiController");
const MeoThiController = require("../controller/MeoThiController");
const uploadFile = require('../middleware/uploadFile');
const uploadFileBB = require("../middleware/uploadFileBB");


const router= express.Router();
router.get("/test",BienBaoController.test)
//dethi
router.get("/dethi",DeThiController.getDeThi)
router.get("/1dethi",DeThiController.get1DeThi)
router.get("/chitietdethi",DeThiController.getChiTietDeThi)
router.get("/cauhoidethi",DeThiController.getCauHoiDeThi)
router.post("/themdethi",DeThiController.themDeThi)
router.delete("/xoadethi",DeThiController.xoaDeThi)
router.put("/suadethi",DeThiController.suaDeThi)
router.post("/themchdt", DeThiController.themCauHoiDeThi)
router.put("/suachdt", DeThiController.suaCauHoiDeThi)
router.delete("/xoacauhoidethi",DeThiController.xoaCauHoiDeThi)
router.get("/randomchdt",DeThiController.getRanDom)
router.post("/themrandomchdt",DeThiController.themRanDom)
//cauhoi
router.get("/exchdt",cauhoiController.getCauHoiExceptDeThi)
router.get("/cauhoi",cauhoiController.getCauHoi)
router.get("/chitietcauhoi",cauhoiController.getChiTietCauHoi)
router.post("/themcauhoi",uploadFile.single('file'), cauhoiController.themCauHoi)
router.delete("/xoacauhoi",cauhoiController.xoaCauHoi)
router.put("/suacauhoi",uploadFile.single('file'),cauhoiController.suaCauHoi)
router.get("/timkiemcauhoi",cauhoiController.getSearch)

//loailythuyet
router.get("/loailythuyet",LoaiLyThuyetController.getLoaiLyThuyet)
router.put('/sualoailythuyet',LoaiLyThuyetController.suaLoaiLyThuyet)
router.post('/themloailythuyet',LoaiLyThuyetController.themLoaiLyThuyet)
router.get('/1loailythuyet',LoaiLyThuyetController.detail1)
//loaimeothi
router.get('/loaimeothi', LoaiMeoThiController.getLoaiMeoThi) 
router.put('/sualoaimeothi',LoaiMeoThiController.suaLoaiMeoThi)
router.post('/themloaimeothi',LoaiMeoThiController.themLoaiMeoThi)
router.get('/1loaimeothi',LoaiMeoThiController.detail1)
router.get("/timkiemloaimeothi",LoaiMeoThiController.getSearch)
//meothi
router.get("/meothi",MeoThiController.getMeoThi)   ;
router.post("/themmeothi",MeoThiController.themMeoThi)
router.put("/suameothi",MeoThiController.suaMeoThi)
router.get("/1meothi",MeoThiController.get1meothi)
router.delete("/xoameothi",MeoThiController.xoaMeoThi)
//loaibienbao
router.get("/loaibienbao",LoaiBienBaoController.getLoaiBienBao)
router.put('/sualoaibienbao',LoaiBienBaoController.suaLoaiBienBao)
router.post('/themloaibienbao',LoaiBienBaoController.themLoaiBienBao)
router.get('/1loaibienbao',LoaiBienBaoController.detail1)
router.delete("/xoaloaibienbao",LoaiBienBaoController.xoaLoaiBienBao)

//bienbao
router.get("/bienbao",BienBaoController.getBienBao)   ;
router.post("/thembienbao",uploadFileBB.single('filebb'),BienBaoController.themBienBao)
router.put("/suabienbao",uploadFileBB.single('filebb'),BienBaoController.suaBienBao)
router.get("/1bienbao",BienBaoController.get1dethi)
router.delete("/xoabienbao",BienBaoController.xoaBienBao)
module.exports= router;
