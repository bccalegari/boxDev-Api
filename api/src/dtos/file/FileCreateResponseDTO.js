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
      * File URL
      * 
      * Expires in 30 minutes
      * @type { String }
      */
	url;

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
     * @param { String } url file url
     * @param { Date } createdAt file creation date
     */
	constructor(name, size, fileType, externalId, key, url, createdAt) {
		this.name = name;
		this.size = size;
		this.fileType = fileType;
		this.externalId = externalId;
		this.key = key;
		this.url = url;
		this.createdAt = createdAt;
	}

}

module.exports = FileCreateResponseDTO;
