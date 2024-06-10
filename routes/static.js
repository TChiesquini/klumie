const express = require('express');
const router = express.Router()

const StaticController = require('../controllers/staticController.js');
const verifyJWT = require('../controllers/verifyJWT.js');
const uploadPics =  require('../config/multerPic.js');
const uploadFile =  require('../config/multerFile.js');

router.post("/pic", verifyJWT, uploadPics.single('file'), StaticController.savePic)
router.get("/pic/:id?", verifyJWT, StaticController.getPic)
router.delete("/pic/:id", verifyJWT, StaticController.deletePic)
router.put("/pic/:id", verifyJWT, StaticController.deletePic, uploadPics.single('file'), StaticController.updatePic)

router.post("/file", verifyJWT, uploadFile.single('file'), StaticController.saveFile)
router.get("/file/:id?", verifyJWT, StaticController.getFile)
router.delete("/file/:id", verifyJWT, StaticController.deleteFile)


module.exports = router;