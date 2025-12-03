import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export const auth = async(req, res, next) => {
//  const authHeader = req.headers.authorization;

// const token =
//   req.cookies?.accessToken ||
//   (authHeader && authHeader.startsWith("Bearer ") 
//      ? authHeader.split(" ")[1] 
//      : authHeader);  // fallback to raw token

//   if (!token) return res.status(401).json({ message: "Unauthorized request" });

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    
     const user = await User.findById(decodedToken.id).select("-password")

      if (!user) {
            
            return res.status(401).json({message:"Invalid Access token"}) 
        }

    req.user = user;
    next();
  } catch {
    return res.status(401).json({ message: "Invalid Token" });
  }
};




// export const fetchAdminAccess = (roles = [])=>{
//     return function(req,res,next){
//         if(!req.user){
//             return res.status(401).json(ErrorResponse(401,"Invalid access token"))
//         }
//         if(!roles.includes(req.user.isAdmin)){
//             return res.status(400).json(ErrorResponse(400,"you are not authenticated"))
//         }
//         next()
//     }
// }

