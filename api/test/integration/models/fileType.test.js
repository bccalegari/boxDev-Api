const { describe, test, expect } = require('@jest/globals');

const FileType = require('../../../src/models').fileType;

describe('File Type Model Integration Tests', () => {

	test('isFileType_BeingSelected_True', async () => {

		const fileType = await FileType.findByPk(1);

		expect(fileType).not.toBeNull();

		expect(fileType).toEqual(expect.objectContaining({
			idFileType: expect.any(Number),
			name: expect.any(String),
		}));

	});

});
