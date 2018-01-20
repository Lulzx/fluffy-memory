'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.scopes = undefined;
exports.search = search;
exports.searchCode = searchCode;
exports.searchIsuues = searchIsuues;
exports.searchRepos = searchRepos;
exports.searchUsers = searchUsers;

var _github = require('github');

var _github2 = _interopRequireDefault(_github);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const github = new _github2.default({ version: '13.1.1' });
function search(scope, data) {
    return new Promise((resolve, reject) => {
        github.search[scope](data, (err, response) => {
            if (err) {
                return reject(err);
            }
            return resolve(response);
        });
    });
}
function searchCode(data) {
    return search('code', data);
}
function searchIsuues(data) {
    return search('issues', data);
}
function searchRepos(data) {
    return search('repos', data);
}
function searchUsers(data) {
    return search('users', data);
}
const scopes = exports.scopes = {
    issues: {
        keywords: ['issue', 'issues', 'i'],
        defaultOptions: {
            sort: 'comments',
            order: 'desc',
            per_page: 10
        }
    },
    repos: {
        keywords: ['repo', 'repos', 'repository', 'r'],
        defaultOptions: {
            sort: 'stars',
            order: 'desc',
            per_page: 10
        }
    },
    users: {
        keywords: ['user', 'users', 'u'],
        defaultOptions: {
            sort: 'followers',
            order: 'desc',
            per_page: 10
        }
    }
};
//# sourceMappingURL=github.js.map
