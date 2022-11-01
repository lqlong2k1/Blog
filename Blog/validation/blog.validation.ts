import Joi from 'joi';
import * as blogConst from '../const/blog.const';
import * as errMessage from '../const/err-messages.const';
const validationDataInput = {
    author_id: Joi.number(),
        // .required(),
    title: Joi.string()
        .required()
        .messages({ 'string.pattern.base': errMessage.INVALID_TITLE_BLOG}),
    content: Joi.string()
        .required()
        .messages({ 'string.pattern.base': errMessage.INVALID_CONTENT_BLOG }),
    image: Joi.string()
        .trim()
        .regex(blogConst.LINK_IMAGE_REGEX)
        .messages({ 'string.pattern.base': errMessage.INVALID_LINK_IMAGE }),
    category_id: Joi.number()
        .required()
        .messages({ 'string.pattern.base': errMessage.INVALID_CATEGORY_ID }),
    total_rate: Joi.number(),
}
export default {
    createBlog: {
        body: Joi.object(validationDataInput),
    },


}
