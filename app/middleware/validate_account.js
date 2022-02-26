const Joi = require("joi");
module.exports = {
    validate_create_account: function (req, res, next) {
        const schema = Joi.object({
            accountname: Joi.string().required(),
            accountnumber: Joi.string().length(10).pattern(/^[0-9]+$/).required(),
		});

		// schema options
		const options = {
			abortEarly: false, // include all errors
			allowUnknown: true, // ignore unknown props
			stripUnknown: true, // remove unknown props
		};

		// validate request body against schema
		const { error, value } = schema.validate(req.body, options);

		if (error) {
			// on fail return comma separated errors
			return res.status(402).json({
				status: false,
				message: `${error.details.map((x) => x.message).join(", ")}`,
			});
		} else {
			// on success replace req.body with validated value and trigger next middleware function
			req.body = value;
			next();
		}
    }
}