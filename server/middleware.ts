import type { NextFunction, Request, Response } from 'express';

import helmet from 'helmet';
import config from './config.ts';
import { HttpError } from './helpers.ts';

export const doNotCache = (
	_req: Request,
	res: Response,
	next: NextFunction
) => {
	res.setHeader(
		'Cache-Control',
		'no-store, no-cache, must-revalidate, proxy-revalidate'
	);
	res.setHeader('Pragma', 'no-cache');
	res.setHeader('Expires', '0');

	next();
};

/**
 * @param {number} maxAge Maximum cache time in seconds
 * @param {object} options
 * @param {boolean} [options.isPrivate] Set this to true if the response is personalised to a user or account
 */
export const cacheFor = (
	maxAge: number,
	{ isPrivate = false }: { isPrivate?: boolean } = {}
) => {
	return (_req: Request, res: Response, next: NextFunction) => {
		res.setHeader(
			'Cache-Control',
			`${isPrivate ? 'private' : 'public'}, max-age=${maxAge}`
		);

		next();
	};
};

export const disallowInProduction = (
	_req: Request,
	_res: Response,
	next: NextFunction
) => {
	if (config.IS_PRODUCTION) {
		return next(
			new HttpError(405, 'This method or route is not allowed in production')
		);
	}
	next();
};

export const security = (req: Request, res: Response, next: NextFunction) => {
	const options = config.USES_CLIENT_JS
		? {
				contentSecurityPolicy: {
					directives: {
						'script-src': [
							`'self'`,
							// Hash of the client-side JS bootstrapper
							`'sha256-BxipDLngHa9KSbGACViVDOeFGCKCGXaPUjSbEuOH5hk='`
						]
					}
				}
			}
		: undefined;

	helmet(options)(req, res, next);
};
