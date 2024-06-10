const express = require('express');
const app = express();
const cors = require('cors');
const https = require('https');
const bodyParser = require('body-parser');
const fs = require('fs');
require("dotenv").config();

const helmet = require('helmet');

const empresaRouter = require('./routes/empresa.js');
const interpreteRouter = require('./routes/interprete.js');
const eventoRouter = require('./routes/evento.js');
const habilidadeRouter = require('./routes/habilidade.js');
const authRouter = require('./routes/auth.js');
const staticRouter = require('./routes/static.js');
const adminRouter = require('./routes/admin.js');

const options = {
    key: fs.readFileSync("//etc/letsencrypt/live/nova.monitor.eco.br/privkey.pem"),
    cert: fs.readFileSync("//etc/letsencrypt/live/nova.monitor.eco.br/fullchain.pem")
  };

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

var httpsServer = https.createServer(options, app);

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: '50mb' }));
// app.use(bodyParser.text({ type: 'text/xml' }));
// app.use(bodyParser.text({ type: 'text/csv' }));

app.use(cors());
app.use(
    helmet({
      crossOriginResourcePolicy: false,
      contentSecurityPolicy: false,
    })
  );

app.use(
helmet.contentSecurityPolicy({
    directives: {
    "script-src": ["'self'", "https://www.gstatic.com"],
    "style-src": null,
    },
})
);

// Redirecionamentos para grupo de rotas específicas
app.use('/uploads/pics', express.static('uploads/pics'));
app.use('/uploads/files', express.static('uploads/files'));
app.use('/empresa', empresaRouter);
app.use('/interprete', interpreteRouter);
app.use('/habilidade', habilidadeRouter);
app.use('/evento', eventoRouter);
app.use('/auth', authRouter);
app.use('/static', staticRouter);
app.use('/admin', adminRouter);

httpsServer.listen(3101,function(erro){
  if(erro){
      console.log("Ocorreu um erro!")
  }else{
      console.log("Servidor Klumie iniciado com sucesso!")
  }
})