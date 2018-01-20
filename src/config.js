const token = 'BOT_TOKEN';
const github = {
    version: '13.1.1',
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
