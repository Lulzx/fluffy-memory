const token = 'BOT_TOKEN';
const octokit = require('@octokit/rest')({
    timeout: 5000,
    headers: {
        accept: 'application/vnd.github.v3+json',
        'user-agent': 'octokit/rest.js v1.2.3'
    },
    baseUrl: 'https://api.github.com',
    agent: undefined
});
export default {token, octokit};
