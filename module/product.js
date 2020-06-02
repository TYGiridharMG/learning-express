const Product = require('../schema/product-schema');

exports.save = (element) => {
    const product = new Product(element);
    return product.save();
}

exports.fetchAll = () => {
    return Product.find({}).lean();
}

exports.fetchByName = (name) => {
    return Product.findOne({ name: name }).lean();
}

exports.fetchByNameIncludes = (name) => {
    return Product.findOne({ name: { $regex: '.*' + name + '.*' } }).lean();
}

exports.deleteByName = (name) => {
    Product.deleteOne({ name: name }).then().catch();
}

exports.updateProduct = (element) => {
    Product.updateOne({ name: element.name }, {
        $set: {
            price: element.price,
            company: element.company,
            category: element.category
        }
    }).then().catch();
}