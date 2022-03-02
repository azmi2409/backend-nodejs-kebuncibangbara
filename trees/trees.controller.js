const express = require('express');
const treesRouter = express.Router();
const Joi = require('joi');
const validateRequest = require('../_middleware/validate-request');
const treeService = require('./tree.service');
const { verifySession } = require("supertokens-node/recipe/session/framework/express");

// routes

treesRouter.get('/init', initTrees);
treesRouter.get('/', getAll);
treesRouter.get('/:id', getById);
treesRouter.post('/', verifySession(), create);
treesRouter.put('/:id', verifySession(), update);
treesRouter.delete('/:id', verifySession(), _delete);


module.exports = treesRouter;

// route functions

function getAll(req, res, next) {
    treeService.getAll()
        .then(trees => res.json(trees))
        .catch(next);
}

function getById(req, res, next) {
    treeService.getById(req.params.id)
        .then(tree => res.json(tree))
        .catch(next);
}

function create(req, res, next) {
    treeService.create(req.body)
        .then(() => res.json({ message: 'Tree created' }))
        .catch(next);
}

function initTrees(req, res, next){
    treeService.initTrees()
    .then(() => res.json({message: 'Memasukan Data'}))
    .catch(next);
}

function update(req, res, next) {
    treeService.update(req.params.id, req.body)
        .then(() => res.json({ message: 'Tree updated' }))
        .catch(next);
}

function _delete(req, res, next) {
    treeService.delete(req.params.id)
        .then(() => res.json({ message: 'Tree deleted' }))
        .catch(next);
}

// schema functions

function createSchema(req, res, next) {
    const schema = Joi.object({
        id: Joi.string().required(),
        variant: Joi.string().required(),
        status: Joi.string().empty(''),
        lokasi: Joi.string().required(),
        koordinat: Joi.string().required(),
        w_tanam: Joi.date().required()
    });
    validateRequest(req, next, schema);
}

function updateSchema(req, res, next) {
    const schema = Joi.object({
        id: Joi.string().empty(''),
        variant: Joi.string().empty(''),
        status: Joi.string().empty(''),
        lokasi: Joi.string().empty(''),
        koordinat: Joi.string().empty(''),
        w_tanam: Joi.date().empty('')
    })
    validateRequest(req, next, schema);
}
