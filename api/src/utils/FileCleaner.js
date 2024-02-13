const fs = require('fs');
const path = require('path');
const { logger } = require('./logger');

/**
 * File Cleaner
 * 
 * Responsible for cleaning up files
 * @category Utils
 */
class FileCleaner {

	static #fileMaxTime = 1000 * 60 * 15; // 15 minutes

	static #runInterval = 1000 * 60 * 30; // 30 minutes

	static #baseDirectory = path.join(__dirname, '../../uploads/temp');

	/**
     * Run cleaner
     */
	static runCleaner() {

		logger.info('File cleaner started successfully');

		setInterval(() => {
			this.#cleanFolder(this.#baseDirectory, this.#fileMaxTime);
		}, this.#runInterval);

	}

	/**
     * Clean folder
     * 
     * @param { String } directory directory to clean
     * @param { Number } maxTime max file time
     */
	static async #cleanFolder(directory, maxTime) {

		logger.info('File cleaner started cleaning folder');

		try {
			
			logger.info(`Cleaning folder: ${directory}`);
			
			const folders = await fs.promises.readdir(directory);
	
			for (const folder of folders) {

				const folderPath = path.join(directory, folder);
				const stats = await fs.promises.stat(folderPath);
	
				if (stats.isDirectory()) {
					await this.#deleteOldFiles(folderPath, maxTime);
				}

			}

			logger.info(`Folder cleaned: ${directory}`);

		} catch (err) {
			logger.error(`Error cleaning directory: ${err}`);
		}

		logger.info('File cleaner finished cleaning folder');

	}

	/**
     * Delete old files
     * 
     * @param { String } folder folder to clean
     * @param { Number } maxTime max file time
     */
	static async #deleteOldFiles(folder, maxTime) {
	
		try {

			let fileSuccessCount = 0;
			let fileErrorCount = 0;

			const files = await fs.promises.readdir(folder);
			const now = new Date().getTime();
	
			for (const file of files) {

				const filePath = path.join(folder, file);
				const stats = await fs.promises.stat(filePath);
	
				const fileTime = stats.mtime.getTime();

				if (now - fileTime > maxTime) {

					try {

						await fs.promises.unlink(filePath);
						fileSuccessCount++;

					} catch (err) {
						console.error(`Error deleting file: ${err}`);
						fileErrorCount++;
					}

				}

			}
	
			logger.info(`Deleted ${fileSuccessCount} files and failed to delete ${fileErrorCount} files from folder: ${folder}`);

		} catch (err) {
			logger.error(`Error reading files in folder: ${err}`);
		}
    
	}

}

module.exports = FileCleaner;