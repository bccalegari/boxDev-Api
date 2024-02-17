const multer = require('multer');
const path = require('path');

/**
 * A facade for interacting with Multer
 * 
 * @category Facades
 */
class MulterFacade {

	/**
	 * The Multer instance
	 * 
	 * @type { Multer }
	 * @private
	 * @constant
	 * @static
	 */
	static #MULTER = multer;

	/**
	 * The allowed image MIME types
	 * 
	 * @type { Array<String> }
	 * @private
	 * @constant
	 * @static
	 */
	static #ALLOWED_IMAGES_MIME_TYPES = ['image/jpeg', 'image/png'];

	/**
	 * The allowed audio MIME types
	 * 
	 * @type { Array<String> }
	 * @private
	 * @constant
	 * @static
	 */
	static #ALLOWED_AUDIOS_MIME_TYPES = ['audio/mpeg'];

	/**
	 * The allowed video MIME types
	 * 
	 * @type { Array<String> }
	 * @private
	 * @constant
	 * @static
	 */
	static #ALLOWED_VIDEOS_MIME_TYPES = ['video/mpeg', 'video/mp4', 'video/webm'];

	/**
	 * The image storage configuration
	 */
	static #imageStorage = this.#MULTER.diskStorage({
		destination: (req, file, cb) => {
			cb(null, path.join(__dirname, '../../uploads/temp/images'));
		},
		filename: (req, file, cb) => {
			cb(null, file.originalname.split('.')[0] + '-' + Date.now() + path.extname(file.originalname));
		}
	});

	/**
	 * The image upload middleware
	 */
	static #imageUpload = this.#MULTER({ storage: this.#imageStorage , limits: { fileSize: 1024 * 1024 * 1024, files: 50, preservePath: true, parallelUploads: 25 }, 
		fileFilter: (req, file, cb) => {
			if (this.#ALLOWED_IMAGES_MIME_TYPES.includes(file.mimetype)) {
				cb(null, true);
			} else {
				const err = new this.#MULTER.MulterError('FILETYPE');
				err.message= 'File type not allowed';
				cb(err, false);
			}
		}
	});

	/**
	 * The audio storage configuration
	 */
	static #audioStorage = this.#MULTER.diskStorage({
		destination: (req, file, cb) => {
			cb(null, path.join(__dirname, '../../uploads/temp/audios'));
		},
		filename: (req, file, cb) => {
			cb(null, file.originalname.split('.')[0] + '-' + Date.now() + path.extname(file.originalname));
		}
	});

	/**
	 * The audio upload middleware
	 */
	static #audioUpload = this.#MULTER({ storage: this.#audioStorage , limits: { fileSize: 1024 * 1024 * 1024, files: 5, preservePath: true, parallelUploads: 3 }, 
		fileFilter: (req, file, cb) => {
			if (this.#ALLOWED_AUDIOS_MIME_TYPES.includes(file.mimetype)) {
				cb(null, true);
			} else {
				const err = new this.#MULTER.MulterError('FILETYPE');
				err.message= 'File type not allowed';
				cb(err, false);
			}
		}
	});

	/**
	 * The video storage configuration
	 */
	static #videoStorage = this.#MULTER.diskStorage({
		destination: (req, file, cb) => {
			cb(null, path.join(__dirname, '../../uploads/temp/videos'));
		},
		filename: (req, file, cb) => {
			cb(null, file.originalname.split('.')[0] + '-' + Date.now() + path.extname(file.originalname));
		}
	});

	/**
	 * The video upload middleware
	 */
	static #videoUpload = this.#MULTER({ storage: this.#videoStorage , limits: { fileSize: 1024 * 1024 * 1024, files: 10, preservePath: true, parallelUploads: 5 }, 
		fileFilter: (req, file, cb) => {
			if (this.#ALLOWED_VIDEOS_MIME_TYPES.includes(file.mimetype)) {
				cb(null, true);
			} else {
				const err = new this.#MULTER.MulterError('FILETYPE');
				err.message= 'File type not allowed';
				cb(err, false);
			}
		}
	});

	/**
	 * Get image upload middleware
	 * 
	 * @returns { Multer }
	 */
	static getImageUploadMiddleware() {
		return this.#imageUpload;
	}

	/**
	 * Get audio upload middleware
	 * 
	 * @returns { Multer }
	 */
	static getAudioUploadMiddleware() {
		return this.#audioUpload;
	}

	/**
	 * Get video upload middleware
	 * 
	 * @returns { Multer }
	 */
	static getVideoUploadMiddleware() {
		return this.#videoUpload;
	}

}

module.exports = MulterFacade;