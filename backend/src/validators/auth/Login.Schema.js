const Joi = require("joi")
const getOtpSchema = Joi.object({
    phoneNumber: Joi.string()
        .length(11)
        .pattern(/^09[0-9]{9}$/)
        .required()
        .error(new Error("شماره موبایل وارد شده صحیح نمی باشد")),
});
const checkOtpSchema = Joi.object({
    phoneNumber: Joi.string()
        .length(11)
        .pattern(/^09[0-9]{9}$/)
        .required()
        .error(new Error("شماره موبایل وارد شده صحیح نمی باشد")),
    code: Joi.string()
        .min(5)
        .max(5)
        .error(new Error("رمز یکبار مصرف صحیح نمی باشد")),
});

module.exports = {
    getOtpSchema,
    checkOtpSchema
}