const database = require('../models');

/**
 * Abstract Repository Class
 * 
 * Responsible for intermediating between the business rule layer and data persistence
 * @abstract abstract class
 * @category Repositories
 */
class AbstractRepository {

	/**
     * Database access (sequelize | models)
     * @private
     * @constant
     * @type { Sequelize }
     */
	#db;

	/**
     * Abstract Repository Class Constructor
     * @param { String } model name of the model
     */
	constructor(model) {
		this.#db = database;
		this.model = model;
	}

	/**
	 * Execute a raw query
	 * @protected protected method
	 * @param { String } query query to execute
	 * @param { Object } params query parameters
	 * @return { Promise<Model[]> | Promise<any> } result of the query
	 * @throws { Error } If query is empty or wrong
	 */
	async _rawQuery(query, params = {}) {
		return await database.sequelize.query(query, { ...params });
	}

	/**
	 * Get query type
	 * @protected protected method
	 * @param { String } type type of the query
	 * @returns { Promise<QueryType> } sequelize query type
	 * @throws { Error } If type is empty or wrong
	 */
	async _getQueryType(type) {
		return await database.sequelize.QueryTypes[type];
	}

	/**
	 * Get database model
	 * @protected protected method
	 * @param { String } model name of the model
	 * @returns { Model } sequelize model
	 */
	_getDatabaseModel(model) {
		return this.#db[model];
	}

	/**
     * Get one element (Lazy Loading)
	 * @protected protected method
     * @param { Object } where where clause 
     * @param { Array<String> } attributes columns to select
	 * @param { Object } options query options
     * @returns { Promise<Model> }
     */
	async _getOneLazyElement(where = {}, attributes=[], options={}) {

		if (!(attributes.length === 0)) {
			return await this.#db[this.model].findOne({ where: { ...where }, attributes: [ ...attributes ], ...options });	
		}

		return await this.#db[this.model].findOne({ where: { ...where }, ...options });
	}

	/**
     * Get one element (Eager Loading)
	 * @protected protected method
     * @param { Object } where where clause 
     * @param { Object|String } includes join clause
     * @param { Array<String> } attributes columns to select
	 * @param { Object } options query options
     * @returns { Promise<Model> }
     */
	async _getOneEagerElement(where = {}, includes = [], attributes=[], options={}) {

		if (!(attributes.length === 0)) {
			return await this.#db[this.model].findOne({ where: { ...where }, include: [ ...includes ], attributes: [ ...attributes ], ...options });
		}

		return await this.#db[this.model].findOne({ where: { ...where }, include: [ ...includes ], ...options });
	}

	/**
	 * Get all elements paginated (Eager Loading)
	 * @protected protected method
	 * @param { Object } where where clause
	 * @param { Object|String } includes join clause
	 * @param { Number } page page number
	 * @param { Number } limit limit of elements per page
	 * @param { Array<String> } attributes columns to select
	 * @param { Object } options query options
	 * @returns { Promise<Model[]> }
	 */
	async _getAllEagerElementsPaginated(where = {}, includes = [], page = 1, limit = 10, attributes=[], options={}) {
		
		const offset = (page - 1) * limit;

		if (!(attributes.length === 0)) {
			return await this.#db[this.model].findAll({ where: { ...where }, include: [ ...includes ], attributes: [ ...attributes ], limit, offset, ...options });
		}

		return await this.#db[this.model].findAll({ where: { ...where }, include: [ ...includes ], limit, offset, ...options });

	}

	/**
      * Insert an element
	  * @protected protected method
      * @param { Object } elementData element data
      * @returns { Promise<Model> } element
      * @throws { Error } If elementData is empty or wrong and when transaction goes wrong
      */
	async _insertElement(elementData = {}) {

		if (!elementData) {
			throw new Error('Empty element data');
		}

		return await this.#db.sequelize.transaction(async t => {
			return await this.#db[this.model].create(elementData, { transaction: t });
		});

	}

}

module.exports = AbstractRepository;
