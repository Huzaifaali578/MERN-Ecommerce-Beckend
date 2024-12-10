import mongoose, { Schema } from "mongoose";
import { ProductModel } from "./Product.js";
import { UserModel } from "./User.js";

const cartSchema = new Schema({
    product: { type: Schema.Types.ObjectId, ref: "Products", required: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    quantity: { type: Number, required: true, min: 1 }
}, { timestamps: true });


const virtual = cartSchema.virtual('id');
virtual.get(function () {
    return this._id
})

cartSchema.set("toJSON", {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id; // This removes the `_id` field
        return ret;     // Ensure other fields are returned
    },
});
    
export const CartModel = mongoose.model("Cart", cartSchema)