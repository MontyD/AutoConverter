'use strict';

const fs = require( 'fs' ),
	path = require( 'path' );


const converter = {};


converter.testOpenable = function ( converterPath ) {

	return new Promise( function ( resolve, reject ) {
		fs.exists( path.resolve( converterPath ), function ( exists ) {
      if (exists && converterPath.indexOf('.exe') > -1) {
        resolve();
      } else {
        reject({message: 'Converter path is not correct or cannot be opened.'});
      }
		} );

	} );

};


module.exports = converter;
