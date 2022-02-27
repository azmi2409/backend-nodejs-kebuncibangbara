const express = require('express');
const logsRouter = express.Router();
const Joi = require('joi');
//const validateRequest = require('_middleware/validate-request');
const logService = require('./log.service');

// routes

logsRouter.get('/:id', getById);
logsRouter.post('/', create);
logsRouter.put('/:id', update);
logsRouter.delete('/:id', _delete);


module.exports = logsRouter;

// route functions

function getById(req, res, next) {
    logService.getById(req.params.id)
        .then(log => res.json(log))
        .catch(next);
}

function create(req, res, next) {
    logService.create(req.body)
        .then(() => res.json({ message: 'Log created' }))
        .catch(next);
}

function update(req, res, next) {
    logService.update(req.params.id, req.body)
        .then(() => res.json({ message: 'Log updated' }))
        .catch(next);
}

function _delete(req, res, next) {
    logService.delete(req.params.id)
        .then(() => res.json({ message: 'Log deleted' }))
        .catch(next);
}

// schema functions

/*function createSchema(req, res, next) {
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
}*/
