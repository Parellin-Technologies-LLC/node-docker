/** ****************************************************************************************************
 * @file: io.js
 * @project: node-docker
 * @author Nick Soggin <iSkore@users.noreply.github.com> on 31-Jul-2018
 *******************************************************************************************************/
'use strict';

const
	path     = require( 'path' ),
	os       = require( 'os' ),
	{
		createWriteStream,
		promises: fs
	}        = require( 'fs' ),
	Response = require( 'http-response-class' );


module.exports = async ( req, res ) => {
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

	return res.respond( new Response( 200, req.path ) );
};
