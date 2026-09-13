import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    email:{
        type:"string",
        required:true,
        unique:true
    },
    password:{
        type:"string",
        required:true,
        min:6,
        max:18
    }
});
 const User = mongoose.model("users",userSchema);
 export default User;