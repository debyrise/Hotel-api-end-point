import mongoose from "mongoose"
 
interface  hotelauth {
    fullName : string,
    email:string,
    password: string,
}

interface iHotelauth extends hotelauth, mongoose.Document{}
    const Hotelschama = new mongoose.Schema({
        fullName: {
            type: String,
            require: true
        },
        email: {
            type: String,
            require:true
        },
        password: {
            type: String,
            require:true
        },
    })
   


export default mongoose.model <iHotelauth> ("hotel", Hotelschama)