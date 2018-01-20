const token = 'BOT_TOKEN';
const github = {
    version: '3.0.0',
    debug: true,
    protocol: 'https',
    host: 'api.github.com',
    pathPrefix: '',
    timeout: 5000,
    headers: {
        'user-agent': 'fluffy memory'
    }
};
export default {token, github};
