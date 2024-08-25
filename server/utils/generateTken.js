import jwt from "jsonwebtoken"
export const creaetokenAndSaveCookie = (userId,res)=>{
    const token = jwt.sign({userId},process.env.JTW_TOKEN,{
        expiresIn:"10d"
    });
    res.cookie("jwt",token,{
        httpOnly:true,
        secure:true
    })
    console.log(res.cookie)
}