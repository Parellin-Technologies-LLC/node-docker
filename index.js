/** ****************************************************************************************************
 * File: index.js
 * Project: docker-test
 * @author Nick Soggin <iSkore@users.noreply.github.com> on 23-Jul-2018
 *******************************************************************************************************/
'use strict';

const
	app  = require( './server' ),
	PORT = 3000,
	HOST = '0.0.0.0';

app.listen( PORT, HOST,
	() => console.log( `Running on http://${ HOST }:${ PORT }` )
);
