const mongoose = require("mongoose");

const cartSchema = mongoose.Schema({
    userid: {
        type: String,
        required: true
    },
    countInStock: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    product:{
        type:String,
        required:true
    },
    qty:{
        type:Number,
        required:true
    }
});

const Cartitem = mongoose.model("Cartitem", cartSchema);

module.exports = Cartitem;
