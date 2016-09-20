var program = require('commander');
var prompt = require('prompt');
var winston = require('winston');
var Q = require('q');
var readlineSync = require('readline-sync');


var servers = {
  http: require('./server/http')
}

program
  .version('v0.0.1')
  .option('-v, --verbose', 'Enable verbose output', function() {
    winston.level = "verbose";
  });

program
  .command('start [port]')
  .action(function(port) {
    winston.info("Starting node-paint...");
    winston.verbose("Starting servers...");
    // TODO: Separate http and socket server
    servers.http.start(port).then(function() {

    }).then(function() {
      winston.info("Loading cli interface...");
      readlineSync.promptCLLoop({
        "": function() {},
        help: function() {

        },
        bye: function() {
          return true;
        }
      }, {
        limitMessage: 'Command not found'
      });
    }).done();
    winston.info("Loading...");
  });

program.parse(process.argv);
