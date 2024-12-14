import mongoose from "mongoose";



// const url = "mongodb://127.0.0.1:27017/MERN-Ecommerce";
// console.log(url)

export const connectUsingMongoose = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB_URL, {
            // useNewUrlParser: true,
            // useUnifiedTopology: true
        });
        console.log("Mongodb connected using mongoose");

    } catch (err) {
        console.log("Error while connecting to db");
        console.log(err);
    }
}


