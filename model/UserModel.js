const { genSalt, hash } = require("bcryptjs");
const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    admin:{
        type:Boolean,
        default:false
    }
})

userSchema.pre("save", async function (next) {
        const user = this;

        if(!user.isModified('password'))return next();
        try{
            const salt = await genSalt(10);
            const hashedPassword = await hash(user.password,salt);
            user.password = hashedPassword;
            next();
        }
        catch(err){
            next(err);
        }
})

const User = mongoose.model("User",userSchema);
module.exports = User;