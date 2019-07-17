import Joi from 'joi';
import bcrypt from 'bcryptjs';

export default {
    encryptPassword(plainText) {
        const salt = bcrypt.genSaltSync(10);
        return bcrypt.hashSync(plainText, salt);
    },

    validationSignup(body) {
        const schema = Joi.object().keys({
            username: Joi.string().alphanum().min(3).max(30),
            firstName: Joi.string().required(),
            lastName: Joi.string().required(),
            email: Joi.string().required().email(),
            password: Joi.string().required(),
            role: Joi.number().integer(),
            isVerified: Joi.boolean(),
            profile_pic: Joi.string()
        });

        const { value, error } = Joi.validate(body, schema);
        if (error && error.details) {
            return { error }
        }
        return { value }
    },

    validationUpdateMe(body) {
        const schema = Joi.object().keys({
            username: Joi.string().alphanum().min(3).max(30),
            firstName: Joi.string(),
            lastName: Joi.string(),
            role: Joi.number().integer(),
            isVerified: Joi.boolean(),
            profile_pic: Joi.string(),
            mobileNo: Joi.string().min(10).max(10)
        });

        const { value, error } = Joi.validate(body, schema);
        if (error && error.details) {
            return { error }
        }
        return { value }
    },

    comparePassword(plainText, encryptPassword) {
        return bcrypt.compareSync(plainText, encryptPassword);
    },

    validationLogin(body) {
        console.log("body", body)
        const schema = Joi.object().keys({
            email: Joi.string().email(),
            password: Joi.string().required()
        });
        const { value, error } = Joi.validate(body, schema);
        if (error && error.details) {
            return { error }
        }
        return { value }
    }
}