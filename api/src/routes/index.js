const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../documentation/swagger.json');
const file = require('./fileRoute');

module.exports = app => {

	app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
	
	app.use(
		'/v1',
		file
	);

};
