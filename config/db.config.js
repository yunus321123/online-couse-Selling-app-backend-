import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config()
mongoose.set("strictQuery",false)
const url=process.env.MONGO_URL

const connectToDb= async()=>{
 const{connection }= await mongoose
    .connect(url)
    if(connection){
        console.log("db is connected");
        
    }
}
export default connectToDb;