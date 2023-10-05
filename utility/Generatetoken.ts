import jwt from "jsonwebtoken"

export const tokenGenerator = (data:any) => {
    return jwt.sign(data,  "3456yureds", {expiresIn: "10m"} )
}