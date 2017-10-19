const { CommandoClient } = require('discord.js-commando');
const Commando           = require('discord.js-commando');
const path               = require('path');
const fs                 = require('fs');
const secure             = require('./secure.json');
var date;

const client = new CommandoClient({
	owner: ['296895991985078272', '147604925612818432'],
	commandPrefix: "hello",
	disableEveryone: true,
	unknownCommandResponse: false,
});
var currentdate;

client.on(`ready`, async () => {
    console.log(`setting interval`);
    setInterval(() => {
        date = new Date();
        currentdate = `${date.getMonth()}-${date.getDate()}-${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}\n`
        fs.appendFile('time.txt', currentdate);
        switch(client.users.find('id', secure.id).presence.status) {
            case 'online':
                fs.appendFile('status.txt', '2\n');
                break;
            case 'offline':
                fs.appendFile('status.txt', '-1\n');
                break;
            case 'idle':
                fs.appendFile('status.txt', '0\n');
                break;
            case 'dnd':
                fs.appendFile('status.txt', '1\n');
                break;
        }
    }, 60000);
    console.log(`interval set`);
});

client.login(secure.token);

