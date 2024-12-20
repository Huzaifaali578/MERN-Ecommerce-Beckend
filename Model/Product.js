import mongoose, { Schema } from "mongoose";

const productSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, min:[1, "wrong min price"], max:[10000, "wron max price"], required: true },
    discountPercentage: { type: Number, min:[1, "wrong min discountPercentage"], max:[99, "wron max discountPercentage"], required: true },
    rating: { type: Number, min:[0, "wrong min rating"], max:[5, "wron max rating"], default: 0 },
    stock: { type: Number, min: [0, "wrong min stock"], default: 0 },
    brand: { type: String, required: true },
    category: { type: String, required: true },
    thumbnail: { type: String, required: true },
    images: { type: [String], required: true },
    deleted: { type: Boolean, default: false },
})

const virtual = productSchema.virtual('id');
virtual.get(function () {
    return this._id
})

productSchema.set("toJSON", {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id; // This removes the `_id` field
        return ret;     // Ensure other fields are returned
    },
});
    
export const ProductModel = mongoose.model("Products", productSchema)