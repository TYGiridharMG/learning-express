const cart = require('../module/cart')
const product = require('../module/product');

exports.addToCart = (req, res, next) => {
    product.fetchByName(req.query.name).then(result => {
        console.log(req.session.email);
        element = {
            productName: result.name,
            email: req.session.email,
            price: result.price,
        }
        cart.save(element);
        res.redirect('/shop');
    });
};

exports.getCart = (req, res, next) => {
    cart.fetchAll(req.session.email).then(result => {
        res.render('cart', {
            title: 'Cart',
            isLoggedIn: req.session.isLoggedIn,
            isAdmin: req.session.isAdmin,
            cartItems: result,
            hasCartItems: result.length > 0
        });
    });
};

exports.checkout = (req, res, next) => {
    if (req.body.card.toString().length === 16 && req.body.cvv.toString().length === 3) {
        cart.fetchAll(req.session.email).then(result => {
            let cartItems = [];
            cartItems.push(result);
            cart.checkOut(cartItems);
            res.redirect('/shop');
        });
    }
};

exports.getCheckOut = (req, res, next) => {
    res.render('check-out', {
        title: 'Check Out',
        isLoggedIn: req.session.isLoggedIn,
        isAdmin: req.session.isAdmin,
    });
};