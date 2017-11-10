module.exports = function(app) {
  var application = require('./routes/application');

  app.use('/', application);

}
