'use strict';

const fs = require( 'fs' ),
	path = require( 'path' );


const converter = {};


converter.tests = {

	openConverter: function ( converterPath ) {

		return new Promise( function ( resolve, reject ) {
			fs.access( path.resolve( converterPath ), function ( err ) {
				if ( !err && converterPath.indexOf( '.exe' ) > -1 ) {
					resolve();
				} else {
					reject( {
						message: 'Converter path is not correct or cannot be opened.'
					} );
				}
			} );

		} );

	},

	accessDirectory: function ( directory ) {

		return new Promise( function ( resolve, reject ) {
			fs.access( directory, fs.F_OK, function ( err ) {
				if ( !err ) {
					resolve();
				} else {
					reject({message: 'Folder not accessible or does not exist'});
				}
			} );
		} );
	}

};


module.exports = converter;
