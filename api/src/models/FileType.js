'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {

	/**
	 * File Type Model
	 * @category Models
	 * @extends Model
	 */
	class FileType extends Model {

		static associate(models) {
			FileType.hasMany(models.file, {
				foreignKey: 'idFileType'
			});
		}

	}

	FileType.init({
		idFileType: {
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
		}
	}, {
		sequelize,
		modelName: 'fileType'
	});

	return FileType;
};
