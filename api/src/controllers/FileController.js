const FileService = require('../services/FileService');

/**
 * File Controller class
 * 
 * Handles file management
 * @category Controllers
 */
class FileController {

	/**
	 * Get a file
	 * @param { Promise<Request> } req request
	 * @param { Promise<Response> } res response
	 */
	static async getFile(req, res) {

		try {

			const fileService = new FileService();

			const file = await fileService.getFile(req.params.id);

			res.status(200).send({ file });

		} catch (error) {

			res.status(error.code).send({ message: error.message });

		}

	}

	/**
	 * Get all files
	 * @param { Promise<Request> } req request
	 * @param { Promise<Response> } res response
	 */
	static async getAllFiles(req, res) {
		
		try {

			const fileService = new FileService();

			const files = await fileService.getAllFiles(req.query);

			res.status(200).send({ files });

		} catch (error) {

			res.status(error.code).send({ message: error.message });

		}

	}

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

	/**
	 * Update a file
	 * @param { Promise<Request> } req request
	 * @param { Promise<Response> } res response
	 */
	static async updateFile(req, res) {

		try {

			const fileService = new FileService();

			const file = await fileService.updateFile(req.params.id, req.file);

			res.status(200).send({ file });

		} catch (error) {

			res.status(error.code).send({ message: error.message });

		}

	}

	/**
	 * Delete a file
	 * @param { Promise<Request> } req request
	 * @param { Promise<Response> } res response
	 */
	static async deleteFile(req, res) {

		try {

			const fileService = new FileService();

			await fileService.deleteFile(req.params.id);

			res.status(204).send();

		} catch (error) {

			res.status(error.code).send({ message: error.message });

		}

	}

}

module.exports = FileController;
