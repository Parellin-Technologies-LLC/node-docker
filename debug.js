/** ****************************************************************************************************
 * File: debug.js
 * Project: docker-test
 * @author Nick Soggin <iSkore@users.noreply.github.com> on 23-Jul-2018
 *******************************************************************************************************/
'use strict';

module.exports = msg => {
	if( process.env.NODE_ENV === 'debug' ) {
		console.log( msg );
	}
};
