const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const { logger } = require('../utils/logger');

class CloudFlareFacade {
    
	static #r2 = new S3Client({
		region: 'auto',
		endpoint: process.env.CLOUDFLARE_ENDPOINT,
		credentials: {
			accessKeyId: process.env.CLOUDFLARE_ACCESS_KEY_ID,
			secretAccessKey: process.env.CLOUDFLARE_SECRET_ACCESS_KEY
		}
	});

	static async uploadFile(file, fileKey) {

		const params = {
			Bucket: process.env.CLOUDFLARE_BUCKET,
			Key: fileKey,
			ContentType: file.mimetype,
		};

		try {

			const { Location } = await this.#r2.send(new PutObjectCommand(params));
			return Location;

		} catch (error) {

			logger.error(error);
			return null;

		}

	}

}

module.exports = CloudFlareFacade;