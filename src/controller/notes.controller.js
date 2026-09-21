import Notes from "../models/notes.model.js";

export const createNotes = async (req, res) => {
  try {
    const { Title, description } = req.body;
    const newNotes = new Notes({
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
    const notes = await Notes.find();

    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({
      message: "notes server error",
      error: error,
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
