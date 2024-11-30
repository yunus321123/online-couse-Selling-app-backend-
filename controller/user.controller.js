import User from "../model/user.model.js";
import AppError from "../utils/error.utl.js";
const cookieOptions={
    maxAge:7*24*60,//7 days
    httpOnly:true,
    secure:true
}



const register=async(req,res,next)=>{
    const{fullName,email,password}=req.body;
    if(!fullName||!email||!password){
        return next(new AppError("All fields are required",400))
    }
    const userExist=await User.findOne({email})
    if(userExist){
        return next(new AppError("email already exits",400))
    }

    const user=await User.create({
        fullName,
        email,
        password,
        avatar:{
            public_id:email,
            secure_url:"https:fgsaghsajfgbsaj"
        }
    })
    if(!user){
        return next(new AppError("User registration failed,please try again",400))

    }
    //file upload
    await user.save()
    user.password=undefined;
    const token=  await user.generateJWTToken()
    res.cookie('token',cookieOptions)

    res.status(201).json({
        success:true,
        message:"user successfully created",
        user,
    })

    
}








const login=async (req,res)=>{
try {
    const{ email,password}=req.body
    if(!email||!password){
        next(new AppError("all fields are required",400))}
        const user= await User.findOne({
            email
        }).select('+password ');
        if(!email || !user.comparePassword(password)){
            return next (new AppError('email or password not matched',400))

        }
    const token=await user.generateJWTToken()
    user.password=undefined
    res.cookie('token',token,cookieOptions)
    res.status(200).json({
        success:true,
        message:"user logedin succesfully",
        user,
    })

    
} catch (error) {
    return next(new AppError(error.message,500))
    
}

   
}






const logout=(req,res)=>{




}





const getProfile=(req,res)=>{

}



export {
    register,
    login,
    logout,
    getProfile
}