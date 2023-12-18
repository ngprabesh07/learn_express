import {v2 as cloudinary} from 'cloudinary';
import fs from 'fs';  
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET
});


const uploadOnCloudinary = async(localFile)=> {
    try {
        if(!localFile) return null
        //upload the file on cloudinary 
       const response = await cloudinary.uploader(localFile,{
            resource_type:"auto"
        })
        //if file is uploaded successfully
        console.log("successfully uploaded on cloudinary",response.url);

        return response;
    } catch (error) {
        fs.unlinkSync(localFile);//it remove the local saved local file when operation faled 
        return null;
        
    }
}

export {uploadOnCloudinary}