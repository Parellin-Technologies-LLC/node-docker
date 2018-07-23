/** ****************************************************************************************************
 * File: server.js
 * Project: docker-test
 * @author Nick Soggin <iSkore@users.noreply.github.com> on 23-Jul-2018
 *******************************************************************************************************/
'use strict';

const
	express = require( 'express' ),
	app     = express();

const debug = require( './debug' );

app.get( '/', ( req, res ) => {
	debug( req.path );
	res
		.status( 200 )
		.json( JSON.stringify( 'Hello World' ) )
		.end();
} );

module.exports = app;
