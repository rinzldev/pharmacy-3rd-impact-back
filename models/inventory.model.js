'use strict'

module.exports = (sequelize, Sequelize) => {
	const Inventory = sequelize.define('Inventory',{
		SID:{
			type: Sequelize.INTEGER(10)
		},
		MID:{
			type: Sequelize.INTEGER(15)
		},
		quantity:{
			type: Sequelize.INTEGER(10)
		},
	})

	Inventory.associate = function (models) {
		Inventory.belongsTo(models.Office, { foreignKey: 'SID' })
		Inventory.belongsTo(models.Medicine, { foreignKey: 'MID' })
	}
	return Inventory;
}