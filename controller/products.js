const product = require('../module/product');

exports.getAddProduct = (req, res, next) => {
    res.render('add-product', {
        title: 'Add Product',
        isLoggedIn: req.session.isLoggedIn,
        isAdmin: req.session.isAdmin
    });
};

exports.postAddProduct = (req, res, next) => {
    product.fetchByName(req.body.name).then(result => {
        product.save(req.body).then(result => {
            product.fetchAll().then(products => {
                res.render("shop", {
                    title: 'All Products',
                    products: products,
                    hasProduct: products.length > 0,
                    isLoggedIn: req.session.isLoggedIn,
                    isAdmin: req.session.isAdmin
                });
            });
        }).catch(err => {
            res.render('add-product', {
                title: 'Add Product',
                exist: true,
                isLoggedIn: req.session.isLoggedIn,
                isAdmin: req.session.isAdmin
            });
        });
    });
};

exports.getGetAllProduct = (req, res, next) => {
    product.fetchAll().then(result => {
        res.render('shop', {
            title: 'Shop',
            products: result,
            hasProduct: result.length > 0,
            isLoggedIn: req.session.isLoggedIn,
            isAdmin: req.session.isAdmin
        });
    })
};

exports.getProductByName = (req, res, next) => {
    console.log(req.session.isAdmin);
    product.fetchByNameIncludes(req.query.name)
        .then(result => {
            const products = [];
            products.push(result);
            res.render('search', {
                title: 'Search',
                products: products,
                hasProduct: products.length > 0,
                isLoggedIn: req.session.isLoggedIn,
                isAdmin: req.session.isAdmin
            });
        })
        .catch(err => {
            console.log(err);
            res.render('search', {
                title: 'Search',
                hasProduct: false,
                isLoggedIn: req.session.isLoggedIn,
                isAdmin: req.session.isAdmin
            });
        });
};

exports.deleteByName = (req, res, next) => {
    const name = req.params.name;
    console.log(name);
    product.deleteByName(name);
    res.redirect('/shop');
};

exports.editByName = (req, res, next) => {
    const name = req.query.name;
    product.fetchByName(name).then(result => {
        res.render('edit', {
            title: 'Edit',
            element: result,
            isLoggedIn: req.session.isLoggedIn,
            isAdmin: req.session.isAdmin
        });
    })
};

exports.editProduct = (req, res, next) => {
    element = req.body;
    product.updateProduct(element);
    res.redirect('/shop');
};