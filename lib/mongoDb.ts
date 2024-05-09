// This file is for connecting to mongodb

import mongoose from "mongoose"

let isConnected: boolean = false;

export const connectToDb = async(): Promise<void> => {
    mongoose.set("strictQuery", true)

    if(isConnected){
        console.log("MongoDb is connected")
        return;
    }

    try {
        await mongoose.connect(process.env.MONGODB_URL || "",{
            dbName: "FootWear_Admin"
        })

        isConnected = true;
        console.log("Connected to MongoDB")

    }catch (err ){
        console.log(err)
    }
}