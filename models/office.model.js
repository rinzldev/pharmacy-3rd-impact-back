'use strict'

module.exports = (sequelize, Sequelize) => {
	const Office = sequelize.define('Office',{
		SID:{
			type: Sequelize.INTEGER,
			autoIncrement: true,
			primaryKey: true
		},
		code:{
			type: Sequelize.STRING(50),
			allowNull: false,
			unique: true,
			require: true
		},
		status:{
			type: Sequelize.BOOLEAN,
			require: true
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