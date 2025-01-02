// deps
const crypto = require('crypto');
const environments = require('./environments');

const utilities = {};

// Parse JSON string to object
utilities.parseJSON = (jsonString) => {
    let output;

    try {
        output = JSON.parse(jsonString); // Parse the JSON string
    } catch {
        output = {}; // Return an empty object if parsing fails
    }

    return output; // Return the parsed object
};

// Hash string
utilities.hash = (string) => {
    if (typeof string === 'string' && string.length > 0) {
        const secretKey = environments[process.env.NODE_ENV]?.secretkey;

        if (!secretKey) {
            throw new Error("Secret key is not defined in the environment configuration.");
        }

        const hash = crypto
            .createHmac('sha256', secretKey)
            .update(string)
            .digest('hex');

        return hash;
    } else {
        return false; // Return false for invalid input
    }
};

module.exports = utilities;

