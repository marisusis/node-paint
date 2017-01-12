// Create a new instance of vantage.
var vantage = require("vantage")();
var winston = require('winston');
// Add the command "foo", which logs "bar".
vantage
  .command("foo")
  .description("Outputs 'bar'.")
  .action(function(args, callback) {
    this.log("bar");
    callback();
  });

// Name your prompt delimiter 
// "websvr~$", listen on port 80 
// and show the Vantage prompt.

module.exports = {
  start: function(port = 8000) {
    vantage
      .delimiter("paint: ")
      .listen(port)
      .show();
    winston.info("vantage server listening on *:" + port);
  }
}