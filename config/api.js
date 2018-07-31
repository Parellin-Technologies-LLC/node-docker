/** ****************************************************************************************************
 * @file: api.js
 * @project: node-docker
 * @author Nick Soggin <iSkore@users.noreply.github.com> on 31-Jul-2018
 *******************************************************************************************************/
'use strict';

const { resolve } = require( 'path' );

module.exports = [
	{
		route: '/',
		method: 'GET',
		exec: resolve( './lib/home' )
	},
	{
		route: '/ping',
		method: 'GET',
		exec: resolve( './lib/ping' )
	},
	{
		route: '/cpu',
		method: 'GET',
		exec: resolve( './lib/cpu' )
	},
	{
		route: '/mem',
		method: 'GET',
		exec: resolve( './lib/mem' )
	},
	{
		route: '/io',
		method: 'GET',
		exec: resolve( './lib/io' )
	},
	{
		route: '/timeout',
		method: 'GET',
		exec: resolve( './lib/timeout' )
	},
	{
		route: '*',
		method: 'ALL',
		exec: resolve( './lib/methodNotAllowed' )
	}
];
