import fs from 'fs';
import config from './config.ts';
import bootstrapper from '../client/bootstrapper.ts';
import type { NextFunction, Request, Response } from 'express';

export const logger = console;

export const catchRejections = (
	callback: (
		req: Request,
		res: Response,
		next: NextFunction
	) => Promise<unknown>
) => {
	return (req: Request, res: Response, next: NextFunction) => {
		callback(req, res, next).catch(next);
	};
};

export class HttpError extends Error {
	status: number;

	constructor(status: number, message: string) {
		super(message);
		this.status = status;
		this.message = message;
	}
}

export const stripSpace = (string: string) =>
	string.replace(/\n/g, '').replace(/\t/g, '').replace(/\s\s+/g, ' ');

export const importFile = (filePath: fs.PathOrFileDescriptor) => {
	if (typeof filePath !== 'string') {
		throw new TypeError(
			`Expected one argument, and expected it to be a file path as a string.`
		);
	}

	return fs.readFileSync(filePath).toString();
};

export const toHtmlDocString = ({
	body,
	styles = '',
	title
}: {
	body: string;
	styles?: string;
	title: string;
}) => {
	const maybeEnhancer = config.USES_CLIENT_JS
		? `\n\t\t<script type="module">${stripSpace(bootstrapper)}</script>`
		: '';

	return `<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<meta name="description" content="A website containing silly things">
		<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
		<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
		<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
		<link rel="manifest" href="/site.webmanifest">
		<title>${title}</title>
		<style>${stripSpace(styles)}</style>${maybeEnhancer}
	</head>
	<body>
		<main>
			${body}
		</main>
	</body>
</html>`;
};
