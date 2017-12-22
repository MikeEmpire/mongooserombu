let User = require('../models/User');

let user_api = {
  loginUser: function(req, res) {
    res.json("/");
  },
  renderLogin: function(req, res) {
    let login = { title: 'Login Page' }
    res.render('user/login', login);
  },
  signOutUser: function(req, res) {
    req.logout();
    res.redirect("/");
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
