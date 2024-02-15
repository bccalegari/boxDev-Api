const { MulterError } = require('multer');
const ApiError = require('../errors/ApiError');

/**
 * Multer Error Handler Middleware
 * @category Middlewares
 */
const multerErrorHandlerMiddleware = () => {

	/**
	 * Middleware that handles multer errors
	 * @param { Promise<Error> } err error
	 * @param { Promise<Request> } req request
	 * @param { Promise<Response> } res response
	 * @param { Promise<Function> } next next
	 * @returns { Promise<Function> } next middleware or controller
	 * @throws { ApiError<403> } If user is not authorized to perform this action
	 */
	return async (err, req, res, next) => {

		if (!err) return next();

		let error;

		if (err instanceof MulterError) {

			switch (err.code) {

			case 'LIMIT_FILE_SIZE':
				
				error = ApiError.badRequest(err.message);
				break;

			case 'LIMIT_FILE_COUNT':
				
				error = ApiError.badRequest(err.message);
				break;

			case 'FILETYPE':
				
				error = ApiError.badRequest(err.message);
				break;

			default:

				error = ApiError.internalServerError('Erro ao fazer upload do arquivo');
				break;
			}

		} else {
			
			error = ApiError.internalServerError();
		}

		res.status(error.code).send({ message: error.message });
	
	};

};

module.exports = multerErrorHandlerMiddleware;
