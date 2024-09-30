import { importFile, toHtmlDocString } from '../helpers.ts';
import config from '../config.ts';
import type { Request, Response } from 'express';
import type { BaseUiViewModel } from '../../types.ts';

interface PageSpecificViewModel {
	text: object;
}

type ViewModel = BaseUiViewModel & PageSpecificViewModel;

const commonCss = importFile('server/pages/common.css');

export const controller = async (_req: Request, res: Response) => {
	const data = {
		text: { title: config.APP_FRIENDLY_NAME }
	};

	res.send(view(data));
};

const view = ({ text }: ViewModel) => {
	const body = `
			<h1>${text.title}</h1>
			<p>Hello</p>
	`;

	return toHtmlDocString({
		body,
		styles: `
			${commonCss}

			p {
				border: 1px solid green;
				padding: 1rem;
			}
		`,
		title: text.title
	});
};
