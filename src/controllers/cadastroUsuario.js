const { cadastrarUsuarioHome} = require("../models/HomeModel")

exports.cadastroUser = (req, res) => {
res.render('cadastro' , {erros:null , sucesso:null});
}

exports.enviarCadastro = async (req, res) => {
  // req.body contém os dados enviados pelo formulário <form> do HTML
  const resultado = await cadastrarUsuarioHome(req.body);

  if (!resultado.sucesso) {
    // Se deu erro na validação do Zod ou banco, devolve os erros para a tela
    return res.render('cadastro', { erros: resultado.erros, sucesso: null });
  }

  // Se deu certo, avisa a tela
  res.render('cadastro', { erros: null, sucesso: "Usuário cadastrado com sucesso!" });
};

