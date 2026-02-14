import jwt from "jsonwebtoken";

export const auth=async(req,res,next)=>{
    try{
        const token=req.cookies.token || req.headers.authorization?.split(" ")[1];
        if(!token){
            return res.status(401).json({ message: "No token provided" });
        }
        
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        req.user=decoded;
        next();
    }catch(err){
        console.error("Authentication error:", err);
        res.status(401).json({ message: "Unauthorized", error: err.message });
    }
}