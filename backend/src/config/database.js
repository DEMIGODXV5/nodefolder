import mongoose from "mongoose";

const connectDB=async() =>{
    try {
        const connectionInstance= await mongoose.connect(`${process.env.MONGODB_URI}`);//this will connect to the database and extract the connection instance from .env file
        
        console.log(`\n MongoDB connected !!!
            ${connectionInstance.connection.host}`);// this line tells the address of the connection instance

    } catch (error) {
        console.log("MongoDB connection failed",error);
        process.exit(1);// this will stop the server if connection fails
    }
}
export default connectDB;