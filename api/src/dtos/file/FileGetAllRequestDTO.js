/**
 * File Get All Request DTO
 * 
 * Represents a request query to get all files
 * @category DTOs
 */
class FileGetAllRequestDTO {

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
     * File Get All Request DTO
     * @param { String } name file name
     * @param { Number } size file size
     * @param { String } fileType file type
     */
	constructor(name, size, fileType) {
		this.name = name;
		this.size = size;
		this.fileType = fileType;
	}

}

module.exports = FileGetAllRequestDTO;
