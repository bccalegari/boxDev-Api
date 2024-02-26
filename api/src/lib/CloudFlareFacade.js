const { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
const fs = require('fs');

/**
 * A facade for interacting with the CloudFlare S3 bucket
 * 
 * @category Facades
 */
class CloudFlareFacade {

	/**
	 * The S3 client for the CloudFlare bucket
	 * 
	 * @type { S3Client }
	 * @private
	 * @constant
	 * @static
	 */
	static #R2 = new S3Client({
		region: 'auto',
		endpoint: process.env.CLOUDFLARE_ENDPOINT,
		credentials: {
			accessKeyId: process.env.CLOUDFLARE_ACCESS_KEY_ID,
			secretAccessKey: process.env.CLOUDFLARE_SECRET_ACCESS_KEY
		}
	});

	/**
	 * Get a signed URL for a file in the CloudFlare bucket
	 * 
	 * @param { String } fileKey - the key of the file to get a signed URL for
	 * @param { Number } expiresIn - seconds until the signed URL expires (default: 30 minutes)
	 * @returns { Promise<String> } - the signed URL
	 */
	static async getFileSignedUrl(fileKey, expiresIn = 3600 / 2) {

		const params = {
			Bucket: process.env.CLOUDFLARE_BUCKET,
			Key: fileKey
		};

		return await getSignedUrl(this.#R2, new GetObjectCommand(params), { expiresIn });

	}

	/**
	 * Upload a file to the CloudFlare bucket
	 * 
	 * @param { Object } file - the file to upload
	 * @param { String } fileKey - the key to store the file under
	 * @param { String } filePath - the path to the file on the server
	 * @returns { Promise<String> } - the signed URL of the uploaded file
	 */
	static async uploadFile(file, fileKey, filePath) {

		const params = {
			Bucket: process.env.CLOUDFLARE_BUCKET,
			Key: fileKey,
			ContentType: file.mimetype,
			Body: fs.readFileSync(filePath),
		};

		await this.#R2.send(new PutObjectCommand(params));

		return await this.getFileSignedUrl(fileKey);

	}

	/**
	 * Delete a file from the CloudFlare bucket
	 * 
	 * @param { String } fileKey - the key of the file to delete
	 */
	static async deleteFile(fileKey) {

		const params = {
			Bucket: process.env.CLOUDFLARE_BUCKET,
			Key: fileKey
		};

		await this.#R2.send(new DeleteObjectCommand(params));

	}

}

module.exports = CloudFlareFacade;