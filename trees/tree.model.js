const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        no: { type: DataTypes.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true },
        id: {type: DataTypes.STRING, allowNull: false},
        variant: { type: DataTypes.STRING, allowNull: false },
        status: { type: DataTypes.STRING, allowNull: true },
        lokasi: { type: DataTypes.STRING, allowNull: false },
        koordinat: { type: DataTypes.STRING, allowNull: false },
        w_tanam: { type: DataTypes.DATE, allowNull: false }
    };

    const options = {
        freezeTableName: true
    };

    return sequelize.define('Trees', attributes, options);
}