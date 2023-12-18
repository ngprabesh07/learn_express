import mongoose, { connections } from "mongoose";

import {DB_NAME} from "../constants.js";

const connection = async()=>{
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`);

        console.log("Connection successfully ",connectionInstance.connection.host);
        
    } catch (error) {
        console.log(`Error connecting mongoDB ${DB_NAME} with error ${error}`)
        
    }
}
export default connection


