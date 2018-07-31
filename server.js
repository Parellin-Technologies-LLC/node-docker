/** ****************************************************************************************************
 * File: server.js
 * Project: docker-test
 * @author Nick Soggin <iSkore@users.noreply.github.com> on 23-Jul-2018
 *******************************************************************************************************/
'use strict';

const
	gonfig      = require( 'gonfig' ),
	express     = require( 'express' ),
	app         = express(),
	{ resolve } = require( 'path' );

app.use( require( './lib/inspection' )() );

gonfig.set( 'api',
	gonfig.get( 'api' )
		.map( item => {
			item.exec = require( resolve( item.exec ) );

			app[ item.method.toLowerCase() ](
				item.route,
				( req, res ) => res ?
					item.exec( req, res ) :
					res.status( 500 ).send( 'unknown' )
			);

			return item;
		} )
);

module.exports = app;
