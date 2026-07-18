const express = require("express")
const route = express.Router();
const homeController = require('../src/controllers/homeControllers.js')
const { cadastroUser, enviarCadastro } = require("../src/controllers/cadastroUsuario.js")

route.post('/cadastro', enviarCadastro)
route.get('/cadastro', cadastroUser)
route.get('/', homeController.paginaInicial, );
route.post('/', homeController.trataPost );



module.exports = route;