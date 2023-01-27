'use strict'

module.exports = (sequelize, Sequelize) => {
	const Inventory = sequelize.define('Inventory',{
		SID:{
			type: Sequelize.INTEGER,
			require: true
		},
		MID:{
			type: Sequelize.INTEGER,
			require: true
		},
		quantity:{
			type: Sequelize.INTEGER,
			require: true
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