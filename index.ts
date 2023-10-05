import "./database/db"
import express, {Application, Request,Response} from "express"
import Authrouter from "./ROUTER/Authrouter"
import Hotelrouter from "./ROUTER/Hotelrouter"
import cors from "cors"
import morgan from "morgan"







const port: number = 2000
const app :Application= express()

app.use(express.json())
app.use(cors())
app.use("/api/v1",Authrouter)
app.use("/api/v1",Hotelrouter) 
app.use(morgan("dev"))

app.use ("/uploads", express.static("uploads"))


app.get("/", async (req: Request, res:Response) => {
    res.status(201).json({message: "api is ready"})
})


const server = app.listen(port, () => {
    console.log("listening to port", port)
})
    
    process.on ("uncaughtException", (error:any) => {
        console.log(" uncaughtException happend", error)
        process.exit(1)
    });

    process.on ("unhandledRejection", (reason:any) => {
        console.log("stop here:unhandledRejection ")
        console.log(reason)


        server.close(() => {
            process.exit
        })
    })