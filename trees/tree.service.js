const { DataTypes } = require('sequelize');
const db = require('_helpers/db');

module.exports = {
    getAll,
    getById,
    create,
    update,
    delete: _delete,
    initTrees: initTrees
};

async function getAll() {
    return await db.Tree.findAndCountAll({
        limit:39
    });
}

async function getById(id) {
    return await getTree(id);
}

async function create(params) {
    // validate
    if (await db.Tree.findOne({ where: { id: params.id } })) {
        throw 'id "' + params.id + '" Sudah Terdaftar';
    }

    const Tree = new db.Tree(params);
    // save Tree
    await Tree.save();
}

async function update(id, params) {
    const Tree = await getTree(id);

    // validate
    const idChanged = params.id && Tree.id !== params.id;
    if (idChanged && await db.Tree.findOne({ where: { id: params.id } })) {
        throw 'Id "' + params.id + '" Sudah Terdaftar';
    }

    // copy params to Tree and save
    Object.assign(Tree, params);
    await Tree.save();
}

async function _delete(no) {
    const Tree = await getTree(no);
    await Tree.destroy();
}

// helper functions

async function getTree(id) {
    const Tree = await db.Tree.findOne({where : { id: id}});
    if (!Tree) throw 'Tree not found';
    return Tree;
}

async function initTrees() {

    for (i = 1; i<250; i++) {
        let params = {};
        params.id = 'K'+i;
        params.variant = 'Kelengkeng';
        params.status = 'Baik';
        params.lokasi = 'Pondok 7';
        params.koordinat = '0.0.0.0';
        params.w_tanam = '2017-03-01';

        const tree = new db.Tree(params);
        await tree.save();
    }
}
