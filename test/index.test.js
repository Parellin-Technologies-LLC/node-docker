/** ****************************************************************************************************
 * File: index.test.js
 * Project: docker-test
 * @author Nick Soggin <iSkore@users.noreply.github.com> on 23-Jul-2018
 *******************************************************************************************************/
'use strict';

const
	chai           = require( 'chai' ),
	chaiHTTP       = require( 'chai-http' ),
	chaiAsPromised = require( 'chai-as-promised' ),
	expect         = chai.expect;

chai.use( chaiHTTP );
chai.use( chaiAsPromised );

const app = require( '../server' );

describe( 'node test', () => {
	it( '/ "Hello World" 200 OK',
		done => {
			chai
				.request( app )
				.get( '/' )
				.end(
					( e, d ) => {
						expect( d ).to.have.status( 200 );
						expect( d.body ).to.eq( '"Hello World"' );
						done();
					}
				);
		}
	);
} );
