import mongoose, { Schema } from "mongoose";
import { UserModel } from "./User.js";

const orderSchema = new Schema({
    items: { type: [Schema.Types.Mixed], required: true },
    totalAmount: {type: Number},
    totalItems: { type: Number },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    // TODO: we can add enu type 
    paymentMethod: { type: String, required: true },
    status: { type: String, required: true },
    addressSelected: {type: Schema.Types.Mixed, required: true}
}, { timestamps: true })

const virtual = orderSchema.virtual('id');
virtual.get(function () {
    return this._id
});

orderSchema.set("toJSON", {
    virtuals: true,
    versionKey: false,
    transform: (doc, ret) => {
        delete ret._id
        return ret
    }
});

export const OrderModel = mongoose.model("Order", orderSchema);










// {
//     "id": "9bfc",
//     "items": [
//       {
//         "id": "5",
//         "quantity": 3,
//         "user": "653c",
//         "title": "Red Nail Polish",
//         "description": "The Red Nail Polish offers a rich and glossy red hue for vibrant and polished nails. With a quick-drying formula, it provides a salon-quality finish at home.",
//         "category": "beauty",
//         "price": 8.99,
//         "discountPercentage": 2.46,
//         "rating": 3.91,
//         "stock": 71,
//         "tags": [
//           "beauty",
//           "nail polish"
//         ],
//         "brand": "Nail Couture",
//         "sku": "YUIIIP4W",
//         "weight": 9,
//         "dimensions": {
//           "width": 8.11,
//           "height": 10.89,
//           "depth": 29.06
//         },
//         "warrantyInformation": "1 year warranty",
//         "shippingInformation": "Ships in 1 week",
//         "availabilityStatus": "In Stock",
//         "reviews": [
//           {
//             "rating": 5,
//             "comment": "Very pleased!",
//             "date": "2024-05-23T08:56:21.619Z",
//             "reviewerName": "Leo Rivera",
//             "reviewerEmail": "leo.rivera@x.dummyjson.com"
//           },
//           {
//             "rating": 5,
//             "comment": "Great product!",
//             "date": "2024-05-23T08:56:21.619Z",
//             "reviewerName": "Evan Reed",
//             "reviewerEmail": "evan.reed@x.dummyjson.com"
//           },
//           {
//             "rating": 4,
//             "comment": "Highly recommended!",
//             "date": "2024-05-23T08:56:21.619Z",
//             "reviewerName": "Evelyn Sanchez",
//             "reviewerEmail": "evelyn.sanchez@x.dummyjson.com"
//           }
//         ],
//         "returnPolicy": "No return policy",
//         "minimumOrderQuantity": 46,
//         "meta": {
//           "createdAt": "2024-05-23T08:56:21.619Z",
//           "updatedAt": "2024-05-23T08:56:21.619Z",
//           "barcode": "3212847902461",
//           "qrCode": "https://assets.dummyjson.com/public/qr-code.png"
//         },
//         "images": [
//           "https://cdn.dummyjson.com/products/images/beauty/Red%20Nail%20Polish/1.png"
//         ],
//         "thumbnail": "https://cdn.dummyjson.com/products/images/beauty/Red%20Nail%20Polish/thumbnail.png"
//       },
//       {
//         "id": "10",
//         "quantity": 2,
//         "user": "653c",
//         "title": "Gucci Bloom Eau de",
//         "description": "Gucci Bloom by Gucci is a floral and captivating fragrance, with notes of tuberose, jasmine, and Rangoon creeper. It's a modern and romantic scent.",
//         "category": "fragrances",
//         "price": 79.99,
//         "discountPercentage": 8.9,
//         "rating": 2.69,
//         "stock": 93,
//         "tags": [
//           "fragrances",
//           "perfumes"
//         ],
//         "brand": "Gucci",
//         "sku": "FFKZ6HOF",
//         "weight": 10,
//         "dimensions": {
//           "width": 22.28,
//           "height": 17.81,
//           "depth": 27.18
//         },
//         "warrantyInformation": "No warranty",
//         "shippingInformation": "Ships in 2 weeks",
//         "availabilityStatus": "In Stock",
//         "reviews": [
//           {
//             "rating": 5,
//             "comment": "Great value for money!",
//             "date": "2024-05-23T08:56:21.620Z",
//             "reviewerName": "Aria Parker",
//             "reviewerEmail": "aria.parker@x.dummyjson.com"
//           },
//           {
//             "rating": 4,
//             "comment": "Excellent quality!",
//             "date": "2024-05-23T08:56:21.620Z",
//             "reviewerName": "Natalie Harris",
//             "reviewerEmail": "natalie.harris@x.dummyjson.com"
//           },
//           {
//             "rating": 4,
//             "comment": "Fast shipping!",
//             "date": "2024-05-23T08:56:21.620Z",
//             "reviewerName": "Ava Harris",
//             "reviewerEmail": "ava.harris@x.dummyjson.com"
//           }
//         ],
//         "returnPolicy": "No return policy",
//         "minimumOrderQuantity": 10,
//         "meta": {
//           "createdAt": "2024-05-23T08:56:21.620Z",
//           "updatedAt": "2024-05-23T08:56:21.620Z",
//           "barcode": "8232190382069",
//           "qrCode": "https://assets.dummyjson.com/public/qr-code.png"
//         },
//         "images": [
//           "https://cdn.dummyjson.com/products/images/fragrances/Gucci%20Bloom%20Eau%20de/1.png",
//           "https://cdn.dummyjson.com/products/images/fragrances/Gucci%20Bloom%20Eau%20de/2.png",
//           "https://cdn.dummyjson.com/products/images/fragrances/Gucci%20Bloom%20Eau%20de/3.png"
//         ],
//         "thumbnail": "https://cdn.dummyjson.com/products/images/fragrances/Gucci%20Bloom%20Eau%20de/thumbnail.png"
//       },
//       {
//         "id": "3",
//         "quantity": 1,
//         "user": "653c",
//         "title": "Powder Canister",
//         "description": "The Powder Canister is a finely milled setting powder designed to set makeup and control shine. With a lightweight and translucent formula, it provides a smooth and matte finish.",
//         "category": "beauty",
//         "price": 14.99,
//         "discountPercentage": 18.14,
//         "rating": 3.82,
//         "stock": 59,
//         "tags": [
//           "beauty",
//           "face powder"
//         ],
//         "brand": "Velvet Touch",
//         "sku": "9EN8WLT2",
//         "weight": 8,
//         "dimensions": {
//           "width": 24.16,
//           "height": 10.7,
//           "depth": 11.07
//         },
//         "warrantyInformation": "2 year warranty",
//         "shippingInformation": "Ships in 1-2 business days",
//         "availabilityStatus": "In Stock",
//         "reviews": [
//           {
//             "rating": 5,
//             "comment": "Very happy with my purchase!",
//             "date": "2024-05-23T08:56:21.618Z",
//             "reviewerName": "Ethan Thompson",
//             "reviewerEmail": "ethan.thompson@x.dummyjson.com"
//           },
//           {
//             "rating": 4,
//             "comment": "Great value for money!",
//             "date": "2024-05-23T08:56:21.618Z",
//             "reviewerName": "Levi Hicks",
//             "reviewerEmail": "levi.hicks@x.dummyjson.com"
//           },
//           {
//             "rating": 5,
//             "comment": "Highly impressed!",
//             "date": "2024-05-23T08:56:21.618Z",
//             "reviewerName": "Hazel Gardner",
//             "reviewerEmail": "hazel.gardner@x.dummyjson.com"
//           }
//         ],
//         "returnPolicy": "60 days return policy",
//         "minimumOrderQuantity": 25,
//         "meta": {
//           "createdAt": "2024-05-23T08:56:21.618Z",
//           "updatedAt": "2024-05-23T08:56:21.618Z",
//           "barcode": "0516267971277",
//           "qrCode": "https://assets.dummyjson.com/public/qr-code.png"
//         },
//         "images": [
//           "https://cdn.dummyjson.com/products/images/beauty/Powder%20Canister/1.png"
//         ],
//         "thumbnail": "https://cdn.dummyjson.com/products/images/beauty/Powder%20Canister/thumbnail.png"
//       }
//     ],
//     "user": {
//       "id": "653c",
//       "email": "huzaifaali578@gmail.com",
//       "password": "Huzaifa123",
//       "addresses": [
//         {
//           "name": "Huzaifa",
//           "phone": "8349875553",
//           "email": "huzaifaali578@gmail.com",
//           "country": "India",
//           "street": "Khaparganj Near Bohta Masjid",
//           "city": "Bilaspur",
//           "State": "Chhattisgarh",
//           "pinCode": "495001"
//         },
//         {
//           "name": "Batul ChiniWala",
//           "phone": "4368465388",
//           "email": "hdgf@bsd.com",
//           "country": "India",
//           "street": "sadar baxar",
//           "city": "kanor",
//           "State": "up",
//           "pinCode": "547883"
//         }
//       ]
//     },
//     "totalAmount": 201.94,
//     "totalItems": 6,
//     "paymentMethod": "cash",
//     "addressSelected": {
//       "name": "Huzaifa",
//       "phone": "8349875553",
//       "email": "huzaifaali578@gmail.com",
//       "country": "India",
//       "street": "Khaparganj Near Bohta Masjid",
//       "city": "Bilaspur",
//       "State": "Chhattisgarh",
//       "pinCode": "495001"
//     },
//     "status": "delivered"
//   }