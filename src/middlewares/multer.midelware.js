import multer from "multer";

const storage = multer.diskStorage({
    destination:function(req,file,callback){
        console.log("yaa samma aayo guys ");
        try{
        callback(null,'./public/temp')
        }catch(e){
            console.log("error multer ".e);
        }
    },
    filename:function(req,file,callback){
        const uniqueSuffix = Data.now() + '-' + Math.round(Math.random() * 1E9)
        callback(null,file.filename + '-' + uniqueSuffix)
    }
})
console.log("storage ",storage.filename);
export const upload =multer({storage:storage})

