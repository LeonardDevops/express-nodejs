exports.middlewareGlobal = (req, res, next) => {
    res.locals.umaVariavelLocal = 'este e o valor da variavel local';
    next();

}
exports.outroMiddleware = (req , res, next) => {
    next(); 
}
exports.checkCsrError = (err , req , res, next) => {
    if (err && ':misconfigured csrf' === err.code ) {
        return res.render('404');
    }

    next(); 
}
exports.checkCsrToken = ( req , res, next) => {
   res.locals.checkCsrToken = req.checkCsrToken();
   next();
}