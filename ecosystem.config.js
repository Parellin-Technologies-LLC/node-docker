/** ****************************************************************************************************
 * File: ecosystem.config.js
 * Project: node-docker
 * @author Nick Soggin <iSkore@users.noreply.github.com> on 11-Mar-2019
 *******************************************************************************************************/
'use strict';

const
	{
		name,
		version,
		main: script
	} = require( './package.json' );

process.title = `${ name }-${ version }`;

module.exports = {
	apps: [
		{
			name,
			script,
			exec_mode: 'cluster',
			instances: 0,
			watch: false,
			autorestart: true,
			max_memory_restart: '1G',
			restartDelay: 5000,
			node_args: [
				'--no-warnings',
				'--max_old_space_size=4096'
			],
			env: {
				NODE_ENV: 'development',
				DEBUG: true
			},
			env_development: {
				NODE_ENV: 'development',
				DEBUG: true
			},
			env_production: {
				NODE_ENV: 'production'
			}
		}
	]
};
