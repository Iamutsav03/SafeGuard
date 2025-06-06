import asyncHandler from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";

export const verifyToken = asyncHandler(async (req, res, next) => {
    const token = req.cookies?.accessToken ||req.headers["authorization"]?.split(" ")[1]
    console.log(token)
    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }
    
    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(403).json({ message: "Invalid token" });
    }
})