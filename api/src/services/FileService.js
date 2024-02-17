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
				throw ApiError.badRequest();
			}

			const fileModel = await this.#fileRepository.findFileByExternalId(fileExternalId);

			if (!fileModel) {
				throw ApiError.notFound();
			}

			const fileUrl = await CloudFlareFacade.getFileSignedUrl(fileModel.key, 3600);

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
				throw ApiError.badRequest();
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

}

module.exports = FileService;