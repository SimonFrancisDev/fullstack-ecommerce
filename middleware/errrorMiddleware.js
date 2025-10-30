module.exports = function notFound(err, req, res, next) {
    const err = new Error(`Not found - ${req.originalUrl}`)
    res.status(400)
}


module.exports =  function errorHandler (err, req, res, next) {
    const statusCode = res.statusCode === 200 ? 500: res.statusCode; // tenary operators
    res.json({
        message: `Attention: ${err.message}`,
        stack: process.env.NODE_ENV === "production" ? "Hello": err.stack})
}