'use strict';

const { Model } = require('sequelize');
const UUIDUtils = require('../utils/UUIDUtils');

module.exports = (sequelize, DataTypes) => {

	/**
	 * File Model
	 * @category Models
	 * @extends Model
	 */
	class File extends Model {

		static associate(models) {
			File.belongsTo(models.fileType, {
				foreignKey: 'idFileType'
			});
		}

	}

	File.init({
		idFile: {
			type: DataTypes.INTEGER,
			allowNull: false,
			autoIncrement: true,
			primaryKey: true
		},
		name: {
			type: DataTypes.STRING(100),
			allowNull: false,
			validate: {
				notNull: {
					msg: 'Name is required'
				},
				notEmpty: {
					msg: 'Name is required'
				},
				len: {
					args: [0, 100],
					msg: 'Name must be less than 100 characters'
				}
			}
		},
		size: {
			type: DataTypes.DOUBLE,
			allowNull: false,
			validate: {
				notNull: {
					msg: 'Size is required'
				},
				isNumeric: {
					msg: 'Size must be a number'
				}
			}
		},
		idFileType: {
			type: DataTypes.INTEGER,
			allowNull: false,
			validate: {
				notNull: {
					msg: 'File Type is required'
				},
				isInt: {
					msg: 'File Type must be a number'
				}
			}
		},
		externalId: {
			type: DataTypes.STRING.BINARY,
			allowNull: true,
		},
		key: {
			type: DataTypes.STRING(150),
			allowNull: true,
		},
		createdAt: {
			type: DataTypes.DATE,
			allowNull: true,
		},
		updatedAt: {
			type: DataTypes.DATE,
			allowNull: true,
		}
	}, {
		sequelize,
		hooks: {
			afterFind: (file) => {
				if (file != null) 
					file.externalId = UUIDUtils.getStringUUID(file.externalId);
			},
		},
		timestamps: true,
		paranoid: true,
		createdAt: false,
		updatedAt: false,
		modelName: 'file',
	});
	

	return File;
};
