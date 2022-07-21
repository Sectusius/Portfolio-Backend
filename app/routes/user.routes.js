const router = require('express').Router()
const userCtrl = require('../controllers/user.controller')

router.post("/signup",userCtrl.signUp)
router.post("/login",userCtrl.logIn)

router.get("/user",userCtrl.getUsers)
router.get("/user/:user_id",userCtrl.showUser)

module.exports=router