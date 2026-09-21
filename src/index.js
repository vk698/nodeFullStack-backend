import express from "express";
import dotenv from "dotenv";
import ConnectDb from "../src/config/connectDb.js";
import userAuthRoutes from "./routes/user.routes.js";
import useProfileRoutes from "./routes/profile.routes.js"
import notesRoutes from "./routes/notes.routes.js"
import cookieParser from "cookie-parser";
import cors from "cors"

dotenv.config();
ConnectDb();
const app = express();
app.use(express.json());
const port = process.env.port || 3001;
app.use(cookieParser());
app.use(cors({
    origin:["http://localhost:5173","https://nodefullstack-frontend.onrender.com"],
    credentials:true

}));
app.get("/",async(req,res)=>{
    res.status(200).json({message:"success"})
});

app.use("/auth",userAuthRoutes);
app.use("/profile", useProfileRoutes);
app.use("/notes",notesRoutes);


app.listen(port, ()=>{
    console.log(`server is running on port http://localhost:${port}`)
})
