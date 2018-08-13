/** ****************************************************************************************************
 * File: index.test.js
 * Project: docker-test
 * @author Nick Soggin <iSkore@users.noreply.github.com> on 23-Jul-2018
 *******************************************************************************************************/
'use strict';

const gonfig = require( 'gonfig' );

gonfig
	.setLogLevel( gonfig.LEVEL.NONE )
	.setEnvironment( gonfig.ENV.TEST )
	.load( 'server', 'config/server.json' )
	.load( 'api', 'config/api.js' )
	.refresh();

const
	chai           = require( 'chai' ),
	chaiHTTP       = require( 'chai-http' ),
	chaiAsPromised = require( 'chai-as-promised' ),
	expect         = chai.expect;

chai.use( chaiHTTP );
chai.use( chaiAsPromised );

const app = require( '../server' );

describe( 'node test', () => {
	it( `/ "${ gonfig.get( 'name' ) }-${ gonfig.get( 'version' ) }" 200 OK`,
		done => {
			chai
				.request( app )
				.get( '/' )
				.end(
					( e, d ) => {
						console.log( d.text );
						expect( d ).to.have.status( 200 );
						expect( d.body ).to.eq( `${ gonfig.get( 'name' ) }-v${ gonfig.get( 'version' ) }` );
						done();
					}
				);
		}
	);
} );
