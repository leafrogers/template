import type { NextFunction, Request, Response } from 'express';
import config from '../config.ts';
import { HttpError, logger, toHtmlDocString } from '../helpers.ts';
import type { BaseUiViewModel } from '../../types.ts';

interface PageSpecificViewModel {
	status: number;
	message: string;
}

type ViewModel = BaseUiViewModel & PageSpecificViewModel;

export const controller = (
	error: HttpError,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const requestId = req.get('X-Request-ID');
	const acceptsHtml = Boolean(req.accepts('html'));

	if (res.headersSent) {
		return next(error);
	}

	try {
		const data = getData({
			error,
			status: error.status
		});

		logger.debug({
			event: 'PROCESSING_ERROR',
			acceptsHtml,
			error,
			requestId
		});

		if (acceptsHtml) {
			const html = view(data);
			return res.status(data.status).send(html);
		}

		res.status(data.status).json({
			message: data.message,
			status: data.status
		});
	} catch (err) {
		next(err);
	}
};

const getData = ({
	error,
	status = 0
}: {
	error: Error;
	status: number;
}): ViewModel => {
	try {
		return {
			text: {
				title: `An error happened (${status}) — ${config.APP_FRIENDLY_NAME}`
			},
			message: config.IS_PRODUCTION ? 'Something went wrong.' : error.message,
			status
		};
	} catch (error) {
		logger.error({ error, status });

		return {
			text: {
				title: 'A confusing error happened'
			},
			message:
				'Something unexpected happened that messed up the serving of this page',
			status: 500
		};
	}
};

const view = ({ message, text }: ViewModel) => {
	const body = `
		<h1>${text.title}</h1>
		<p>${message}</p>
	`;

	return toHtmlDocString({ body, title: text.title });
};
