const crypto = require('crypto');

/**
 * Data Builder Class
 * 
 * Utility class to generate random data
 */
class DataBuilder {

	/**
     * Generates a random string
     * @param { Number } length length of string, default is 255
     * @returns { String } Random String
     */
	static randomString(length=(this.randomInteger(null, 255))) {
		return (crypto.randomBytes((Math.ceil(length / 2))).toString('hex')).substring(0, length);
	}

	/**
     * Generates a random float
     * @param { Number} min minimum value, default is 0
     * @param { Number} max maximum value, default is 1000
     * @param { Number } decimalPlaces 
     * @returns { Number } Random Float
     */
	static randomFloat(min=0, max=1000, decimalPlaces=2) {
		const str = (Math.random() * (max - min) + min).toFixed(decimalPlaces);
		return parseFloat(str);
	}

}

module.exports = DataBuilder;
