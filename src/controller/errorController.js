module.exports = {
    returnInternalServerError(error, res) {
        let response = {
            status: 'fail',
            message: error.message,
            stack: error.stack
        }
        console.log(error);
        res.send(response);
    }
}
