import { startServer } from "./server";
import { getRouter } from "./router";
import { loadConfigAsync } from "./config";

// const port = process.env.PORT ? Number(process.env.PORT) : 80;
const port = 80;

loadConfigAsync()
  .then((config) => {
    const router = getRouter(config);
    startServer(port, router);
  });

