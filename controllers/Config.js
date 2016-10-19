'use strict';

const express = require( 'express' ),
	router = express.Router(),
	path = require( 'path' ),
	models = require( path.join( __dirname, '..', 'models' ) ),
	isAdmin = require( path.join( __dirname, '..', 'middlewares', 'isAdmin' ) ),
	handleError = require( path.join( __dirname, '..', 'middlewares', 'handleError' ) ),
	converter = require( path.join( __dirname, '..', 'converter' ) );

// Get configuration
router.get( '/', function ( req, res, next ) {
	models.config.findAll().then( function ( configuration ) {
		res.json( configuration );
	} ).catch( function ( err ) {
		handleError( err, next );
	} );
} );

// Post new config - should only be called on startup.
router.post( '/', function ( req, res, next ) {
	models.config.count().then( function ( count ) {
		if ( count > 0 ) {
			var err = new Error( 'Unable to create config - config already generated' );
			err.status = 400;
			return next( err );
		}
    let newConfig = req.body;
    newConfig.smtpPort = Number(req.body.smtpPort) || undefined;
		converter.tests.accessDirectory( req.body.deployFolder )
			.then( converter.tests.accessDirectory( req.body.convertedFoldersPath ) )
			.then( converter.tests.accessDirectory( req.body.fallBackFoldersPath ) )
			.then( function () {
				models.config.create( req.body ).then( function () {
					res.sendStatus( 200 );
				} ).catch( function ( err ) {
					handleError( err, next );
				} );
			} )
		.catch( function ( err ) {
			handleError( err, next );
		} );
	} ).catch( function ( err ) {
		handleError( err, next );
	} );
} );

// PUT update
router.put( '/', isAdmin, function ( req, res, next ) {
	models.converters.findById( req.body.id, {
		attributes: [ 'id' ]
	} ).then( function ( converter ) {
		// Ensure the admin boolean is an actual boolean.
		let updatedConverter = req.body;
		updatedConverter.primary = !!req.body.primary;
		// hash and salting done at model level
		converter.update( updatedConverter ).then( function () {
			res.sendStatus( 200 );
		} );
	} ).catch( function ( err ) {
		handleError( err, next );
	} );
} );

router.delete( '/', isAdmin, function ( req, res, next ) {
	models.converters.findById( req.user.id, {
		attributes: [ 'id' ]
	} ).then( function ( converter ) {
		converter.destroy().then( function () {
			res.sendStatus( 200 );
		} );
	} ).catch( function ( err ) {
		handleError( err, next );
	} );
} );

module.exports = router;
