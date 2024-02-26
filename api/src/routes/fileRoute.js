const { Router } = require('express');
const FileController = require('../controllers/FileController');
const MulterFacade = require('../lib/MulterFacade');
const multerErrorHandlerMiddleware = require('../middlewares/multerErrorHandlerMiddleware');

const router = Router();

router
	.get('/files', FileController.getAllFiles)
	.get('/files/:id', FileController.getFile)
	.post('/images', MulterFacade.getImageUploadMiddleware().single('file'), multerErrorHandlerMiddleware(), FileController.createFile)
	.put('/images/:id', MulterFacade.getImageUploadMiddleware().single('file'), multerErrorHandlerMiddleware(), FileController.updateFile)
	.post('/videos', MulterFacade.getVideoUploadMiddleware().single('file'), multerErrorHandlerMiddleware(), FileController.createFile)
	.put('/videos/:id', MulterFacade.getVideoUploadMiddleware().single('file'), multerErrorHandlerMiddleware(), FileController.updateFile)
	.post('/audios', MulterFacade.getAudioUploadMiddleware().single('file'), multerErrorHandlerMiddleware(), FileController.createFile)
	.put('/audios/:id', MulterFacade.getAudioUploadMiddleware().single('file'), multerErrorHandlerMiddleware(), FileController.updateFile)
	.delete('/files/:id', FileController.deleteFile);

module.exports = router;