// src/server.ts

import express, { Express, Request, Response, NextFunction } from 'express';
import path from 'path';
import http from 'http';
import { initialiserMeldingstjeneste } from './meldingstjeneste';
import { initialiserKortspill } from './kortspill';
import { router as playersRouter, spillere } from './players';

const app: Express = express();
const port = 80;

app.use(express.json());
const bodyParser = require('body-parser');
app.use(bodyParser.json());

// Middleware to handle CORS headers
app.use((req: Request, res: Response, next: NextFunction) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Serve static files
app.use("/", express.static(path.join(__dirname, "../../Client/dist")));

// Use the players router
app.use('/api', playersRouter);

// Attach routes from meldingstjeneste.ts
initialiserMeldingstjeneste(app, spillere);

// Create an HTTP server and attach the Express app
const server = http.createServer(app);

// Additional server configurations...

// Server listening
server.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`);
});

// Handle SIGTERM
process.on('SIGTERM', () => {
  server.close(() => {
    console.log('Server terminated');
  });
});
