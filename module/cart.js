const Cart = require('../schema/cart-schema');
const Order = require('../schema/order-schema');

exports.save = element => {
    let cart = new Cart(element);
    cart.save();
};

exports.fetchAll = email => {
    return Cart.find({ email: email }).lean();
};

exports.checkOut = elements => {
    for (let element of elements) {
        let order = new Order(element);
        order.save();
        Cart.remove(element);
    }
};