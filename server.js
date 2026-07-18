require('dotenv').config();
const express = require('express');
const path = require('path');
const { connectMongo } = require('./src/Connection/conectionMongo');

const app = express();
const routes = require('./routes/routes');


// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, 'public')));
app.use(express.json())

// View engine
app.set('views', path.join(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');

// Routes
app.use(routes);

// Conectar ao MongoDB e iniciar servidor
(async () => {
  try {
    await connectMongo();
    
    app.listen(3000, () => {
      console.log('✓ Servidor rodando em http://localhost:3000/')
    });
    
   

     
  } catch (error) {
    console.error('✗ Falha ao iniciar servidor:', error.message);
    process.exit(1);
  }
})();

