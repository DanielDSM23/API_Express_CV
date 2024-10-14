const { Validator } = require('jsonschema');

module.exports = {
    verifyProfessional: (Professional) => {
        if (!Professional) {
            throw new Error('Cannot create new professional');
        }
        let validator = new Validator();
        let professionalSchema = {
            type: 'object',
            properties: {
                cv: {
                    type: 'string',
                    minLength: 3,
                    errorMessage: 'Provide cv is invalid'
                },
                title: {
                    type: 'string',
                    minLength: 3,
                    errorMessage: 'Provide title is invalid'
                },
                company: {
                    type: Boolean,
                    minLength: 1,
                    errorMessage: 'company is invalid'
                },
                startDate: {
                    type: Date,
                    minLength: 1,
                    errorMessage: 'startDate is invalid'
                },
                endDate: {
                    type: Date,
                    minLength: 1,
                    errorMessage: 'endDate is invalid'
                }
            },
            required: ['cv', 'title']
        };

        let result = validator.validate(Professional, professionalSchema);

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
