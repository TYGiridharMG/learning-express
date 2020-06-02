const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const cartSchema = new Schema({
    productName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Cart', cartSchema);