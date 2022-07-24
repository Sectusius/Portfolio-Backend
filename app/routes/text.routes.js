const router = require('express').Router()
const textCtrl = require('../controllers/text.controller')

router.post("/uploadText",textCtrl.uploadText)

router.get("/text/:text_location",textCtrl.showText)

module.exports=router