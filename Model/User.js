import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true, default: "user" },
    addresses: { type: [Schema.Types.Mixed] },
    orders: { type: [Schema.Types.Mixed] },
    name: { type: String },
});

const virtual = userSchema.virtual('id');
virtual.get(function () {
    return this._id
})

userSchema.set("toJSON", {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id; // This removes the `_id` field
        return ret;     // Ensure other fields are returned
    },
});
    
export const UserModel = mongoose.model("User", userSchema)