const multer = require('multer');
const path = require('path');

class MulterFacade {

	static #MULTER = multer;

	static #ALLOWED_IMAGES_MIME_TYPES = ['image/jpeg', 'image/png'];

	static #ALLOWED_AUDIOS_MIME_TYPES = ['audio/mpeg'];

	static #ALLOWED_VIDEOS_MIME_TYPES = ['video/mpeg', 'video/mp4', 'video/webm'];

	static #imageStorage = this.#MULTER.diskStorage({
		destination: (req, file, cb) => {
			cb(null, path.join(__dirname, '../../uploads/temp/images'));
		},
		filename: (req, file, cb) => {
			cb(null, file.originalname.split('.')[0] + '-' + Date.now() + path.extname(file.originalname));
		}
	});

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

	static #audioStorage = this.#MULTER.diskStorage({
		destination: (req, file, cb) => {
			cb(null, path.join(__dirname, '../../uploads/temp/audios'));
		},
		filename: (req, file, cb) => {
			cb(null, file.originalname.split('.')[0] + '-' + Date.now() + path.extname(file.originalname));
		}
	});

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

	static #videoStorage = this.#MULTER.diskStorage({
		destination: (req, file, cb) => {
			cb(null, path.join(__dirname, '../../uploads/temp/videos'));
		},
		filename: (req, file, cb) => {
			cb(null, file.originalname.split('.')[0] + '-' + Date.now() + path.extname(file.originalname));
		}
	});

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

	static getImageUploadMiddleware() {
		return this.#imageUpload;
	}

	static getAudioUploadMiddleware() {
		return this.#audioUpload;
	}

	static getVideoUploadMiddleware() {
		return this.#videoUpload;
	}

}

module.exports = MulterFacade;