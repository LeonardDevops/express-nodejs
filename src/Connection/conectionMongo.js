require('dotenv').config();
const { MongoClient } = require("mongodb");

// Validar que MONGO_URI está configurado
if (!process.env.MONGO_URI) {
  throw new Error('MONGO_URI não configurado. Verifique o arquivo .env');
}

const client = new MongoClient(process.env.MONGO_URI);

/**
 * Conecta ao MongoDB e retorna a instância do cliente
 * @returns {Promise<MongoClient>}
 */
async function connectMongo() {
  try {
    await client.connect();
    console.log('✓ Conectado ao MongoDB');
    return client;
  } catch (error) {
    console.error('✗ Erro ao conectar ao MongoDB:', error.message);
    process.exit(1);
  }
}


/**
 * Fecha a conexão com MongoDB
 */
async function closeMongo() {
  if (client) {
    await client.close();
    console.log('✓ Conexão com MongoDB fechada');
  }
}

module.exports = { client, connectMongo, closeMongo };

