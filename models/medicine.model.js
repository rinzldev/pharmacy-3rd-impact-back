'use strict'

module.exports = (sequelize, Sequelize) => {
	const Medicine = sequelize.define('Medicine',{
		MID:{
			type: Sequelize.INTEGER,
			autoIncrement: true,
			primaryKey: true
		},
		code:{
			type: Sequelize.STRING(15),
			unique:true
		},
		desc:{
			type: Sequelize.STRING(100)
		},
		presentation:{
			type: Sequelize.STRING(100)
		},
		status:{
			type: Sequelize.BOOLEAN
		},
	})

	Medicine.associate = function (models) {
		Medicine.hasMany(models.Inventory, { foreignKey: 'MID' })
	}
	
	return Medicine;
}