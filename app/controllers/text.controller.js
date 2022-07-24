var multer  = require('multer');
var express = require('express');
var Text = require("../models/Text");

exports.uploadText=(req, res, done)=>{
    console.log(req.body)
    Text.findOne({textLocation:req.body.textLocation}).then((text)=>{
        if(text){
            Text.updateOne({textLocation:req.body.textLocation},{$set:{textBody:req.body.textBody}},{upsert:true}).then((done)=>{
                return res.status(200).json(text)
            }).catch((err)=>{
                next(err)
            })
        }
        else{
            const newText = new Text({
                textBody:req.body.textBody,
                textLocation:req.body.textBody
            })
            newText.save().then((text)=>{
                return res.status(200).json(text)
            })
        }
    })
}

exports.showText=(req,res,done)=>{
    Text.findOne({textLocation:req.params.text_location}).then((text)=>{
        if(!text){
            return res.status(401).json({succes:false, msg:'Could not find text'})
        }
        else{
            return res.status(200).json(text)
        }
    })
}