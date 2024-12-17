import mongoose from "mongoose";

export const connectUsingMongoose = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("MongoDB connected!");
        console.log(process.env.MONGO_DB_URL);
    } catch (error) {
        console.error("MongoDB connection error:", error);
    }
};
