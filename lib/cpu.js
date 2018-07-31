/** ****************************************************************************************************
 * @file: cpu.js
 * @project: node-docker
 * @author Nick Soggin <iSkore@users.noreply.github.com> on 31-Jul-2018
 *******************************************************************************************************/
'use strict';

const
	debug    = require( '../debug' ),
	crypto   = require( 'crypto' ),
	Response = require( 'http-response-class' );

module.exports = ( req, res ) => {
	debug( req.path );

	// 65536 bytes
	crypto.randomBytes( 2 ** 16 );

	return res.respond( new Response( 200, req.path ) );
};
