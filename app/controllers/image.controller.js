var multer  = require('multer');
var express = require('express');
var Image = require("../models/Images")

var storage=multer.diskStorage({
    destination:(req,res, done) =>{
        done(null, './public/images');
    },
    filename:(req, res, done)=>{
        console.log(res);
        var fileType='';
        switch(fileType.mimetype){
            case 'image/gif':{
                fileType='gif';
            }
            case 'image/png':{
                fileType='png';
            }
            case 'image/jpg':{
                fileType='jpg';
            }
        }
        done(null, 'image-'+'.'+fileType);
    }
});

var upload=multer({storage:storage});

exports.upload=(req, res, done)=>{
    console.log(req.body)
    const newImage=new Image({
        imageUrl: req.body.url,
        imageDesc: req.body.des.trim(),
    })
    
    Image.update({'imageDesc':req.body.des},{$set:{imageUrl:newImage.imageUrl, imageDesc:newImage.imageDesc}},{upsert:true});
}

exports.showImg=(req,res, done)=>{
    Image.find({}).then((images)=>{
        console.log(images)
    })
    Image.findOne({imageDesc: req.params.param}).then((image)=>{
        console.log(image)
        if(!image){
            return res.status(401).json({succsses:false, msg:'Could not find image'})
        }
        else{
            return res.status(200).json(image);
        }
    })
}