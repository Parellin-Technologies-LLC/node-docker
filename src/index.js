/** ****************************************************************************************************
 * File: index.js
 * Project: docker-test
 * @author Nick Soggin <iSkore@users.noreply.github.com> on 23-Jul-2018
 *******************************************************************************************************/
'use strict';

const
	gonfig   = require( 'gonfig' ),
	http     = require( 'http' ),
	express  = require( 'express' ),
	app      = express(),
	{ join } = require( 'path' );

gonfig
	.setLogLevel( gonfig.LEVEL.VERBOSE )
	.setEnvironment( gonfig.ENV.DEBUG )
	.load( 'server', join( __dirname, 'config/server.json' ) )
	.load( 'api', join( __dirname, 'config/api.json' ) )
	.refresh();

process
	.on( 'uncaughtException', err => debug( gonfig.getErrorReport( err ) ) )
	.on( 'unhandledRejection', err => debug( gonfig.getErrorReport( err ) ) )
	.on( 'SIGINT', () => {
		debug( 'Received SIGINT, graceful shutdown...' );
		process.exit( 0 );
	} )
	.on( 'exit', code => {
		debug( `Received exit with code ${ code }, graceful shutdown...` );
		process.exit( code );
	} );

app.use( require( './lib/inspection' )() );

gonfig.get( 'api' )
	.forEach( item => {
		item.exec = require( join( __dirname, item.exec ) );
		
		app[ item.method.toLowerCase() ](
			item.route,
			( req, res ) => res ?
				item.exec( req, res ) :
				res.status( 500 ).send( 'unknown' )
		);
	} );

const server = http
	.createServer( app )
	.listen(
		{
			port: gonfig.get( 'server' ).port,
			host: gonfig.get( 'server' ).host
		},
		() => {
			const { address, port } = server.address();
			console.log( `Running on http://${ address }:${ port }` );
		}
	);
