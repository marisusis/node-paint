var program = require('commander');
var prompt = require('prompt');
var winston = require('winston');
var Q = require('q');
var async = require('async');
var readlineSync = require('readline-sync');

winston.add(winston.transports.File, {
	filename: 'output.log'
});
// winston.remove(winston.transports.Console);


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
		winston.info(process.env.PORT);
		servers.http.start(port || process.env.PORT);
	});

program.parse(process.argv);
