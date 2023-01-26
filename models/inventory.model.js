'use strict'

module.exports = (sequelize, Sequelize) => {
	const Inventory = sequelize.define('Inventory',{
		SID:{
			type: Sequelize.INTEGER
		},
		MID:{
			type: Sequelize.INTEGER
		},
		quantity:{
			type: Sequelize.INTEGER
		},
	},{
		timestamps: false
	})

	Inventory.associate = function (models) {
		Inventory.belongsTo(models.Office, { foreignKey: 'SID' })
		Inventory.belongsTo(models.Medicine, { foreignKey: 'MID' })
	}
	return Inventory;
}