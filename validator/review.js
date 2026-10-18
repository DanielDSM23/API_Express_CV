const { Validator } = require('jsonschema');

module.exports = {
    verifyReview: (Review) => {
        if (!Review) {
            throw new Error('Cannot create new review');
        }
        let validator = new Validator();
        let reviewSchema = {
            type: 'object',
            properties: {
                cv: {
                    type: 'string',
                    minLength: 3,
                    errorMessage: 'Provide cv is invalid'
                },
                rate: {
                    type: Number,
                    min: [0, 'Rate must be at least 0'],
                    max: [5, 'Rate cannot exceed 5'],
                    required: true, // If you want the rate to be a required field
                    validate: {
                        validator: Number.isInteger, // Ensure it's an integer if needed
                        message: 'Rate must be an integer'
                    },
                    errorMessage: 'Provide rate is invalid'
                },
                description: {
                    type: 'string',
                    minLength: 1,
                    errorMessage: 'company description invalid'
                }
            },
            required: ['cv', 'rate']
        };

        let result = validator.validate(Review, reviewSchema);

        if (result.errors.length) {
            const errorInputsMsg = result.errors
                .map((error) => {
                    return error.schema.errorMessage || error.message;
                })
                .join(' ');

            throw new Error(errorInputsMsg);
        }
    }
};
