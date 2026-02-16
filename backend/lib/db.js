import mongoose from 'mongoose'

export const connectDB = async () => {
     try{
        console.log("process.env.MONGO_URI", process.env.MONGO_URI);
        const connect = await mongoose.connect(process.env.MONGO_URI, {
            dbName: "Cluster0",          //  FORCE DB
      authSource: "admin",  // force authentication
        });
        console.log("connected successfully", connect.connection.host, "host", connect.connection.name, "name");
    }   catch(err){
        console.log("Error in database",err);
        process.exit(1);
    }
};



