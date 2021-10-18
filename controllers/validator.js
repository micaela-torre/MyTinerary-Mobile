const joi = require("joi");

const validator = (req, res, next) => {
  console.log("entre validator");
  const schema = joi.object({
    name: joi
      .string()
      .trim()
      .min(2)
      .max(15)
      .required()
      .pattern(new RegExp("[a-zA-Z]"))
      .messages({
        "string.min": "Name must have at least 2 characters!",
      }),
    lastname: joi.string().trim().min(2).max(15).required().messages({
      "string.min": "Lastname must have at least 2 characters!",
    }),
    email: joi.string().required().trim().email().messages({
      "string.email": "Please enter a correct email!",
    }),
    password: joi.string().trim().required().min(5).messages({
      "string.min": "Password must be a minimum of 5 characters.",
    }),
    country: joi.string(),
    url: joi.string().trim(),
    google: joi.boolean(),
  });
  const validation = schema.validate(req.body, { abortEarly: false });
  if (!validation.error) {
    next();
  } else {
    console.log(validation.error.details);
    res.json({ success: false, response: validation.error.details });
  }
};

module.exports = validator;

// /^[a-zA-Z\s]+$/
