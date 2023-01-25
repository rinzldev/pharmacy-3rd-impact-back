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
			type: Sequelize.STRING(50)
		},
		lastName:{
			type: Sequelize.STRING(50)
		},
		mail:{
			type: Sequelize.STRING(100)
		},
		phone:{
			type: Sequelize.STRING(15)
		},
		type:{
			type: Sequelize.INTEGER
		},		
		password:{
			type: Sequelize.STRING(30)
		},
		status:{
			type: Sequelize.BOOLEAN
		},	
	})

	User.associate = function (models) {
		User.belongsTo(models.Office, { foreignKey: 'SID' })
	}

	return User;
}