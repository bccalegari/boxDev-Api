const FileDTOFactory = require('../dtos/file/FileDTOFactory');
const ApiError = require('../errors/ApiError');
const FileRepository = require('../repositories/FileRepository');
const FileTypeRepository = require('../repositories/FileTypeRepository');
const { logger } = require('../utils/logger');
const CloudFlareFacade = require('../lib/CloudFlareFacade');

/**
 * File Service Class
 * 
 * Responsible for handling all business logic in the file context
 * @category Services
 */
class FileService {

	/**
     * File Repository
     * @private
     * @constant
     * @type { FileRepository }
     */
	#fileRepository;

	/**
     * File Type Repository
     * @private
     * @constant
     * @type { FileTypeRepository }
     */
	#fileTypeRepository;

	/**
     * File DTO Factory
     * @private
     * @constant
     * @type { FileDTOFactory }
     */
	#fileDTOFactory;

	/**
     * File Service Class Constructor
     * 
     * Instantiates all necessary repositories and dto factories
     */
	constructor() {
		this.#fileRepository = new FileRepository();
		this.#fileTypeRepository = new FileTypeRepository();
		this.#fileDTOFactory = new FileDTOFactory();
	}

	/**
	 * Get All Files
	 * @param { Object } query - Query object
	 * @returns { Array<FileGetAllResponseDTO> } - File Get All Response DTO
	 * @throws { ApiError<500> } - If an error occurs
	 */
	async getAllFiles(query) {

		const page = query.page ? query.page : 1;

		try {

			const fileRequestDTO = this.#fileDTOFactory.createFileGetAllRequestDTO(query);

			const files = await this.#fileRepository.findAllFiles(fileRequestDTO, page);

			const filesResponseDTO = this.#fileDTOFactory.createFileGetAllResponseDTO(files);

			return filesResponseDTO;

		} catch (error) {

			logger.error(error);
			ApiError.handleError(error);

		}

	}

	/**
	 * Get File
	 * 
	 * Gets a file by its external id and returns a file response DTO with a signed url to download the file
	 * @param { Number } fileId - File id
	 * @returns { FileResponseDTO } - File Response DTO
	 * @throws { ApiError<500> | ApiError<404> | ApiError<400> } - If an error occurs or if the file is not found or if the file id is not provided
	 */
	async getFile(fileExternalId) {

		try {

			if (!fileExternalId) {
				throw ApiError.badRequest('File id is required');
			}

			const fileModel = await this.#fileRepository.findFileByExternalId(fileExternalId);

			if (!fileModel) {
				throw ApiError.notFound('File not found');
			}

			const fileUrl = await CloudFlareFacade.getFileSignedUrl(fileModel.key, 3600); // 1 hour

			const fileResponseDTO = this.#fileDTOFactory.createFileGetResponseDTO(fileModel, fileUrl);

			return fileResponseDTO;

		} catch (error) {

			logger.error(error);
			ApiError.handleError(error);

		}
	
	}

	/**
      * Create File
      * 
      * Creates a new file in the database and uploads it to cloud storage
      * @param { Object } file - File object
      * @returns { FileResponseDTO } - File Response DTO
      * @throws { ApiError<500> | ApiError<400> } - If an error occurs or if the file is not found
      */
	async createFile(file) {

		try {

			if (!file) {
				throw ApiError.badRequest('File is required');
			}

			const fileType = await this.#fileTypeRepository.findFileTypeByName(file.mimetype);

			const fileRequestDTO = this.#fileDTOFactory.createFileCreateRequestDTO(file, fileType);
		
			const newFileId = (await this.#fileRepository.createFile(fileRequestDTO)).idFile;

			const newFileModel = await this.#fileRepository.findFileById(newFileId);

			const fileSignedUrl = await CloudFlareFacade.uploadFile(file, newFileModel.key, file.path);

			const fileResponseDTO = this.#fileDTOFactory.createFileCreateResponseDTO(newFileModel, fileSignedUrl);

			return fileResponseDTO;
               
		} catch (error) {

			logger.error(error);
			ApiError.handleError(error);
               
		}

	}

	/**
	 * Update File
	 * 
	 * Updates a file in the database and cloud storage
	 * @param { String } fileId - File external id
	 * @param { Object } file - File object
	 * @returns { FileResponseDTO } - File Response DTO
	 * @throws { ApiError<500> | ApiError<404> | ApiError<400> } - If an error occurs or if the file is not found or if the file id is not provided
	 */
	async updateFile(fileId, file) {

		try {

			if (!fileId || !file) {
				throw ApiError.badRequest('File id and file are required');
			}

			const fileModel = await this.#fileRepository.findFileByExternalId(fileId);

			if (!fileModel) {
				throw ApiError.notFound('File not found');
			}

			if (fileModel.fileType.name !== file.mimetype) {
				throw ApiError.badRequest('File type cannot be changed');
			}

			const fileRequestDTO = this.#fileDTOFactory.createFileCreateRequestDTO(file, fileModel.fileType);

			await this.#fileRepository.updateFile(fileRequestDTO, fileId);

			const updatedFileModel = await this.#fileRepository.findFileByExternalId(fileId);

			const fileSignedUrl = await CloudFlareFacade.uploadFile(file, updatedFileModel.key, file.path);

			const fileResponseDTO = this.#fileDTOFactory.createFileUpdateResponseDTO(updatedFileModel, fileSignedUrl);

			return fileResponseDTO;

		} catch (error) {

			logger.error(error);
			ApiError.handleError(error);

		}

	}

	/**
	 * Delete File
	 * 
	 * Deletes a file from the database and cloud storage
	 * @param { String } fileId - File external id
	 * @throws { ApiError<500> | ApiError<404> | ApiError<400> } - If an error occurs or if the file is not found or if the file id is not provided
	 */
	async deleteFile(fileId) {

		try {

			if (!fileId) {
				throw ApiError.badRequest('File id is required');
			}

			const fileModel = await this.#fileRepository.findFileByExternalId(fileId);

			if (!fileModel) {
				throw ApiError.notFound('File not found');
			}

			await CloudFlareFacade.deleteFile(fileModel.key);

			await this.#fileRepository.deleteFile(fileModel.externalId);

		} catch (error) {

			logger.error(error);
			ApiError.handleError(error);

		}

	}

}

module.exports = FileService;