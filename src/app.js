import express from "express";
import cors from "cors";
import cookiesParser from "cookie-parser";
const app = express();

app.use(cors({
    origin:process.env.CORS_ORIGIN,
    credentials:true,
}));

app.use(express.json({limit:"16kb"}));
app.use(express.urlencoded({extended:true,limit:"16kb"}));
app.use(express.static("public"));
//cookie parser 
app.use(cookiesParser());


//routes import yehi garne ho 
import userRouter  from './routes/user_route.js'

//routes declaration 
app.use("/api/v.0/users",userRouter)

export default app;