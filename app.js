const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
var passport = require("passport");
var crypto = require ("crypto");
var routes = require ("./app/routes");
const connection = require("./app/config/database");
const { appendFile } = require("fs");
const cors = require("cors");

const MongoStore = require("connect-mongo")

//---------------------GENERAL SETUP---------------------------

require("dotenv").config();

var app = express();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Origin", 'http://localhost:4200');
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
    next();
});

app.use(cors({origin:true, credentials: true}))
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb',extended:true}));

app.use(express.json());

app.use(express.urlencoded({extended: true}));

//--------------------SESSION SETUP ----------------------------

app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: process.env.DB_STRING,
    }),
    cookie:{
        maxAge: 1000 * 60 * 60 * 24
    }
}));

//  -----------------PASSPORT AUTHENTICATION--------------------

require("./app/config/passport");

app.use(passport.initialize()); 
app.use(passport.session());

//------------------ROUTES--------------------------------------

app.use(routes);


app.listen(process.env.PORT);