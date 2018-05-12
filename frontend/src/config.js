const config = {
	server: {
		host: 'localhost',
		port: 3001
	}
};

export const api = `${config.server.host}:${config.server.port}`;
export const headers = { 'Authorization': 'readable' };

export default config;
