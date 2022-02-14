const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        no: { type: DataTypes.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true },
        id: {type: DataTypes.STRING, allowNull: false},
        perlakuan: {type: DataTypes.STRING, allowNull: false},
        tanggal: {type: DataTypes.DATE, allowNull: false},
        petugas: {type: DataTypes.STRING, allowNull: false},
        keterangan: {type: DataTypes.STRING, allowNull: true}
    };

    const options = {
        freezeTableName: true
    };

    return sequelize.define('Logs', attributes, options);
}