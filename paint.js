var program = require("commander");

program
  .version('v0.0.1');

program
  .command('start [port]')
  .action(function(port) {
    require('./server.js').start(port);
  });

program.parse(process.argv);
