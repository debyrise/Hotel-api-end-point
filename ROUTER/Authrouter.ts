import express, { Router, } from "express"
import {Logout, Registeruser, login  } from "../Controller/Authcontroller"
import jwt from "jsonwebtoken"


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
        jwt.verify(  token, "3456yureds", (err:any, payload:any) => {
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

router.route("/reg-user").post(Registeruser)
router.route("/login-user").post(login)
router.route("/logout-user").post(Logout)


export default router