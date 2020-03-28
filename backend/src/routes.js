const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate');

const IncidentsController = require('./controllers/IncidentsController');
const OngController = require('./controllers/OngController');
const ProfileController = require('./controllers/ProfileController');
const SessionController = require('./controllers/SessionController');


const routes = express.Router();

routes.post('/sessions', SessionController.create)

routes.get('/ongs', OngController.index);
routes.post('/ongs', celebrate({
    [Segments.BODY]:
        Joi.object().keys({
            name: Joi.string().required(),
            email: Joi.string().required().email(),
            whatsapp: Joi.string().required().min(10).max(11),
            city: Joi.string().required(),
            uf: Joi.string().required().length(2),
    })
}), OngController.create);

routes.get('/profile', celebrate({
    [Segments.HEADERS]: 
        Joi.object({
            authorization: Joi.string().required(),
        }).unknown()
}), ProfileController.index);

routes.get('/incidents', IncidentsController.index);
routes.post('/incidents', celebrate({
    [Segments.QUERY]:
        Joi.object().keys({
            pages: Joi.number(),
        })
}), IncidentsController.create);


routes.delete('/incidents/:id', celebrate({
    [Segments.PARAMS]:
        Joi.object().keys({
            id: Joi.number().required()
        })
}), IncidentsController.delete);
module.exports = routes;