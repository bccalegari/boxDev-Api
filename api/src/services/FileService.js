const FileDTOFactory = require('../dtos/file/FileDTOFactory');
const ApiError = require('../errors/ApiError');
const FileRepository = require('../repositories/FileRepository');
const FileTypeRepository = require('../repositories/FileTypeRepository');
const { logger } = require('../utils/logger');

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
      * Create File
      * 
      * Creates a new file in the database and uploads it to cloud storage
      * @param { Object } file - File object
      * @returns { FileResponseDTO } - File Response DTO
      * @throws { ApiError<500> } - If an error occurs
      */
	async createFile(file) {

		try {

			const fileType = await this.#fileTypeRepository.findFileTypeByName(file.mimetype);

			const fileRequestDTO = this.#fileDTOFactory.createFileRequestDTO(file, fileType);
		
			const newFileId = (await this.#fileRepository.createFile(fileRequestDTO)).idFile;

			const fileResponseDTO = this.#fileDTOFactory.createFileResponseDTO(await this.#fileRepository.findFileById(newFileId));

			return fileResponseDTO;
               
		} catch (error) {

			logger.error(error);

			ApiError.internalServerError();
               
		}

	}

}

module.exports = FileService;