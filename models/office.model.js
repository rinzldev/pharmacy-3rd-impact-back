'use strict'

module.exports = (sequelize, Sequelize) => {
	const Office = sequelize.define('Office',{
		SID:{
			type: Sequelize.INTEGER,
			autoIncrement: true,
			primaryKey: true
		},
		code:{
			type: Sequelize.STRING(50)
		},
		status:{
			type: Sequelize.BOOLEAN
		},
	})

	Office.associate = function (models) {
		Office.hasMany(models.User, { foreignKey: 'SID' })
		Office.hasMany(models.Inventory, { foreignKey: 'SID' })
	}

	return Office;
}