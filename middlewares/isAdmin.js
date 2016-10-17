'use strict';


function isAdmin(req, res, next) {
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        var err = new Error('You ain\'t no admin!');
        err.status = 403;
        next(err);
    }
}

module.exports = isAdmin;
