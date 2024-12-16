import mongoose from "mongoose";



// const url = "mongodb://127.0.0.1:27017/MERN-Ecommerce";
// console.log(url)

export const connectUsingMongoose = async () => {
    try {
        await mongoose.connect('mongodb+srv://huzaifaali578:batul@cluster0.q9gmf.mongodb.net/', {
            // useNewUrlParser: true,
            // useUnifiedTopology: true
        });
        console.log("Mongodb connected using mongoose");

    } catch (err) {
        console.log("Error while connecting to db");
        console.log(err);
    }
}


