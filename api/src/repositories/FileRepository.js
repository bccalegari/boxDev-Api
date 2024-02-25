const { Op } = require('sequelize');
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
	 * Find all files
	 * @param { FileGetAllRequestDTO } fileRequestDTO file request DTO
	 * @param { Number } page page number
	 * @returns { Promise<Model<File[]>> } file models
	 */
	async findAllFiles(fileRequestDTO, page) {

		let fileTypeInclude = 'fileType';

		const { name, size, fileType } = fileRequestDTO;

		const where = {};

		if (name) where.name = { [Op.like]: `%${ name.trim() }%` };

		if (size) where.size = parseFloat(size.trim());

		if (fileType) fileTypeInclude = { model: this._getDatabaseModel('fileType'), required: false, 
			where : { name: { [Op.like]: `%${ fileType.trim() }%` } } };


		return await super._getAllEagerElementsPaginated(where, [ fileTypeInclude ], page);

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
	 * Find file by external id
	 * @param { String } externalId file external id
	 * @returns { Promise<Model<File>> } file model
	 */
	async findFileByExternalId(externalId) {
		return await super._getOneEagerElement({ externalId }, [ 'fileType' ]);
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