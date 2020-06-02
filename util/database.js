const mongoose = require('mongoose');

const mongooseConnect = () => {
    return mongoose.connect('mongodb+srv://root:root@firstcluster-1rscz.mongodb.net/shop?retryWrites=true');
}

module.exports = mongooseConnect;