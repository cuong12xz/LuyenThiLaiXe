const express =require('express');
const app =express();
const route =require('./app/router/index');
const bodyPaser =require('body-parser');
app.use(bodyPaser.urlencoded({extended:false}))
app.use(bodyPaser.json());
require('dotenv').config()

//cors
app.use('/images', express.static('public/images'))

const cors= require("cors");
app.use(cors())
route(app);
app.listen(3006,function(){
    console.log("Server listening on http://localhost:3006")
})

