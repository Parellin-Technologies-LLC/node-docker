/** ****************************************************************************************************
 * @file: home.js
 * @project: node-docker
 * @author Nick Soggin <iSkore@users.noreply.github.com> on 31-Jul-2018
 *******************************************************************************************************/
'use strict';

const
	gonfig   = require( 'gonfig' ),
	Response = require( 'http-response-class' );

module.exports = ( req, res ) => {
	return res.respond(
		new Response( 200, `${ gonfig.get( 'name' ) }-v${ gonfig.get( 'version' ) }` )
	);
};
