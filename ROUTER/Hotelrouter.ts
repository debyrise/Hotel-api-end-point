import express from "express"
import {  GetAllUser, RegisterHotel,getoneuser,login,  update ,deletehotel  } from "../Controller/HotelOwnerControl"
import jwt from "jsonwebtoken"
import uploads from "../middleware/Multer"


const verifyToken = async (req:any, res:any, next:any) => {
    const getsession = req.header["cookie"]

    if(!getsession)
    {
        return res.status(404).json({
            message: "please login to get token"
        })
    }
    const tokencookie = getsession.split("=")[1]
    if(tokencookie)
    {
        const token = await tokencookie
        jwt.verify(token, "3456yureds", (err:any, payload:any) => {
            if (err)
            {
                return res.status(404).json({
                    message: "token expire"
                })
            }
            req.user = payload
        })
    }else {
        return res.status(404).json({
            message: "please provide a valid token"
        })
    }
}


const router = express.Router()
router.route("/register-user").post( uploads, RegisterHotel  )
router.route("/login-user").post(login )
router.route("/get-user/:id").get(getoneuser)
router.route("/get-all").get(verifyToken, GetAllUser)
router.route("/update-user/:id").put(update)
router.route("/delete-hotel/:id").delete(deletehotel )
export default router