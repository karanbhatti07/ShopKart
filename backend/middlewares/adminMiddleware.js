
import User from "../models/User_model.js"

export const adminMiddleware = async(req,res,next) => {
  try{
    const user = await User.findById(req.user.id)
    if(!user){
      return res.status(404).json({
        message: "User not found"
      });
    }
    else if(user.role !== "admin"){
      return res.status(403).json({
        message: "Only Admin allowed"
      });
    }
    
    next()
  }
catch(error){
  console.log(error);

  res.status(500).json({
    message: "Server error"
  });
}
}