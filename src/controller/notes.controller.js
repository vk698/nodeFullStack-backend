import Notes from "../models/notes.model.js";

export const createNotes = async (req, res) => {
  try {
    const { Title, description } = req.body;
    const user_id = req.user.userId;
    const newNotes = new Notes({
      user: user_id,
      Title: Title,
      description: description,
    });
    console.log("notes:",newNotes)
    await newNotes.save();
    res.status(201).json(newNotes);
  } catch (error) {
    res.status(500).json({ message: "notes server error", error: error });
  }
};

export const getNotes = async (req, res) => {
  try {
    console.log("Working");

    const user_id = req.user.userId;
    console.log("ID", user_id);

    const notes = await Notes.find({ user: user_id }).sort({
      createdAt: -1,
    });

    console.log("notes", notes);

    res.status(200).json(notes);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "notes server error",
      error: error.message,
    });
  }
};

export const updatenotes = async (req, res) => {
  try {
    const params = req.params.id;
    const data = req.body;
    const updatedNotes = await Notes.findByIdAndUpdate(
      params,
      {$set: data},
      { new: true },
    );
    res.status(200).json(updatedNotes);
  } catch (error) {
    res.status(500).json({
      message: "notes server error",
      error: error,
    });
  }
};

export const deleteNotes = async(req,res)=>{
  try {
    const params = req.params.id;
    const data = req.body;
  
     const deleteNotes = await Notes.findByIdAndDelete(params)
     res.status(200).json({message:"notes dleted"})
  } catch (error) {
    res.status(500).json({message:"api not working"})
    
  }
}
