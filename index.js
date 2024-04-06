import express from "express";
const app=express();
import AuthRoute from './routes/AuthRoute.js';
import mongoose from "mongoose";
import bodyParser from "body-parser";
import 'dotenv/config'

const port=process.env.PORT||3030;

app.use(bodyParser.json());

app.use('/auth',AuthRoute)
const DATABASE='login-register-api';
mongoose.connect('mongodb://localhost:27017/'+DATABASE).then(()=>{
    app.listen(port,()=>{
        console.log(`server is running on port ${port}`);
    });
});