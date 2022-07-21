
var router = require("express").Router();
const imgCtrl = require('../controllers/image.controller');

router.post("/upload", imgCtrl.upload)
router.get("/getImages/:param", imgCtrl.showImg)


module.exports = router;