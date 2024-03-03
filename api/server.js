const app = require('./src/app');
const { logger } = require('./src/utils/logger');
const DOCKER_PORT = process.env.DOCKER_PORT;
const APP_PORT = process.env.APP_LOCAL_PORT || 8080;

app.listen(DOCKER_PORT, () => {
	logger.info(`Server is running on port ${APP_PORT}`);
});