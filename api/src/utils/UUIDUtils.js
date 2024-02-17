/**
 * UUID Utils
 * 
 * UUID utilities
 * @category Utils
 */
class UUIDUtils {

	/**
	 * Get a UUID string from a binary UUID
	 * 
	 * @returns { String } UUID
	 */
	static getUUIDBinary(binary) {
		return binary.toString('hex').replace(/(.{8})(.{4})(.{4})(.{4})(.{12})/, '$1-$2-$3-$4-$5');
	}

	/**
	 * Get a binary UUID from a UUID string
	 * 
	 * @param { String } string
	 * @returns { Buffer } binary UUID
	 */
	static getBinaryUUID(string) {
		return Buffer.from(string.replace(/-/g, ''), 'hex');
	}

}

module.exports = UUIDUtils;