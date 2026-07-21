exports.paginaInicial = (req, res, next) => {
    res.render('index', {
        titulo:"este e nosso titulo "
    });
    next();
}

exports.trataPost= (req , res) => {
    res.send('ei sou sua nova rota de POST')
}