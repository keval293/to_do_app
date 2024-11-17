const bulkMessages = require("./constant.js").code;
const type = require("./constant").type;

const successResponse = (code) => {
    return {type: type.success, message: bulkMessages[code]};
};

const errorResponse = (code) => {
    return {type: type.error, message: bulkMessages[code]};
};

const notFoundResponse = (code) => {
    return {type: type.success , message: bulkMessages[code], response: []};
};

module.exports = {
    successResponse,
    errorResponse,
    notFoundResponse
};