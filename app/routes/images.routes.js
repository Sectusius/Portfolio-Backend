var express = require("express");
var router = express.Router();
const imgCtrl = require('../controllers/image.controller');

router.post("/upload", imgCtrl.upload)
router.get("/getImages", imgCtrl.showImg)


module.exports = router;