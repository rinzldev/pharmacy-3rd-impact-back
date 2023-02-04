'use strict'

module.exports = (sequelize, Sequelize) => {
	const Laboratory = sequelize.define('Laboratory',{
		LID:{
			type: Sequelize.INTEGER,
            autoIncrement: true,
			primaryKey: true
		},
		RIF:{
			type: Sequelize.STRING(15),
			allowNull: false,
			require: true
		},
		name:{
			type: Sequelize.STRING(50),
			allowNull: false,
			require: true
		},
		address:{
			type: Sequelize.STRING(200),
			allowNull: false,
			require: true
		},
        phone:{
			type: Sequelize.STRING(15),
			allowNull: false,
			require: true
		},
		createdAt: {
			type: "TIMESTAMP",
			defaultValue: sequelize.literal("CURRENT_TIMESTAMP"),
			allowNull: false,
		},
        Status: {
            type: Sequelize.BOOLEAN,
            require: true
        }
	},{
		timestamps: false
	})

	Laboratory.associate = function (models) {
		Laboratory.belongsTo(models.Office, { foreignKey: 'SID' })
		Laboratory.belongsTo(models.Medicine, { foreignKey: 'LID' })
	}
	return Laboratory;
}