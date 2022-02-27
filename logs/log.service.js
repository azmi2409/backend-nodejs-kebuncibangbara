const { DataTypes } = require('sequelize');
const db = require('../_helpers/db');

module.exports = {
    getById,
    create,
    update,
    delete: _delete,
};

async function getById(id) {
    return await getLog(id);
}

async function create(params) {
    // validate
    const Log = new db.Log(params);
    // save Log
    await Log.save();
}

async function update(id, params) {
    const Log = await getLog(id);

    // validate
    const idChanged = params.id && Log.id !== params.id;
    if (idChanged && await db.Log.findOne({ where: { id: params.id } })) {
        throw 'Id "' + params.id + '" Sudah Terdaftar';
    }

    // copy params to Log and save
    Object.assign(Log, params);
    await Log.save();
}

async function _delete(no) {
    const Log = await getLogByNo(no);
    await Log.destroy();
}

// helper functions

async function getLog(id) {
    const Log = await db.Log.findAll({where: {id: id}});
    if (!Log) throw 'Log not found';
    return Log;
}

async function getLogByNo(no) {
    const Log = await db.Log.findByPk(no);
    if (!Log) throw 'Log not found';
    return Log;
}