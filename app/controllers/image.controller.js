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
    const newImage=new Image({
        imageUrl: 'https://portfolio-backend-petraccaro.herokuapp.com/images'+ req.file.filename,
        imageDesc: req.body.imageDesc.trim(),
    })
    Image.update({'imageDesc':req.body.imageDesc},{$set:{imageUrl:newImage.imageUrl, imageDesc:newImage.imageDesc}},{upsert:true});
}

exports.showImg=(req,res, done)=>{
    Image.findOne({imageDesc: req.params.imageDesc}).then((image)=>{
        if(!image){
            return res.status(401).json({succsses:false, msg:'Could not find image'})
        }
        return res.status(200).json(image);
    })
}