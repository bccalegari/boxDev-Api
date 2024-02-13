/**
 * UUID Utils
 * 
 * @category Utils
 */
class UUIDUtils {

	/**
	 * Convert a buffer to a string UUID
	 * 
	 * @param { Buffer } buffer
	 * @returns { String } string UUID
	 */
	static getStringUUID(buffer) {

		return [
			buffer.toString('hex', 4, 8),
			buffer.toString('hex', 2, 4),
			buffer.toString('hex', 0, 2),
			buffer.toString('hex', 8, 10),
			buffer.toString('hex', 10, 16),
		].join('-');

	}

}

module.exports = UUIDUtils;