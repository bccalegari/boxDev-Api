const { Router } = require('express');
const FileController = require('../controllers/FileController');
const MulterFacade = require('../lib/MulterFacade');
const multerErrorHandlerMiddleware = require('../middlewares/multerErrorHandlerMiddleware');

const router = Router();

router
	.post('/file', MulterFacade.getImageUploadMiddleware().single('file'), multerErrorHandlerMiddleware(), FileController.createFile);

module.exports = router;