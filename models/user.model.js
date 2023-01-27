'use strict'

module.exports = (sequelize, Sequelize) => {
	const User = sequelize.define('User',{
		UID:{
			type: Sequelize.INTEGER,
			autoIncrement: true,
			primaryKey: true
		},
		SID:{
			type: Sequelize.INTEGER
		},
		identification:{
			type: Sequelize.STRING(20),
			unique: true,
		},
		name:{
			type: Sequelize.STRING(50),
			require: true
		},
		lastName:{
			type: Sequelize.STRING(50),
			require: true
		},
		mail:{
			type: Sequelize.STRING(100),
			require: true
		},
		phone:{
			type: Sequelize.STRING(15),
			require: true
		},
		type:{
			type: Sequelize.INTEGER,
			require: true
		},		
		password:{
			type: Sequelize.STRING(100),
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