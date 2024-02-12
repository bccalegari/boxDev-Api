require('dotenv').config();
const log4js = require('log4js');

log4js.configure({
	appenders: {
		console : { type: 'stdout', layout: { type: 'colored' } },
		file: {
			type: 'file',
			filename: 'logs/app.log',
			maxLogSize: 10485760, // 10MB
			backups: 3,
			compress: true,
			daysToKeep: 14,
			keepFileExt: true
		}
	},
	categories: {
		default:  { appenders: [ 'console', 'file' ], level: process.env.LOG_LEVEL || 'info' }
	}
});

exports.logger = log4js.getLogger();