import mongoose from "mongoose";
export const  ConnectionDb = async ()=>{
    try {
        await mongoose.connect(process.env.MongoUrl);
        console.log(`Database connected successfully `);
    } catch (error) {
        console.log(error.message);
    }
}