import { logger, toHtmlDocString } from '../helpers.ts';
import config from '../config.ts';
import type { Request, Response } from 'express';
import type { BaseUiViewModel } from '../../types.ts';

type ViewModel = BaseUiViewModel & { message: string };

export const controller = async (req: Request, res: Response) => {
	const requestId = req.get('X-Request-ID');
	const acceptsHtml = Boolean(req.accepts('html'));
	const data = getData();

	logger.debug({
		event: 'ROUTE_NOT_FOUND',
		acceptsHtml,
		requestId,
		url: req.url
	});

	if (acceptsHtml) {
		const html = view(data);

		return res.status(404).send(html);
	}

	res.status(404).json({
		message: data.message,
		status: 404
	});
};

const getData = () => {
	const data: ViewModel = {
		message:
			'Page not found.</p><p>Did you go to this address manually? Try going back and following the links, or starting again at the <a href="/">first page</a>. That <i>should</i> fix it for you, fingers crossed.',
		text: { title: `An error happened (404) — ${config.APP_FRIENDLY_NAME}` }
	};

	return data;
};

const view = ({ message, text }: ViewModel) => {
	const body = `
		<h1>${text.title}</h1>
		<p>${message}</p>
	`;

	return toHtmlDocString({ body, title: text.title });
};
