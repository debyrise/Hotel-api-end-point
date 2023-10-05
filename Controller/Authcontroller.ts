import Hotelauth from "../Model/model"
import  express, {Request, Response}  from "express"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"


  export const Registeruser = async  (req:Request,res:Response) :Promise <Response>=> {
    try
     {

      const {fullName, email,password } = req.body
      if (!fullName || !email || !password )
      {
        return res.status(404).json({
            message: "all field required"
        })
      }

      const checkemail = await Hotelauth.findOne({email:email})
      console.log( checkemail)
      if(checkemail)
      {
       return res.status(404).json({
         success: 0,
           maessage:"email already exist"
       })
      }

      const salt = await bcrypt.genSalt(10)
      const hashed = await bcrypt.hash(password,salt)
      const registerlist = await Hotelauth.create({
       fullName,
        email,
        password:hashed
      })
        return res.status(201).json({
            message: "profile created",
            result: registerlist
        })


    }catch (error:any)
    {
       return res.status (404).json({
        message: "failed to register user",
        result: error.message
       })
    }
}
  
export const login = async(req:Request, res:Response):Promise <Response> => {
    try{
        const {email, password} = req.body
        if(!email || !password)
        {
          return res.status(401).json({
            message: "all filed required"
          })
        }
        const checkEmail: any = await Hotelauth.findOne({email:email})
        console.log(checkEmail)
        if (checkEmail)

        {
            const checkPassword = await bcrypt.compare(password,checkEmail.password)
            if (checkPassword)
            {
               const Token= jwt.sign({_id:checkEmail._id, fullName:checkEmail.fullNname,email: checkEmail.email,},
                     "3456yureds",
                     {expiresIn: "10m"}
                )
                

                const {password, isActive, ... info} = checkEmail._doc
                const Option:any = {expiresIn: "15m"}
                res.cookie("sessionId", Token, Option)
                

                return res.status(200).json({
                   message: "log in successfully",
                   result :{info, Token}
                })
            }else{
                return res.status(401).json({
                    message: "incorrect password"
                })
            } 

        }else
        {
            return res.status(201).json({
                message: "user not found"
            })
        }
    } catch (error:any)
    {
        return res.status(404).json ({
            mesage:error.message
        })
    }
}
export const  Logout = async(req:Request, res:Response):Promise <Response> => {
    try 
    {
        res.clearCookie("Sessionid")
      return res.status(404).json({
        message:"log out successsfully"
      })
    }catch (error:any)
    {
         return res.status(404).json({
            message: error.message
         })
    }
}