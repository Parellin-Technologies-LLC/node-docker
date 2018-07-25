/** ****************************************************************************************************
 * File: server.js
 * Project: docker-test
 * @author Nick Soggin <iSkore@users.noreply.github.com> on 23-Jul-2018
 *******************************************************************************************************/
'use strict';

const
	express = require( 'express' ),
	app     = express();

const
	debug  = require( './debug' ),
	path   = require( 'path' ),
	os     = require( 'os' ),
	crypto = require( 'crypto' ),
	{
		createWriteStream,
		promises: fs
	}      = require( 'fs' );

app.use( ( req, res, next ) => {
	req.startTime = process.hrtime();
	next();
} );

function finishRequest( req, res ) {
	const
		hrtime = process.hrtime( req.startTime ),
		t      = ( hrtime[ 0 ] * 1e9 ) + hrtime[ 1 ];

	return res
		.status( 200 )
		.json( {
			internalTime: t < 1000 ? `${ t.toFixed( 2 ) } ns` :
				t < 1000000 ? `${ ( t / 1e3 ).toFixed( 2 ) } μs` :
					t < 1000000000 ? `${ ( t / 1e6 ).toFixed( 2 ) } ms` :
						`${ ( t / 1e9 ).toFixed( 2 ) } s`,
			message: req.path
		} )
		.end();
}

app.get( '/', ( req, res ) => {
	debug( req.path );
	return finishRequest( req, res );
} );

app.get( '/cpu', ( req, res ) => {
	debug( req.path );

	// 65536 bytes
	crypto.randomBytes( 2 ** 16 );

	return finishRequest( req, res );
} );

app.get( '/mem', ( req, res ) => {
	debug( req.path );

	// 1 GB
	const buf = Buffer.allocUnsafe( 2 ** 30 );
	buf.fill( 0 );

	return finishRequest( req, res );
} );

app.get( '/io', async ( req, res ) => {
	debug( req.path );

	const
		dtmp    = path.join( os.tmpdir(), `${ process.title }-` ),
		tmp     = await fs.mkdtemp( dtmp ),
		ftmp    = path.join( tmp, 'test.txt' ),
		wstream = createWriteStream( ftmp );

	let x = 0;

	// write 32 bytes 65536 times uncorked 64 times
	// 2 MB
	for( let i = 0; i < 2 ** 16; i++ ) {
		if( x === 0 ) {
			wstream.cork();
		} else if( x === 2 ** 10 ) {
			wstream.uncork();
			x = -1;
		}

		wstream.write( '00000000000000000000000000000000' );
		x++;
	}

	wstream.end();

	// console.log( ftmp );
	// await new Promise( res => setTimeout( res, 10000 ) );

	await fs.unlink( ftmp );
	await fs.rmdir( tmp );

	return finishRequest( req, res );
} );

module.exports = app;
