
const FileCreateRequestDTO = require('./FileCreateRequestDTO');
const FileCreateResponseDTO = require('./FileCreateResponseDTO');

/**
 * File DTO Factory Class
 * 
 * Responsible for creating new DTO's in the file context
 * @category DTOs
 */
class FileDTOFactory {

	createFileRequestDTO(file, fileTypeModel) {

		const { originalname, size } = file;
		
		const { idFileType } = fileTypeModel;

		const createdFileRequestDTO = new FileCreateRequestDTO(originalname, size, idFileType);

		return createdFileRequestDTO;

	}

	/**
	 * Create an new file DTO to use data in response
	 * @param { Model<File> } fileModel File model
	 * @param { String } fileUrl File URL
	 * @returns { FileResponseDTO } FileResponseDTO
	 */
	createFileResponseDTO(fileModel, fileUrl) {
		
		const { name, size, externalId, key, createdAt } = fileModel;

		const fileType = fileModel.fileType.name;

		const createdFileResponseDTO = new FileCreateResponseDTO(name, size, fileType, externalId, key, fileUrl, createdAt);

		return createdFileResponseDTO;
	
	}

}

module.exports = FileDTOFactory;
