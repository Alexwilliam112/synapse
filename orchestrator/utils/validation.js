const { GraphQLError } = require("graphql")

module.exports = (() => {
    class Validation {
        static errorOptions = {
            extensions: {
                http: {
                    status: 400,
                },
            },
        }

        static dataType(inputValue, dataType) {
            console.log(typeof (inputValue), inputValue);
            if (typeof (inputValue) !== dataType) {
                throw new GraphQLError(
                    `Invalid data type for ${fieldName}`
                )
            }
            return;
        }

        static notEmpty(inputValue, fieldName) {
            if (!inputValue) {
                throw new GraphQLError(
                    `${fieldName} is required (not empty)`,
                    Validation.errorOptions
                )
            }

            if (inputValue.trim().length === 0) {
                throw new GraphQLError(
                    `${fieldName} is required (not empty)`,
                    Validation.errorOptions
                )
            }
            return;
        }

        static length(inputValue, minLength = 100, fieldName = '') {
            if (inputValue.length < Number(minLength)) {
                throw new GraphQLError(
                    `${fieldName} minimum length is ${minLength}`,
                    Validation.errorOptions
                )
            }
            return;
        }

        static async unique(inputValue, callback_query, fieldName) {
            const dataObj = await callback_query({ [fieldName]: inputValue })
            if (dataObj) {
                throw new GraphQLError(
                    `${fieldName} must be unique value`,
                    Validation.errorOptions
                )
            }
            return;
        }
    }
    return Validation;
})()