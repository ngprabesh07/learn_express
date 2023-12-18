import mongoose, {Schema} from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
const userSchema = new Schema(
    {
        username:{
            type:String,
            required:true,
            unique:true,
            lowercase:true,
            trim:true,
            index:true

        },
        email:{
            type:String,
            required:true,
            unique:true,
            lowercase:true,
            trim:true

        },
        fullname:{
            type:String,
            required:true,
            unique:true,
            index:true,
            trim:true

        },
        // avatar:{
        //     type:String,//cloudinary url user garnexu 
        //     required:true,

        // },

        watchHistory:[{
            type:Schema.Types.ObjectId,
            ref:"Video"

        }],
        password:{
            type:String,
            required:[true, "Password is required"]

        }
        ,
        refreshToken :{
            type:String,

        }


},
{timestamps:true});

userSchema.pre("save",async function (next){
    if(!this.isModified("password")) return next();
    this.password =await bcrypt.hash(this.password,11)
    next()

})

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password,this.password)
}

//generate bearer token
userSchema.methods.generateAccesssToken = function(){
    jwt.sign({
        _id:this._id,
        username:this.username,
        email:this.email
    },
    process.env.ACCESS_TOKEN_SECRET,

    {
        expiresIn:process.env.ACCESS_TOKEN_SECRET_EXPIRY
    }
    
    )
}
userSchema.methods.generateRefreshToken = function(){
    jwt.sign({
        _id:this._id,
        
    },
    process.env.REFRESH_TOKEN_SECRET,

    {
        expiresIn:process.env.REFRESH_TOKEN_SECRET_EXPIRY
    }
    
    )
}

export const User = mongoose.model("User",userSchema);