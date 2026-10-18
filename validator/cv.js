const { Validator } = require('jsonschema');

module.exports = {
    verifyCv: (Cv) => {
        if (!Cv) {
            throw new Error('Cannot create new cv');
        }
        let validator = new Validator();
        let cvSchema = {
            type: 'object',
            properties: {
                description: {
                    type: 'string',
                    minLength: 3,
                    errorMessage: 'Provide description is invalid'
                },
                visible: {
                    type: Boolean,
                    minLength: 1,
                    errorMessage: 'visible is invalid'
                }
            },
            required: ['description', 'visible']
        };

        let result = validator.validate(Cv, cvSchema);

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
