'use strict';

const { name, main: script } = require( './package' );

module.exports = {
	apps: [
		{
			name,
			script,
			exec_mode: 'cluster',
			instances: 0,
			restartDelay: 5000,
			env: {
				NODE_ENV: 'development',
				DEBUG: true
			},
			env_production: {
				NODE_ENV: 'production'
			}
		}
	]
};
