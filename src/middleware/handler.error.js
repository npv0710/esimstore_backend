const handlerError = fn => {
    return (req, res, next) => {
        console.log('call back next: ')
        console.log(next)
        fn(req, res, next).catch(next)
    }
}

module.exports = {
    handlerError
}