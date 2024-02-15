
import mongoose, { Schema } from "mongoose";


mongoose.connect(process.env.MONGODB_URI as string);

mongoose.Promise=global.Promise

const createUser= new Schema({
    name:String,
    email:String,
    password:String,
},{
    timestamps:true,
}
)


const User=mongoose.models.User || mongoose.model("User", createUser);

export default User;