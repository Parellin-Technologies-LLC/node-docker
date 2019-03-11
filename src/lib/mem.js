/** ****************************************************************************************************
 * @file: mem.js
 * @project: node-docker
 * @author Nick Soggin <iSkore@users.noreply.github.com> on 31-Jul-2018
 *******************************************************************************************************/
'use strict';

const Response = require( 'http-response-class' );

module.exports = ( req, res ) => {
	// 1 GB
	const buf = Buffer.allocUnsafe( 2 ** 30 );
	buf.fill( 0 );

	return res.respond( new Response( 200, req.path ) );
};
