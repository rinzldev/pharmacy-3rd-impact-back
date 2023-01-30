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
			allowNull: false,
			unique:true
		},
		desc:{
			type: Sequelize.STRING(100),
			allowNull: false,
			require: true
			
		},
		presentation:{
			type: Sequelize.STRING(100),
			allowNull: false,
			require: true
		},
		status:{
			type: Sequelize.BOOLEAN,
			allowNull: false,
			require: true
		},
	},{
		timestamps: false
	})

	Medicine.associate = function (models) {
		//Medicine.hasMany(models.Inventory, { foreignKey: 'MID' })
	}
	
	return Medicine;
}