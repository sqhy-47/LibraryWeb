//Connection function to db using mongoose, solely for connection to mongodb database
import mongoose from "mongoose";


export const connectdb = async() => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error){
        console.error(`Error: ${error.message}`);
        process.exit(1); // (1) means failure, (0) means success
    }  
}