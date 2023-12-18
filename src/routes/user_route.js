import { Router } from "express";
import { registerUser ,loginUser} from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.midelware.js";

const router = Router();

router.route("/register").post(
    // upload.fields({
    //     name:"avatar",
    //     maxCount:1,

    // }),
    registerUser)

router.route("/login").post(loginUser)

//route hunexa ab /api/v.0/users/register 


export default router;