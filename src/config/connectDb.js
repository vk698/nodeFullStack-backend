import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();


const ConnectDb= async()=>{
    try {
        await mongoose.connect(process.env.MongoDB_URL);
        console.log("Database Connected")
    
    } catch (error) {
        console.log(error)
    }
}

export default ConnectDb;