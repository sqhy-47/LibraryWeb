import mongoose, { mongo } from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    image: {
        type: String,
        required: true
    }
}, {
    timestamps: true //Created at, Updated at
});

//tells mongoose, make a product collection and look at this schema
const Product = mongoose.model('Product', productSchema);
export default Product;