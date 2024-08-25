import mongoose, {Schema} from "mongoose"

const userSchema = new Schema({
    name:String,
    jobTitle:String,
    location:String,
    email:{type:String, required:true},
    password:{type:String,required:true},
    Posts:[mongoose.Types.ObjectId]
})

const userModel = new mongoose.model('User', userSchema)
export default userModel