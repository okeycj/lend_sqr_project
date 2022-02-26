const Joi = require("joi");

module.exports = {
    validate_fund_wallet: function (req, res, next) {
        const schema = Joi.object({
            id: Joi.string().pattern(/^[0-9]+$/).required(),
            amount: Joi.number().required()
		});

		// schema options
		const options = {
			abortEarly: false, // include all errors
			allowUnknown: true, // ignore unknown props
			stripUnknown: true, // remove unknown props
		};

		// validate request body against schema
        req.body.id = req.params.id;
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
    },
    
    validate_transfer_fund: function (req, res, next) {
        const schema = Joi.object({
            id: Joi.string().pattern(/^[0-9]+$/).required(),
            receiver_account: Joi.number().required(),
            amount: Joi.number().required()
		});

		// schema options
		const options = {
			abortEarly: false, // include all errors
			allowUnknown: true, // ignore unknown props
			stripUnknown: true, // remove unknown props
		};

		// validate request body against schema
        req.body.id = req.params.id;
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
    },
}