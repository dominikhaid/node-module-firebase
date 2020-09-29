const express = require('express');
const fs = require('fs');
const path = require('path');
const multer = require('multer');
var upload = multer({dest: 'uploads/'});
const server = express();

const startDotenv = require('./src/bin/env').startDotenv;
startDotenv();

const bodyParser = require('body-parser');
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended: true}));

const accessLogStream = fs.createWriteStream(
  path.join(__dirname, 'log/access.log'),
  {
    flags: 'a',
  },
);

const startMorgan = require('./src/bin/morgan').startMorgan;
startMorgan(server, accessLogStream);

let serverOptions;
try {
  serverOptions = require('./server-config.json');
} catch (error) {
  //console.debug(error)
}

if (!serverOptions) {
  serverOptions = {
    server: 'next',
    mail: false,
    cors: false,
    helment: true,
    jwt: false,
    fireadmin: false,
    uploads: false,
    http: true,
    https: false,
    static: 'public',
  };
}

server.get('*', upload.single('file'), function (req, res, next) {
  req.xssFilter = require('./src/includes/xssFilter');

  next();
});

server.post('*', upload.single('file'), function (req, res, next) {
  req.xssFilter = require('./src/includes/xssFilter');

  next();
});

server.delete('*', upload.single('file'), function (req, res, next) {
  req.xssFilter = require('./src/includes/xssFilter');
  next();
});

server.patch('*', upload.single('file'), function (req, res, next) {
  req.xssFilter = require('./src/includes/xssFilter');

  next();
});

server.put('*', upload.single('file'), function (req, res, next) {
  req.xssFilter = require('./src/includes/xssFilter');
  next();
});

if (serverOptions.static) {
  server.use(
    process.env.PUBLIC_FOLDER,
    express.static(process.env.PUBLIC_FOLDER),
  );
}

if (serverOptions.helment) {
  const startHelmet = require('./src/bin/helmet').startHelmet;
  startHelmet(server);
}

if (serverOptions.cors) {
  const startCors = require('./src/bin/cors').startCors;
  startCors(server);
}

if (serverOptions.jwt) {
  const checkReqErrors = require('./src/includes/status').checkReqErrors;
  const jsonWebToken = require('jsonwebtoken');
  const myJWTSecretKey = require('./src/includes/jwt').myJWTSecretKey;

  server.use('/api/auth', (req, res, next) => {
    try {
      if (!req.headers.authorization) {
        checkReqErrors({error: 'You are not Authorized'}, res);
        return;
      }
      jsonWebToken.verify(
        req.headers.authorization.replace(/^Bearer\s/, ''),
        myJWTSecretKey(),
      );
      next();
    } catch (error) {
      console.debug('JWT LOGIN ERROR', error);
      checkReqErrors({error: error}, res);
    }
  });
}

let http, https, httpServer, httpsServer;

if (serverOptions.http) {
  http = require('http');
  httpServer = http.createServer(server);
}

if (serverOptions.https) {
  https = require('https');
  privateKey = fs.readFileSync('certificates/key.pem', 'utf8');
  certificate = fs.readFileSync('certificates/cert.pem', 'utf8');
  credentials = {key: privateKey, cert: certificate};
  httpsServer = https.createServer(credentials, server);
}

if (serverOptions.server === 'next') {
  const startNext = require('./src/bin/next').startNext;
  startNext(server, serverOptions, {
    http: http,
    httpServer: httpServer,
    https: https,
    httpsServer: httpsServer,
  });
  return;
}

module.exports.server = server;
module.exports.serverOptions = serverOptions;
