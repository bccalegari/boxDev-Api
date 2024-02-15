/**
 * File Response DTO
 * 
 * Represents a created file data to be used for response
 * @category DTOs
 */
class FileCreateResponseDTO {

	/**
     * File name
     * 
     * @type { String }
     */
	name;

	/**
     * File size
     * 
     * @type { Number }
     */
	size;

	/**
     * File type
     * 
     * @type { String }
     */
	fileType;

	/**
     * File external id
     * 
     * @type { String }
     */
	externalId;

	/**
     * File key
     * 
     * @type { String }
     */
	key;

	/**
     * File creation date
     * 
     * @type { Date }
     */
	createdAt;

	/**
     * File Create Response DTO Constructor
     * @param { String } name file name
     * @param { Number } size file size
     * @param { String } fileType file type
     * @param { String } externalId file external id
     * @param { String } key file key
     * @param { Date } createdAt file creation date
     */
	constructor(name, size, fileType, externalId, key, createdAt) {
		this.name = name;
		this.size = size;
		this.fileType = fileType;
		this.externalId = externalId;
		this.key = key;
		this.createdAt = createdAt;
	}

}

module.exports = FileCreateResponseDTO;