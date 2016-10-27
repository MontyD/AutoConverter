'use strict';

const express = require('express'),
    router = express.Router(),
    fs = require('fs'),
    path = require('path'),
    models = require(path.join(__dirname, '..', 'models')),
    handleError = require(path.join(__dirname, '..', 'middlewares', 'handleError')),
    converter = require(path.join(__dirname, '..', 'converter')),
    upload = require('multer')({
        dest: 'files/uploads/'
    });


// Get all conversions by query
router.get('/', (req, res, next) => {
    let limit = req.query.limit;
    let offset = req.query.offset;
    let query = req.query;
    query.userId = req.user.id;
    delete query.limit;
    delete query.offset;

    models.currentConversions.findAll({
            where: query,
            limit: limit,
            offset: offset
        })
        .then(conversions => res.json(conversions))
        .catch(err => handleError(err, next));
});

// Get count by query
router.get('/count', (req, res, next) => {
    let query = req.query;
    query.userId = req.user.id;
    models.currentConversions.count({
            where: query
        })
        .then(count => res.json(count))
        .catch(err => handleError(err, next));
});



router.post('/', upload.single('file'), (req, res, next) => {
    // Check the extension for sfx or ufx.
    if (!(/\.(sfx|ufx|png)/gi).test(path.extname(req.file.originalname))) {
        fs.unlink(path.resolve(__dirname, '..', req.file.path), () => {
            let error = new Error('Uploads must have the extension .ufx or .sfx');
            error.status = 400;
            return next(error);
        });
    } else {
        models.currentConversions.create({
                name: req.file.originalname,
                path: req.file.path,
                status: 'Uploaded',
                userId: req.user.id
            })
            .then(conversion => {
                res.io.emit('newUploaded', conversion);
                return res.json(conversion);
            })
            .catch(err => handleError(err, next));
    }
});

router.delete('/:id', (req, res, next) => {

    models.currentConversions.findById(req.params.id)
        .then(conversion => {
            if (conversion.userId !== req.user.id && !req.user.isAdmin) {
                let error = new Error('You cannot delete that form!');
                error.status = 403;
                return next(error);
            }
            conversion.destroy()
                .then(() => {
                    fs.unlink(path.resolve(__dirname, '..', conversion.path), err => {
                        if (err) {
                            return handleError(err, next);
                        }
                        res.io.emit('deletedUploaded', conversion);
                        res.sendStatus(200);
                    });
                })
                .catch(err => handleError(err, next));
        })
        .catch(err => handleError(err, next));
});




module.exports = router;
