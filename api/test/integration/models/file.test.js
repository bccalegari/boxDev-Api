const { describe, test, expect } = require('@jest/globals');
const DataBuilder = require('../../utils/DataBuilder');

const File = require('../../../src/models').file;

describe('File Model Integration Tests', () => {

	test('isFile_BeingSelected_True', async () => {

		const file = await File.findByPk(1);

		expect(file).not.toBeNull();

		expect(file).toEqual(expect.objectContaining({
			idFile: expect.any(Number),
			name: expect.any(String),
			size: expect.any(Number),
			idFileType: expect.any(Number),
			externalId: expect.any(String),
			key: expect.any(String),
			createdAt: expect.any(Date),
			updatedAt: expect.toBeOneOf([expect.any(Date), null]),
			deletedAt: expect.toBeOneOf([expect.any(Date), null]),
		}));

	});

	test('isFile_BeingSaved_True', async () => {

		const file = await File.create({ name: DataBuilder.randomString(50), size: DataBuilder.randomFloat(), idFileType: 1 });

		expect(file).not.toBeNull();
		expect(file.externalId).not.toBeNull();
		expect(file.key).not.toBeNull();
		expect(file.createdAt).not.toBeNull();

		await file.destroy({
			force: true
		});

	});

	test('isFile_SequenceUp_True', async () => {

		const lastFile = await File.create({ name: DataBuilder.randomString(50), size: DataBuilder.randomFloat(), idFileType: 1 });

		const newFile = await File.create({ name: DataBuilder.randomString(50), size: DataBuilder.randomFloat(), idFileType: 1 });
		expect(newFile.idFile).toBeGreaterThan(lastFile.idFile);

		await newFile.destroy({
			force: true
		});
		
	});

	test('isFile_BeingUpdated_True', async () => {

		const newName = DataBuilder.randomString(50);

		const fileBeforeUpdate = await File.create({ name: DataBuilder.randomString(50), size: DataBuilder.randomFloat(), idFileType: 1 });
		await fileBeforeUpdate.update({ name: newName });

		const fileAfterUpdate = await File.findByPk(fileBeforeUpdate.idFile);

		expect(fileAfterUpdate.name).toBe(newName);
		expect(fileAfterUpdate.key).toContain(newName);

		expect(fileAfterUpdate.updatedAt).not.toBeNull();

		await fileAfterUpdate.destroy({
			force: true
		});

	});

	test('isFile_BeingDeleted_True', async () => {

		const fileBeforeDelete = await File.create({ name: DataBuilder.randomString(50), size: DataBuilder.randomFloat(), idFileType: 1 });
		await fileBeforeDelete.destroy();

		const fileAfterDelete = await File.findByPk(fileBeforeDelete.idFile);
		expect(fileAfterDelete).toBe(null);

		const fileAfterDeleteParanoidOff = await File.findByPk(fileBeforeDelete.idFile, { paranoid: false });

		expect(fileAfterDeleteParanoidOff.deletedAt).not.toBeNull();

		await fileAfterDeleteParanoidOff.destroy({
			force: true
		});

	});

	test('isFile_BeingRestored_True', async () => {
		
		const fileBeforeRestore = await File.create({ name: DataBuilder.randomString(50), size: DataBuilder.randomFloat(), idFileType: 1 });
		await fileBeforeRestore.destroy();

		await fileBeforeRestore.restore();

		const fileAfterRestore = await File.findByPk(fileBeforeRestore.idFile);
		expect(fileAfterRestore).not.toBeNull();

		await fileAfterRestore.destroy({
			force: true
		});

	});

	test('isFile_PerformingLazyLoading_True', async () => {
		
		const file = await File.findByPk(1);

		const fileType = await file.getFileType();

		expect(fileType).not.toBeNull();
		expect(fileType).toEqual(expect.objectContaining({
			idFileType: expect.any(Number),
			name: expect.any(String),
		}));

	});

	test('isFile_PerformingEagerLoading_True', async () => {
		
		const file = await File.findByPk(1, { include: 'fileType' });

		expect(file.fileType).not.toBeNull();
		expect(file.fileType).toEqual(expect.objectContaining({
			idFileType: expect.any(Number),
			name: expect.any(String),
		}));

	});

});
