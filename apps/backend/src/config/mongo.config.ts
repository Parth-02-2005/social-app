import mongoose from "mongoose";
import 'dotenv/config';

export const connectMongo = async () => {
    
    try {
        const mongoUri = process.env.MONGO_URI;

        if(!mongoUri) {
            throw new Error("MONGO_URI is not defined");
        }
        await mongoose.connect(mongoUri);

        console.log("database is connected successfully")
        
    } catch (error) {
        console.error("Mongo connection failed:", error);
        process.exit(1);
    }
} 