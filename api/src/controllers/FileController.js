const FileService = require('../services/FileService');

/**
 * File Controller class
 * 
 * Handles file management
 * @category Controllers
 */
class FileController {

	/**
	 * Create a new file
	 * @param { Promise<Request> } req request
	 * @param { Promise<Response> } res response
	 */
	static async createFile(req, res) {

		try {

			const fileService = new FileService();

			const file = await fileService.createFile(req.file);

			res.status(201).send({ file });

		} catch (error) {

			res.status(error.code).send({ message: error.message });

		}

	}

}

module.exports = FileController;
