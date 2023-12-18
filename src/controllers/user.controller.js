import { asyncHandler } from "../utils/async_handler.js";
import { ErrorHandler } from "../utils/error_handler.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ResponseHandler } from "../utils/response_handler.js";
const registerUser = asyncHandler(async(req,res)=> {
    //get user data from client 

    const {username ,fullname ,email,password}= req.body;
    console.log("user: " + username);

    //validation data
    if((
        [username,fullname,email,password].some((field)=> 
        field?.trim()=== "")
    )){
        throw new ErrorHandler(400,"all fields are required")
    }

    //check if user already exists usrname & email
    const existedUser= await User.findOne({
        $or:[{username},{email}]
    })

    if(existedUser){
        throw new ErrorHandler(409,"User already exists")
    }

    //check for avatar 

    // const avatarPath = req.files?.avatar[0]?.path;
    // if(!avatarPath){
    //     throw new ErrorHandler(400,"upload avatar")
    // }
    // console.log("avatar image path: " + avatarPath);

    //upload to cloudinary 
//    const avatar = await  uploadOnCloudinary(avatarPath);
//    if(!avatar){
//     throw new ErrorHandler(400,"upload avatar")
//    }
    //create a user object -- create entry in db 
    const user = await User.create({
        username,
        fullname,
        email,
        password,
    })
    //remove password and refresh tken filed  from response 

    //check for user cration 

   const userCretion= await User.findById(user._id).select(
    
        "-password"
    
   )
   if(!userCretion){
    throw new ErrorHandler(500,"User not create ");
   }
    //return res 

    return res.status(201).json(
        new ResponseHandler(200,user,"successfully User Creates ")
    )


}



)
const loginUser = asyncHandler(async(req,res)=> {
    //get the login credentials from user 
    const {username,password} = req.body;
    console.log(`username ; ${username} password : ${password}`);

    //validation 
    if((
        [username,password].some((field)=>
        field?.trim()==="")
)){
    throw new ErrorHandler(400,"user name and passwprds are required")
}
//check user available or not 
const existUser = await User.findOne({
    username
})
const isVslid = await existUser.isPasswordCorrect(password)
if (!existUser){
    throw new ErrorHandler(404,"user not found")
}else if(!isVslid){
    const data = {
        error:"Wrong Crediental "
    }
    return res.status(404).json(
        new ResponseHandler(404,data,"LoginFaile ")
    )

}

else{
    const myUser= await User.findOne({username}).select("-password")
   
    return res.status(200).json(
        new ResponseHandler(200,myUser,"succcess to login ")
    )
}

}
)

export {registerUser,loginUser}