import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  const authCookie = req.cookies.token;
  console.log("cookie", authCookie);
  if (!authCookie) {
   return res.status(400).json({ message: "unauthorized" });
  }
  try {
    const decoded = jwt.verify(authCookie, process.env.JWT_SECRET);
    console.log("decoded", decoded);
    req.user = decoded;
    // res.status(200).json({message:"successfull",decoded:decoded})
    next();
  } catch (error) {
    res.status(401).json({ message: "Token validation failed" });
  }
};
