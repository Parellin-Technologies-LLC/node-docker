/** ****************************************************************************************************
 * @file: timeout.js
 * @project: node-docker
 * @author Nick Soggin <iSkore@users.noreply.github.com> on 31-Jul-2018
 *******************************************************************************************************/
'use strict';

const
	gonfig   = require( 'gonfig' ),
	config   = gonfig.get( 'server' ),
	Response = require( 'http-response-class' );

module.exports = ( req, res ) => {
	return Promise.resolve( config.timeout )
		.then( d => new Promise( res => setTimeout( res, d ) ) )
		.then( () => res.respond( new Response( 200 ) ) )
		.catch(
			e => e instanceof Response ?
				res.respond( e ) :
				res.respond( new Response( e.statusCode || 500, e.stack || e.message || e ) )
		);
};
