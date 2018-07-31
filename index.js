/** ****************************************************************************************************
 * File: index.js
 * Project: docker-test
 * @author Nick Soggin <iSkore@users.noreply.github.com> on 23-Jul-2018
 *******************************************************************************************************/
'use strict';

const
	gonfig = require( 'gonfig' ),
	debug  = require( './debug' );

gonfig
	.setLogLevel( gonfig.LEVEL.VERBOSE )
	.setEnvironment( gonfig.ENV.DEBUG )
	.load( 'server', 'config/server.json' )
	.load( 'api', 'config/api.js' )
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

const
	app            = require( './server' ),
	{ host, port } = gonfig.get( 'server' );

app.listen( port, host,
	() => console.log( `Running on http://${ host }:${ port }` )
);
