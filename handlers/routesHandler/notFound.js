// sample handler

const handler = {};

handler.notFoundHandler = (requestProperty, callback) => {
    callback(404, {
        message: "your requested url was not found",
    })
}

module.exports = handler;
