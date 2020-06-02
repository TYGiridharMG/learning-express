const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

const mongooseConnect = require('./util/database');
const adminRouter = require('./routers/admin');
const shopRouter = require('./routers/shop');
const userRouter = require('./routers/user');
const expressHandlebars = require('express-handlebars');

const app = express();
const store = new MongoDBStore({
    uri: 'mongodb+srv://root:root@firstcluster-1rscz.mongodb.net/shop',
    collection: 'session',
});

app.engine('handlebars', expressHandlebars());
app.set('view engine', 'handlebars');
app.set('views', 'views');
app.use(session({
    secret: 'user',
    resave: false,
    saveUninitialized: false,
    store: store
}));

app.use(bodyParser.urlencoded({ extended: false }));
app.use("/shop", shopRouter);
app.use("/admin", adminRouter);
app.use("/user", userRouter);

app.use((req, res, next) => {
    res.render('page-not-found', { title: 'Page Not Found' });
})

mongooseConnect().then(result => {
    app.listen(3000);
});