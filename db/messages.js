const Joi = require('joi');
const db = require('./connection');

const schema = Joi.object().keys({
    username: Joi.string().alphanum().required(),
    subject: Joi.string().required(),
    message: Joi.string().max(500).required(),
    imageURL: Joi.string().uri({
        scheme: [
            /https?/
        ]
    })
});

const messages = db.get('messages');

function getAll() {
    return messages.find();
}

function create(message) {
    if (!message.username) message.username = 'Anonymous';

    const schema = Joi.object({
        username: Joi.string().required(),
        subject: Joi.string().required(),
        message: Joi.string().required(),
        imageURL: Joi.string().required().uri(),
        create: Joi.string().required(),
    });

    const result = schema.validate(message);
    if (result.error == null) {
        message.created = new Date();
        return messages.insert(message);
    } else {
        return Promise.reject(result.error);
    }
}

module.exports = {
    create,
    getAll
};
