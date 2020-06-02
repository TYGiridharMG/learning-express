const user = require('../module/user');

exports.getUserRegistration = (req, res, next) => {
    if (req.session.isLoggedIn) {
        res.redirect('/')
    } else {
        res.render('register', {
            title: 'Register',
            isLoggedIn: false,
            isAdmin: false
        });
    }
};

exports.postUserRegistration = (req, res, next) => {
    user.save(req.body).then(result => {
        res.render('login', {
            title: 'Login',
            isLoggedIn: false,
            isAdmin: false
        });
    }).catch(err => {
        console.log(err);
        res.render('register', {
            title: 'Register',
            exist: true,
            isLoggedIn: false,
            isAdmin: false
        });
    });
};

exports.getLogin = (req, res, next) => {
    if (req.session.isLoggedIn) {
        res.render('', {
            title: 'Home',
            isLoggedIn: true,
            isAdmin: req.session.isAdmin
        });
    } else {
        res.render('login', {
            title: 'Login',
            isLoggedIn: false,
            isAdmin: false
        });
    }
}

exports.postLogin = (req, res, next) => {
    user.auth(req.body).then(result => {
        req.session.email = result[0].email;
        req.session.isLoggedIn = true;
        if (result.role === 'ROLE_ADMIN') {
            req.session.isAdmin = true;
        } else {
            req.session.isAdmin = false;
        }
        res.redirect('/shop');
    });
};

exports.home = (req, res, next) => {
    res.render('', {
        title: 'Home',
        isLoggedIn: req.session.isLoggedIn,
        isAdmin: req.session.isAdmin
    });
}

exports.logout = (req, res, next) => {
    req.session.destroy(() => {
        res.redirect('/user/login')
    })
}