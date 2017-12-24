module.exports = function(app) {
  var application = require('./routes/application');
  var user        = require('./routes/user');

  app.use('/', application);
  app.use('/admin', user)

}
