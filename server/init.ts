import config from './config.ts';
import app from './app.ts';
import { logger } from './helpers.ts';

const { PORT } = config;

app.listen(PORT, () => {
	logger.info({
		event: 'APP_STARTED',
		message: `Listening on port ${PORT}`,
		url: `http://localhost:${PORT}`
	});
});
