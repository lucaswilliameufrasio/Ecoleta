import { celebrate, Joi } from 'celebrate';

export const index = celebrate(
    {
        query: Joi.object().keys({
            city: Joi.string().required(),
            uf: Joi.string().required().max(2),
            items: Joi.string().required(),
        }),
    },
    { abortEarly: false },
);

export const show = celebrate({
    params: Joi.object().keys({
        id: Joi.number().required(),
    }),
});

export const create = celebrate(
    {
        body: Joi.object().keys({
            name: Joi.string().required(),
            email: Joi.string().required().email(),
            whatsapp: Joi.number().required(),
            latitude: Joi.number().required(),
            longitude: Joi.number().required(),
            city: Joi.string().required(),
            uf: Joi.string().required().max(2),
            items: Joi.string().required(),
        }),
    },
    { abortEarly: false },
);
