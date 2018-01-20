'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _nodeTelegramBotApi = require('node-telegram-bot-api');

var _nodeTelegramBotApi2 = _interopRequireDefault(_nodeTelegramBotApi);

var _github = require('./github');

var github = _interopRequireWildcard(_github);

var _config = require('./config');

var _templates = require('./templates');

var _commands = require('./commands');

var _commands2 = _interopRequireDefault(_commands);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const bot = new _nodeTelegramBotApi2.default(_config.token, { polling: true });
bot.onText(_commands2.default.search.regex, (() => {
    var _ref = _asyncToGenerator(function* (msg, matches) {
        const searchData = {
            scope: matches[1],
            term: matches[2]
        };
        const scopeKeys = Object.keys(github.scopes);
        const scope = scopeKeys.find(function (item) {
            return github.scopes[item].keywords.includes(searchData.scope);
        });
        if (!scope) {
            return bot.sendMessage(msg.chat.id, `I don't 
understand what's that "${searchData.scope}"!`);
        }
        const options = _extends({}, github.scopes[scope].defaultOptions, {
            q: searchData.term
        });
        const result = yield github.search(scope, options);
        bot.sendMessage(msg.chat.id, (0, _templates.loadTemplate)(scope, result), { parse_mode: 'Markdown' });
    });

    return function (_x, _x2) {
        return _ref.apply(this, arguments);
    };
})());
bot.on('message', msg => {
    if (!msg.text && !msg.query) {
        return bot.sendMessage(msg.chat.id, `Sry! I 
only understand text stuff. Use /help to get some 
help about my commands.`);
    }
    const commandNames = Object.keys(_commands2.default);
    const knownCommand = commandNames.find(item => {
        return _commands2.default[item].regex.exec(msg.text);
    });
    if (knownCommand && _commands2.default[knownCommand].initMessage) {
        return bot.sendMessage(msg.chat.id, _commands2.default[knownCommand].initMessage, { parse_mode: 'Markdown' });
    }
    if (knownCommand || msg.query) {
        return false;
    }
    bot.sendMessage(msg.chat.id, `Sry! I didn't 
understand that "${msg.text}". Use /help to get some 
help about my commands.`);
});
bot.on('inline_query', (() => {
    var _ref2 = _asyncToGenerator(function* (msg) {
        const commandNames = Object.keys(_commands2.default);
        const command = commandNames.find(function (item) {
            return _commands2.default[item].inlineRegex && _commands2.default[item].inlineRegex.exec(msg.query);
        });
        if (command !== 'search') {
            return bot.answerInlineQuery(msg.id, [{
                id: '1',
                type: 'article',
                title: 'Not found',
                description: 'Command not found!',
                message_text: 'Command not found!',
                switch_pm_text: 'Help',
                switch_pm_parameter: 'inline-help' }]);
        }
        const matches = _commands2.default[command].inlineRegex.exec(msg.query);
        const searchData = {
            scope: matches[1],
            term: matches[2]
        };
        const scopeKeys = Object.keys(github.scopes);
        const scope = scopeKeys.find(function (item) {
            return github.scopes[item].keywords.includes(searchData.scope);
        });
        if (!scope) {
            return bot.answerInlineQuery(msg.id, [{
                id: '1',
                type: 'article',
                title: 'Invalid Scope',
                description: `I don't understand 
what's that "${searchData.scope}"!`,
                message_text: `I don't understand 
what's that "${searchData.scope}"!`
            }]);
        }
        const options = _extends({}, github.scopes[scope].defaultOptions, {
            q: searchData.term
        });
        const response = yield github.search(scope, options);
        bot.answerInlineQuery(msg.id, (0, _templates.loadInlineTemplate)(scope, response));
    });

    return function (_x3) {
        return _ref2.apply(this, arguments);
    };
})());
exports.default = bot;
module.exports = exports['default'];
//# sourceMappingURL=bot.js.map
