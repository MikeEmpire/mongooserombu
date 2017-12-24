let User = require('../models/User');

let user_api = {
  // loginUser: function(req, res) {
  //
  // },
  renderLogin: function(req, res) {
    let login = {
      title: 'Login Page',
      cssLink: '<link rel="stylesheet" type="text/css" href="/css/login.css">',
      layout: 'admin'
    }
    res.render('user/login', login);
  },
  signOutUser: function(req, res) {
    req.logout();
    res.redirect("/");
  },
  renderCMS: function(req, res) {
    let cms = {
    title: 'Rombu Content Management System',
    cssLink: '<link rel="stylesheet" type="text/css" href="/css/admin.css">',
    layout: 'admin'
  }
    res.render('user/cms', cms)
  },
  signUpUser: function(req, res) {
    User.findOne({ 'email' :  req.body.email }, function(err, user) {
      if (user) {
        res.send({
          duplicateUser: true
        })
      } else {
        var newUser         = new User();
        // set the user's local credentials
        newUser.username    = req.body.username;
        newUser.email       = req.body.email;
        newUser.password    = newUser.generateHash(req.body.password);
        // save the user
        newUser.save()
          .then(function() {
            console.log('User is saved');
          res.send({redirect: '/'});
        }).catch(function(err) {
          res.json(err);
        });
      }
    })
  },
};

export default user_api;
