const AbstractRepository = require('./AbstractRepository');

/**
 * File Repository Class
 * 
 * Responsible for intermediating between the business rule layer and data persistence in the file context
 * @category Repositories
 * @extends AbstractRepository
 */
class FileRepository extends AbstractRepository {

	/**
     * File Repository Class Constructor
     */
	constructor() {
		super('file');
	}

	/**
	 * Find file by id
	 * @param { Number } idFile file id
	 * @returns { Promise<Model<File>> } file model
	 */
	async findFileById(idFile) {
		return await super._getOneEagerElement({ idFile }, [ 'fileType' ]);
	}

	/**
     * Create file
     * @param { Object } file file object
     * @returns { Promise<Model<File>> } file model
     */
	async createFile(file) {
		return await super._insertElement(file);
	}

}

module.exports = FileRepository;