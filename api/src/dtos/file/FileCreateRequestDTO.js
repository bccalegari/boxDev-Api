/**
 * File Request DTO
 * 
 * Represents a created file data to be used for request
 * @category DTOs
 */
class FileCreateRequestDTO {

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
     * File type id
     * 
     * @type { Number }
     */
	idFileType;

	/**
     * File Create Request DTO Constructor
     * @param { String } name file name
     * @param { Number } size file size
     * @param { String } idFileType file type id
     */
	constructor(name, size, idFileType) {
		this.name = name;
		this.size = size;
		this.idFileType = idFileType;
	}

}

module.exports = FileCreateRequestDTO;
