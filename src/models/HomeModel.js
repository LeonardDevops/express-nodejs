const { z } = require("zod");
const {client} = require( "../Connection/conectionMongo");
const { mongosc } = require("mongodb");

const UsuarioSchema = z.object({

nome: z.string().min(3, "O nome deve ter pelo menos 3 caracteres"),
  email: z.string().email("E-mail inválido"),
  idade: z.coerce.number().int().positive().optional(),
  criadoEm: z.date().default(() => new Date())
});

 async function cadastrarUsuarioHome(dadosOriginais) {
    
    try {
        
        const db = client.db('Cluster0')
        const  colection = db.collection('usuarios');
        const dadosValidados =  UsuarioSchema.parse(dadosOriginais)

        const resultado = await colection.insertOne(dadosValidados);
        console.log("usuario inserido com sucesso id:" + resultado.insertedId)
       return { sucesso: true, id: resultado.insertedId };
       
    } catch (error) {
       
       console.error("Erro capturado no Model:", error.message);
    
    // 🔍 CORREÇÃO AQUI: Mudamos de error.errors para error.issues
    if (error instanceof z.ZodError) {
      return { 
        sucesso: false, 
        erros: error.issues.map(issue => issue.message) 
      };
    }
    
    return { 
      sucesso: false, 
      erros: ["Erro interno ao salvar no banco de dados. Verifique a conexão."] 
    };
    
    }
}




module.exports = {cadastrarUsuarioHome};