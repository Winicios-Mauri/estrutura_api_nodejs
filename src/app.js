import 'dotenv/config';

import express from 'express';
import * as Sentry from '@sentry/node';
import { ProfilingIntegration } from '@sentry/profiling-node';
import Youch from 'youch';
import 'express-async-errors';
import routes from './routes';

import sentryConfig from './config/sentry';

// import authMiddleware from './app/middlewares/auth';
import './database';

class App {
  constructor() {
    this.server = express();

    Sentry.init({
      dsn: sentryConfig,
      integrations: [
        // enable HTTP calls tracing
        new Sentry.Integrations.Http({ tracing: true }),
        // enable Express.js middleware tracing
        // new Sentry.Integrations.Express(this.server),
        new ProfilingIntegration(),
      ],
      // Performance Monitoring
      tracesSampleRate: 1.0, // Capture 100% of the transactions, reduce in production!
      // Set sampling rate for profiling - this is relative to tracesSampleRate
      profilesSampleRate: 1.0, // Capture 100% of the transactions, reduce in production!
    });

    this.middlewares();
    this.routes();
    this.exceptionHandler();
  }

  middlewares() {
    this.server.use(Sentry.Handlers.requestHandler());
    this.server.use(express.json());
    this.server.use(express.urlencoded({ extended: false }));
    // this.server.use(authMiddleware);
  }

  routes() {
    this.server.use(routes);
    this.server.use(Sentry.Handlers.errorHandler());
  }

  exceptionHandler() {
    this.server.use(async (err, req, res, next) => {
      if (process.env.NODE_ENV === 'development') {
        const errors = await new Youch(err, req).toJSON();
        return res.status(500).json(errors);
      }

      return res.status(500).json({ error: 'Internal Server Error' });
    });
  }
}

export default new App().server;
