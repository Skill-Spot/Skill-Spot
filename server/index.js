import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import userRoute from "./routes/user.routes.js"
import cors from "cors"
import cookieParser from "cookie-parser"


const app = express();

app.use(cookieParser())
app.use(express.json())
app.use(cors())

dotenv.config();
const port = process.env.PORT||3000
const URI = process.env.MONGO

try {
    mongoose.connect(URI)
    console.log("Database connection successfull")
} catch (error) {
    console.log("Error:",error)
}

app.use("/user",userRoute)

app.listen(port,(req,res)=>{
    console.log(`app is listening on port ${port}`)
})
