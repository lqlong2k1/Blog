import Joi from 'joi';
import * as userConst from '../const/user.const';
import * as errMessage from '../const/err-messages.const';
const validationDataInput = {
    username: Joi.string()
        .min(6).messages({ 'string.min': errMessage.MINIMUM_LENGTH_USERNAME })
        .regex(userConst.USERNAME_REGEX)
        .required()
        .messages({ 'string.pattern.base': errMessage.INVALID_USERNAME }),
    password: Joi.string()
        .min(8)
        .required()
        .messages({ 'string.pattern.base': errMessage.INVALID_PASSWORD }),
    full_name: Joi.string()
        .trim()
        .regex(userConst.NAME_REGEX)
        .required()
        .messages({ 'string.pattern.base': errMessage.INVALID_NAME }),
    profile_img: Joi.string()
        .trim()
        .regex(userConst.LINK_IMAGE_REGEX)
        .messages({ 'string.pattern.base': errMessage.INVALID_LINK_IMAGE }),
    email: Joi.string()
        .trim()
        .regex(userConst.EMAIL_REGEX)
        .required()
        .messages({ 'string.pattern.base': errMessage.INVALID_EMAIL }),
    phone_number: Joi.string()
        .trim()
        .regex(userConst.PHONE_NUMBER_REGEX)
        .required()
        .messages({ 'string.pattern.base': errMessage.INVALID_PHONE_NUMBER }),
    country: Joi.string()
        .trim()
        .required()
        .messages({ 'string.parttern.base': errMessage.INVALID_COUNTRY }),
    dob: Joi.date()
        .max('01-01-2004')
        .iso()
        .required()
        .messages({
            'date.format': errMessage.INVALID_FORMAT_BIRTHDAY,
            'date.max': errMessage.INVALID_MINIMUN_BIRTHDAY,
        }),
    roles: Joi.number()
}
export default {
    createUser: {
        body: Joi.object(validationDataInput),
    },
}
