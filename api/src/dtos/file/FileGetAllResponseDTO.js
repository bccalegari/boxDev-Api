/**
 * File Get All Response DTO
 * 
 * Represents a created file data to be used in get all responses
 * @category DTOs
 */
class FileGetAllResponseDTO {

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
      * File update date
      * 
      * @type { Date }
      */
	updateAt;

	/**
     * File Create Response DTO Constructor
     * @param { String } name file name
     * @param { Number } size file size
     * @param { String } fileType file type
     * @param { String } externalId file external id
     * @param { String } key file key
     * @param { Date } createdAt file creation date
     * @param { Date } updatedAt file update date
     */
	constructor(name, size, fileType, externalId, key, createdAt, updatedAt) {
		this.name = name;
		this.size = size;
		this.fileType = fileType;
		this.externalId = externalId;
		this.key = key;
		this.createdAt = createdAt;
		this.updateAt = updatedAt;
	}

}

module.exports = FileGetAllResponseDTO;
