import mongoose, { Schema } from "mongoose";
const UserSchema = new mongoose.Schema({
  name:{
    type:String,
    required: true,
    trim: true
  },
  email:{
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  originalPassword:{
    type: String,
    required: false,
  },
  password:{
    type: String,
    requird: true,
    minlength: 8,
    maxlength : 60
  },
  role:{
    type: String,
    enum: [ "user" , "admin" ],
    default: "user",
  },
  otp:{
    type: Number
  },
  otpExpires:{
    type: Date
  }
},
{
    timestamps: true
})
const User = mongoose.model("User", UserSchema)
export default User