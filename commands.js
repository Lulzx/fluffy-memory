const search = {
    regex: /\/search\s(\w+)\s(.+)/,
    inlineRegex: /(\w+)\s(.+)/,
    help: ``
};
const help = {
    regex: /\/help/,
    initMessage: `I can search *users*, *repos* and 
*issues* for you.
 
*users*:
  /search u user
 
*repos*:
  /search r repo
 
*issues*:
  /search i issue
 
Note that you can use _user_, _users_, _repo_, 
_repos_, ` + `_issue_ or _issues_ instead of that 
_u_, _r_, or _i_. Those are just some simple 
shortcuts.,
    help: ` `
};
const start = {
    regex: /\/start/,
    initMessage: ` Heyo !I 'm here to help you in 
order to find *repositories, users and issues* from 
GitHub directly in Telegram. Send /help to know how 
to use me.`'
};
const commands = {
    search,
    help,
    start
};
export default commands;
