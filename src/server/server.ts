import express from 'express';
import {Router} from 'express';
import * as bodyParser from "body-parser";
import * as helmet from "helmet";
import logger from 'morgan';

const fs = require('fs');
const https = require('https');


const config = require('../../config.json');
const privateKey = fs.readFileSync(`/etc/letsencrypt/live/${config.server.domain}/privkey.pem`, 'utf8');
const certificate = fs.readFileSync(`/etc/letsencrypt/live/${config.server.domain}/cert.pem`, 'utf8');
const ca = fs.readFileSync(`/etc/letsencrypt/live/${config.server.domain}/chain.pem`, 'utf8');

const credentials = {
	key: privateKey,
	cert: certificate,
	ca: ca
};

const cspSrc = {
  api: "https://*.api.firstdata.com",
  dataProtocol: "data:",
  lib: "https://lib.paymentjs.firstdata.com",
  none: "'none'",
  self: "'self'",
  unsafeInline: "'unsafe-inline'",
};

export function startServer(port: number, router: Router) {
  const app = express();

  app.use(helmet.hidePoweredBy());
  app.use(helmet.hsts({ maxAge: 15552000 }));
  app.use(helmet.noSniff());
  app.use(helmet.permittedCrossDomainPolicies());
  app.use(helmet.ieNoOpen());
  app.use(helmet.frameguard({ action: "deny" }));
  app.use(helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: [cspSrc.none],
      scriptSrc: [cspSrc.self, cspSrc.lib],
      connectSrc: [cspSrc.self, cspSrc.api, cspSrc.lib],
      imgSrc: [cspSrc.self, cspSrc.dataProtocol],
      styleSrc: [cspSrc.self, cspSrc.lib, cspSrc.unsafeInline],
      childSrc: [cspSrc.lib],
      fontSrc: [cspSrc.self, cspSrc.lib],
      frameAncestors: [cspSrc.self, cspSrc.lib],
    },
  }));

  app.use(logger("dev"));
  app.use(bodyParser.json({ limit: "1kb" }));

  app.use("/", router);

  app.listen(port, () => {
    console.log(`server started on port ${port}`);
  });

  const httpsServer = https.createServer(credentials, app);

  httpsServer.listen(443, () => {
    console.log('HTTPS Server running on port 443');
  });
}

