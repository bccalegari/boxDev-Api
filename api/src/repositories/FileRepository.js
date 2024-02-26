const { Op } = require('sequelize');
const AbstractRepository = require('./AbstractRepository');
const UUIDUtils = require('../utils/UUIDUtils');

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

		if (fileType) fileTypeInclude = { model: super._getDatabaseModel('fileType'), required: false, 
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

	/**
	 * Update file
	 * @param { Object } file file object
	 * @param { String } externalId file external id
	 */
	async updateFile(file, externalId) {
		externalId = UUIDUtils.getBinaryUUID(externalId);
		return await super._rawQuery('UPDATE file SET name = ?, size = ?, idFileType = ? WHERE deletedAt IS NULL AND externalId = ?', 
			{ replacements: [ file.name, file.size, file.idFileType, externalId ], type: super._getQueryType('UPDATE') }
		);
	}

	/**
	 * Delete file
	 * @param { String } externalId file external id
	 */
	async deleteFile(externalId) {
		externalId = UUIDUtils.getBinaryUUID(externalId);
		return await super._rawQuery('UPDATE file SET deletedAt = NOW() WHERE externalId = ?', 
			{ replacements: [ externalId ], type: super._getQueryType('UPDATE') }
		);
	}

}

module.exports = FileRepository;
