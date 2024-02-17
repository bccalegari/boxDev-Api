
const FileCreateRequestDTO = require('./FileCreateRequestDTO');
const FileCreateResponseDTO = require('./FileCreateResponseDTO');
const FileGetResponseDTO = require('./FileGetResponseDTO');

/**
 * File DTO Factory Class
 * 
 * Responsible for creating new DTO's in the file context
 * @category DTOs
 */
class FileDTOFactory {

	/**
	 * Create an new file DTO to use data in creation request
	 * @param { File } file File
	 * @param { FileType } fileTypeModel FileType model
	 * @returns { FileCreateRequestDTO } FileCreateRequestDTO
	 */
	createFileCreateRequestDTO(file, fileTypeModel) {

		const { originalname, size } = file;
		
		const { idFileType } = fileTypeModel;

		const createdFileRequestDTO = new FileCreateRequestDTO(originalname, size, idFileType);

		return createdFileRequestDTO;

	}

	/**
	 * Create an new file DTO to use data in creation response
	 * @param { Model<File> } fileModel File model
	 * @param { String } fileUrl File URL
	 * @returns { FileCreateResponseDTO } FileResponseDTO
	 */
	createFileCreateResponseDTO(fileModel, fileUrl) {
		
		const { name, size, externalId, key, createdAt } = fileModel;

		const fileType = fileModel.fileType.name;

		const createdFileResponseDTO = new FileCreateResponseDTO(name, size, fileType, externalId, key, fileUrl, createdAt);

		return createdFileResponseDTO;
	
	}

	/**
	 * Create an new file DTO to use data in get response
	 * 
	 * @param { Model<File> } fileModel File model
	 * @param { String } fileUrl File URL
	 * @returns { FileGetResponseDTO } FileResponseDTO
	 */
	createFileGetResponseDTO(fileModel, fileUrl) {
		
		const { name, size, externalId, key, createdAt, updatedAt } = fileModel;

		const fileType = fileModel.fileType.name;

		const createdFileResponseDTO = new FileGetResponseDTO(name, size, fileType, externalId, key, fileUrl, createdAt, updatedAt);

		return createdFileResponseDTO;
	
	}

}

module.exports = FileDTOFactory;
