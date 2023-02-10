'use strict'

module.exports = (sequelize, Sequelize) => {
	const User = sequelize.define('User',{
		UID:{
			type: Sequelize.INTEGER,
			autoIncrement: true,
			primaryKey: true
		},
		SID:{
			type: Sequelize.INTEGER,
			allowNull: false,
		},
		identification:{
			type: Sequelize.STRING(20),
			unique: true,
			allowNull: false
		},
		name:{
			type: Sequelize.STRING(50),
			require: true,
			allowNull: false,
		},
		lastName:{
			type: Sequelize.STRING(50),
			allowNull: false,
			require: true
		},
		mail:{
			type: Sequelize.STRING(100),
			allowNull: false,
			require: true
		},
		phone:{
			type: Sequelize.STRING(15),
			allowNull: false,
			require: true
		},
		type:{
			type: Sequelize.INTEGER,
			allowNull: false,
			require: true
		},		
		password:{
			type: Sequelize.STRING(100),
			allowNull: false,
			require: true
		},
		status:{
			type: Sequelize.BOOLEAN,
			require: true
		},	
	},{
		timestamps: false
	})

	User.associate = function (models) {
		User.hasOne(models.Office, { foreignKey: 'SID' })
	}

	return User;
}

