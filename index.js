"use strict";
import dotenv from "dotenv";
dotenv.config();
import express from "express";
import colors from "colors";
import http from "http";
import apis from "./src/routes/apis";
import transform from "./src/common/interceptors/mung";
import appMiddleware from "./src/middlewares/AppMiddleware";
import { errorHandler } from "./src/common/interceptors/error-handler";

async function init() {
  const app = express();

  const port = process.env.PORT ?? 3000;

  // create http server
  const httpServer = http.createServer(app);
  httpServer.listen(port, () => {
    console.log(`Server running on port ${port}`.cyan);
  });

  // set common express middlewares
  appMiddleware(app);

  // transform response body
  app.use(transform);

  // set global prefix for apis
  app.use("/api", apis);

  // handle exceptions
  app.use(errorHandler);
}

init();
