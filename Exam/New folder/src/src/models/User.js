const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({ 
    username:{type:String,required:true,minLength:[3,"Username must be at least 3 characters long!"]},
    email:{type:String,required:true,unique:true,minLength:[10,"Email must be at least 10 characters long!"]},
    password:{type:String,required:true,minLength: [4,"Password must be at least 4 characters long!"]}
})

userSchema.virtual('repass').set(function (value){
    if(value !== this.password){
        throw new Error('Password don\'t match')
    }
})

userSchema.pre("save", async function () {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
  });
const User = mongoose.model('User',userSchema)
module.exports= User