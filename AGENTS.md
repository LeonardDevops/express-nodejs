# AGENTS.md

## Projeto
- Este repositório é uma aplicação pequena em Express com ponto de entrada em [server.js](server.js).
- As rotas ficam em [routes/routes.js](routes/routes.js) e a lógica de cada rota em [src/controllers/homeControllers.js](src/controllers/homeControllers.js).
- As views ficam em [src/views](src/views).

## Convenções do projeto
- Inicie a aplicação com `npm run dev`.
- Mantenha o ponto de entrada em [server.js](server.js) simples e sem lógica de negócio extra.
- Ao configurar o diretório de views, use `path.join(__dirname, 'src', 'views')` (ou `path.resolve`) e preserve o nome da pasta exatamente como `views`.
- Ao adicionar rotas, registre a rota no arquivo [routes/routes.js](routes/routes.js) e mantenha a implementação no controlador correspondente.
- Este projeto é simples e ainda não possui suíte de testes automatizados.

## Configuração do MongoDB

### ⚠️ CRÍTICO - Segurança
**NUNCA commite credenciais no código.** O arquivo [src/Connection/conectionMongo.js](src/Connection/conectionMongo.js) atualmente expõe credenciais sensíveis. Siga:

1. **Criar arquivo `.env`** na raiz do projeto:
```
MONGO_URI=mongodb+srv://<username>:<password>@<cluster>/?authSource=admin&authMechanism=SCRAM-SHA-1
```

2. **Atualizar `conectionMongo.js`** para usar variáveis de ambiente:
```javascript
require('dotenv').config();
const { MongoClient } = require('mongodb');

const client = new MongoClient(process.env.MONGO_URI);
```

3. **Adicionar `.env` ao `.gitignore`** (se não existir, criar):
```
.env
.env.local
```

### Escolha do driver
- **`mongoose`** — Use para modelos/schemas estruturados (recomendado se tiver collections com estrutura)
- **`mongodb`** — Use para queries diretas sem schemas (mais flexível, menos overhead)
- **Ambos estão instalados** — escolha um para evitar redundância

### Estrutura recomendada
- Conexão: [src/Connection/](src/Connection/) (considere renomear para `database` ou `db`)
- Modelos/Controllers: [src/controllers/](src/controllers/)
- Utilize `require('dotenv').config()` no início de [server.js](server.js)

## Ponto de atenção comum
- Em [server.js](server.js), o módulo `path` deve ser usado como `path.join` ou `path.resolve`; não como uma função.
- O caminho das views precisa bater com o nome real da pasta em disco, incluindo o caso (`views`, não `Views`).
- **Credenciais do MongoDB devem estar SEMPRE em `.env`**, nunca no código versionado.
