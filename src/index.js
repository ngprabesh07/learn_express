import dotenv from "dotenv";
import connectMongoDB from "./db/mongo_db_config.js";
import app from "./app.js";
dotenv.config({
    path:"./env"
})

connectMongoDB().then(()=>{
    app.listen(process.env.PORT || 3000,()=> {
      console.log(`our app is listen on ${process.env.PORT}`)
    })
}).catch((e)=>{
    console.log("MONGO CONNECTION FAILLED !!! ",e);
})
