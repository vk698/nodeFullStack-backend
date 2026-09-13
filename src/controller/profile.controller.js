import Profile from "../models/profile.model.js";
import { fileUpload } from "../storage/storage.js";

export const profile = async (req, res) => {
  try {
    const { username, Age, gender } = req.body;
    const uploadedImage = req.file;
    const user_id = req.user.userId;
    console.log("userId", user_id);
    const upload = await fileUpload(
      uploadedImage.buffer,
      uploadedImage.originalname,
    );
    console.log(upload);
    const newProfile = new Profile({
      user: user_id,
      username,
      Age,
      gender,
      image: upload.url,
    });
    await newProfile.save();
    res.status(200).json({ message: "Profile created successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error  01", error: error });
  }
};

export const findProfile = async (req, res) => {
  try {
    const id = req.user.userId;

    console.log("profile", req.user.userId);

    const profile = await Profile.findOne({ user: id });

    console.log("profileData", profile);

    res.status(200).json({ message: "success", profile: profile });
  } catch (error) {
    res.status(500).json({ message: "findProfile API failed", error: error });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const params = req.params.id;
    console.log("Params", params);
    const data = req.body;
    console.log("Data", data);

    fileUpload();

    const isProfileExists = await Profile.findOne({ _id: params });

    if (!isProfileExists) {
      return res.status(404).json({ message: "Profile not found !" });
    }

    const updateProfile = await Profile.findByIdAndUpdate(
      params,
      { $set: data },
      { new: true, runValidators: true },
    );

    if (!updateProfile) {
      return res.status(404).json({ message: "User not found" });
    }

    console.log("DB_RES", updateProfile);

    res
      .status(200)
      .json({ message: "Profile updated successfully", data: updateProfile });
  } catch (error) {
    res.status(500).json({ message: "server error", error: error });
  }
};

export const deleteProfile = async (req, res) => {
  try {
    const params = req.params.id;
    const data = req.body;
    const profileExists = await Profile.findOne({ _id: params });
    if (!profileExists) {
      res.status(200).json({ message: "user not found" });
    }
    const deleteProfile = await Profile.findByIdAndDelete(params);
    res.status(200).json({ message: "profile deleted" });


  } catch (error) {
    res.status(500).json({ message: "API is not workng" });
  }
};
