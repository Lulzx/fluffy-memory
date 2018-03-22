'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
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
exports.default = { token, github };
module.exports = exports['default'];
//# sourceMappingURL=config.js.map
