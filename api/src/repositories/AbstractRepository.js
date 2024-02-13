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
