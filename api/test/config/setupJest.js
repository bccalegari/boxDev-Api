const { beforeAll, afterAll } = require('@jest/globals');
const db = require('../../src/models/index');
const { logger } = require('../../src/utils/logger');

logger.level = 'debug';

beforeAll(async () => {
	await db.sequelize.sync();
});

afterAll(async() => {
	await db.sequelize.close();
});