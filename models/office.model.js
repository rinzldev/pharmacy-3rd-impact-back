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
	},{
		timestamps: false
	})

	Office.associate = function (models) {
		Office.belongsTo(models.User, { foreignKey: 'SID' })
		//Office.hasMany(models.Inventory, { foreignKey: 'SID' })
	}

	return Office;
}