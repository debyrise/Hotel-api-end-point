import HotelOwner from "../Model/HotelOwner";
import express, {Request,Response}  from "express";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"


export const RegisterHotel = async  (req:any,res:Response) :Promise <Response>=> {
    try
     {

      const {HotelName, email,password , Address, des, isActive} = req.body
      if (!HotelName || !email || !password || !Address  || !des  || !isActive)
      {
        return res.status(404).json({
            message: "all field required"
        })
      }

      const checkemail = await HotelOwner.findOne({email:email})
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
      const RegisterHotel = await HotelOwner.create({
       HotelName,
        email,
        Address,
        des,
        isActive,
        password:hashed,
        Avater:req.file.filename
      })
        return res.status(201).json({
            message: "profile created",
            result: RegisterHotel
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
        const checkEmail: any = await HotelOwner.findOne({email:email})
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

export const getoneuser = async (req:Request, res: Response):Promise<Response> => {
    try
     {
        const getoneuserid = [req.params.id]
        const getoneuser = await HotelOwner.findById(getoneuserid)
        
        return res.status(200).json({
            message: "single user",
            result:getoneuser

        })
    } catch (error:any) {
        return res.status(404).json({
            message:error.message
        })
    }
}

export const GetAllUser = async (req:Request,res:Response):Promise<Response> => {
    try
    {
       const getUser = await HotelOwner.find()

       return res.status(200).json({
        message:"All user",
        result: getUser
       })
    }catch(error:any)
    {
      return res.status(404).json({
        message: error.maessage
      })
    }
}
export const update = async (req:Request, res:Response):Promise<Response> => {
    try 
    {
        const dataid = [req.params.id]
        const datas = await HotelOwner.findByIdAndUpdate(dataid,req.body,{new:true})

        return res.status(200).json({
            message: "product updated successfully",
            result:datas
        })
    }catch(error:any)
    {
      return res.status(404).json({
        message:error.message
      })
    }
}

export const deletehotel = async (req:Request, res:Response):Promise<Response> => {
    try {
        const delid = [req.params.id]
    const delhotel = await HotelOwner.findByIdAndDelete(delid)

    return res.status(200).json({
        message: "deleted",
        result: delhotel
    })
    } catch (error:any) {
        return res.status(404).json({
            message: error.message
        })
    }
}