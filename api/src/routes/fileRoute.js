const { Router } = require('express');
const FileController = require('../controllers/FileController');
const MulterFacade = require('../lib/MulterFacade');
const multerErrorHandlerMiddleware = require('../middlewares/multerErrorHandlerMiddleware');

const router = Router();

router
	.get('/files', FileController.getAllFiles)
	.get('/files/:id', FileController.getFile)
	.post('/files', MulterFacade.getImageUploadMiddleware().single('file'), multerErrorHandlerMiddleware(), FileController.createFile)
	.put('/files/:id', MulterFacade.getImageUploadMiddleware().single('file'), multerErrorHandlerMiddleware(), FileController.updateFile);

module.exports = router;