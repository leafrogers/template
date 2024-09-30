import express from 'express';
import compression from 'compression';
import favicon from 'serve-favicon';

import {
	cacheFor,
	doNotCache,
	disallowInProduction,
	security
} from './middleware.ts';
import { catchRejections } from './helpers.ts';

import { controller as catchErrors } from './pages/error-catch-all.ts';
import { controller as notFound } from './pages/error-not-found.ts';
import { controller as home } from './pages/home.ts';

const app = express();
const oneDayInMs = 60 * 60 * 24;

app.use(security);
app.use(compression());
app.use(favicon('public/favicon.ico'));
// express.static needs to be called *before* setting a
// general Cache-Control header, otherwise express.static
// cache options are ignored
app.use(express.static('public', { maxAge: '1 day' }));
app.use(doNotCache);

app.get('/', catchRejections(home));

app.get('/throw-error-in-prod', disallowInProduction);

app.use(cacheFor(oneDayInMs), catchRejections(notFound));
app.use(catchErrors);

export default app;
