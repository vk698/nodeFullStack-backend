import mongoose, { Schema } from "mongoose";


const notesSchema = new Schema(
    {
      Title:{
        type:"string",
        min:3,
        max:20,
        required:true
      },
     description:{
        type:"string",
        min:3,
        max:100
     }
    },
    { timestamps:true}
)
 const Notes = mongoose.model("notes",notesSchema);
 export default Notes;