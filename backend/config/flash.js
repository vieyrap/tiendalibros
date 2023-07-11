import flash from 'connect-flash';

const configureFlash = (app) => {
    app.use(flash());

    app.use((req, res, next) => {
        res.locals.success_msg = req.flash('success_msg');
        res.locals.error_msg = req.flash('error_msg');
        res.locals.error = req.flash('error');
        res.locals.currentUser = req.user;
        next();
    });
};

export default configureFlash;