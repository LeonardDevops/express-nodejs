require('dotenv').config();
const express = require('express');
const path = require('path');
const {middlewareGlobal , checkCsrError , checkCsrToken} = require('./src/middlewares/middleware')
const helmet = require('helmet')
const crf = require('csurf')
const { connectMongo , client } = require('./src/Connection/conectionMongo');

const session = require('express-session');
const { MongoStore }= require('connect-mongo');
const flashMessage = require('connect-flash');




const app = express();
const routes = require('./routes/routes');


// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, 'public')));
app.use(express.json())
app.use(helmet());
app.use(crf());
app.use(middlewareGlobal)
app.use(checkCsrError)
app.use(checkCsrToken)


// sessions options 

const sessionOptions = session({
  secret:'aslkdlkdsldjk36sfmasfq',
  store: MongoStore.create({
    client:client
  }),
  resave:false,
  saveUninitialized:false,
  cookie:{
    maxAge: 1000 * 60 * 60 * 24 * 7,
    httpOnly:true
  }
})


app.use(sessionOptions);
app.use(flashMessage());

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

