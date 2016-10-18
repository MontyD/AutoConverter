'use strict';

function checkUser(req, res, next) {
    if (req.user) {
        return next();
    }
    var err = new Error('Please log in to view this page');
    err.status = 401;
    return next(err);
}

module.exports = checkUser;
