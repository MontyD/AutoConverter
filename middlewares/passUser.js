'use strict';

function passRoomAndUser(req, res, next) {

  //room is passed as req.room
    if (!req.user) {
        return next();
    }
    res.locals.user = req.user;
    next();
}

module.exports = passRoomAndUser;
