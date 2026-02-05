import mongoose from 'mongoose'

console.log("hello");
console.log("MONGO_URI:", process.env.MONGO_URI);
export const connectDB = async () => {
     try{
        console.log("entered in try block");
        const connect = await mongoose.connect(process.env.MONGO_URI);
        console.log("exist from try block");
        console.log("connected successfully", connect.connection.host, "host", connect.connection.name, "name");
    }   catch(err){
        console.log("Error in connecting to database",err);
        process.exit(1);
    }
};



