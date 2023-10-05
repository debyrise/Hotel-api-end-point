import mongoose from "mongoose";

interface HotelAuth{
    HotelName: string,
    Address: string,
    Avater: string,
    password: string,
    email:string,
    isActive:boolean,
    des: string

}

interface iHotelauth extends HotelAuth, mongoose.Document{}

const ownerschema = new mongoose.Schema(
    {
        HotelName : {
            type: String,
            lowercase: true,
        },

        Address : {
            type: String,
        },

        des : {
            type: String,
        },

        password : {
            type: String,
            unique: true,
        },

        email : {
            type: String,
            lowercase: true,
        },

        isActive : {
            type: String,
            lowercase: true,
        },

        Avater : {
            type: String,
        },





        
    },
    {timestamps: true}

)

export default mongoose.model<iHotelauth>(" HotelAuth",ownerschema )