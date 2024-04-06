import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    fullname:{
        type:String,
    },
    email:{
        type:String,
    },
    password:{
        type:String,
    }
},{
    timestamps:true,
}
);

var userModel=mongoose.model('Users',userSchema);
export default userModel;