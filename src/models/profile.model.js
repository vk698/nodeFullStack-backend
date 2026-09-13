import mongoose, { Schema } from "mongoose";

const profileSchema = new Schema({
    user:{
          type:Schema.Types.ObjectId,
          ref:"users",
          required:true
    },
    username:{
        type:"string",
        min:3,
        max:20,
        unique:true
    },
    image:{
        type:"string"
    },
    Age:{
        type:Number,
        min:1,max:500,
        
    },
    gender:{
        type:"string"
    }
})

const Profile = mongoose.model("profiles",profileSchema);
export default Profile;