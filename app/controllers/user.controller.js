const crypto = require('crypto');
const User = require('../models/User');
const utils = require('../lib/passwordUtils');


exports.signUp = (req, res, next) => {
    User.findOne({ username: req.body.username.trim() }).then((user) => {
      if (!user) {
        // if user not found, create user, else inform error
        console.log(req.body.password)
        const pwd = req.body.password
        const saltHash = utils.genPassword(pwd)
        const hash = saltHash.hash
        const salt = saltHash.salt
        console.log(req.body.username)
        const newUser = new User({
          username: req.body.username.trim(),
          email: req.body.email.trim(),
          role: req.body.role,
          hash: hash,
          salt: salt,
        })
        newUser
          .save().then((user)=>{
            const jwt = utils.issueJWT(user)
            res.status(200).json({
              success: true,
              user: user,
              token: jwt.token,
              expiresIn: jwt.expires,
            })
          })
          .catch((err) => next(err))
      } else res.status(409).json({ success: false, msg: 'Email ya registrado' })
    })
  }

exports.logIn = (req, res, next) => {
    User.findOne({ username: req.body.username.trim() })
      .then((user) => {
        if (!user) {
          return res
            .status(401)
            .json({ success: false, msg: 'could not find user' })
        }
        const isValid = utils.validPassword(
          req.body.password,
          user.hash,
          user.salt
        )
  
        if (isValid) {
          const jwt = utils.issueJWT(user)
  
          res.status(200).json({
            success: true,
            user: user,
            token: jwt.token,
            expiresIn: jwt.expires,
          })
        } else {
          return res
            .status(401)
            .json({ success: false, msg: 'you entered the wrong password' })
        }
      })
      .catch((err) => {
        return res.send(409, { error: err, msg: 'user not found' })
      })
  }

exports.getUsers = (req, res, next) => {
    User.find({})
      .then((users) => {
        if (users) {
          res.status(200).json(users)
        } else
          return res
            .status(401)
            .json({ success: false, msg: 'no se encontraron usuarios' })
      })
      .catch((err) => {
        console.log(err)
        return res.status(500).json({ success: false, msg: 'error inesperado' })
      })
}

exports.showUser = (req, res, next) => {
    User.findOne({ _id: req.params.user_id }).then((user) => {
      if (!user) {
        return res
          .status(401)
          .json({ success: false, msg: 'could not find user' })
      }
      return res.status(200).json(user)
    })
}

exports.getRol=(req, res, next)=>{
  user.findOne({_id:req.params.user_id}).then((user)=>{
    if(!user){
      return res.status(401).json({success:false, msg: 'Could not find user'})
    }
    return res.status(200).json(user.role);
  })
}