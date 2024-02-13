const AbstractRepository = require('./AbstractRepository');

/**
 * File Type Repository Class
 * 
 * Responsible for intermediating between the business rule layer and data persistence in the file type context
 * @category Repositories
 * @extends AbstractRepository
 */
class FileTypeRepository extends AbstractRepository {

	/**
     * File Type Repository Class Constructor
     */
	constructor() {
		super('fileType');
	}

	/**
	 * Find file type by name
	 * 
	 * @param { String } name file type name
	 * @returns { Promise<Model<FileType>> } file type model
	 */
	async findFileTypeByName(name) {
		return await super._getOneLazyElement({ name });
	}
	
}

module.exports = FileTypeRepository;