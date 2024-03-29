const { logger } = require('../../utils/logger');

module.exports = {
	development: {
		database: process.env.DB_NAME,
		username: process.env.DB_USER,
		password: process.env.DB_PASSWORD,
		options: {
			host: process.env.DB_HOST,
			port: process.env.DB_PORT,
			dialect: 'mysql',
			define: {
				freezeTableName: true,
				timestamps: false
			},
			logging: msg => logger.debug(msg),
			pool: {
				max: 5,
				min: 0,
				idle: 10000,
				acquire: 30000,
			}
		}
	},
	test: {
		database: process.env.TEST_DB_NAME,
		username: process.env.TEST_DB_USER,
		password: process.env.TEST_DB_PASSWORD,
		options: {
			host: process.env.TEST_DB_HOST,
			port: process.env.TEST_DB_PORT,
			dialect: 'mysql',
			define: {
				freezeTableName: true,
				timestamps: false
			},
			logging: msg => logger.debug(msg),
			pool: {
				max: 5,
				min: 0,
				idle: 10000,
				acquire: 30000,
				evict: 10000,
				handleDisconnects: true
			}
		}
	}
};