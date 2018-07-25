/** ****************************************************************************************************
 * File: index.js
 * Project: docker-test
 * @author Nick Soggin <iSkore@users.noreply.github.com> on 23-Jul-2018
 *******************************************************************************************************/
'use strict';

const
	config = require( './package' ),
	app    = require( './server' ),
	PORT   = 3000,
	HOST   = '0.0.0.0';

process.title = config.name;

app.listen( PORT, HOST,
	() => console.log( `Running on http://${ HOST }:${ PORT }` )
);
