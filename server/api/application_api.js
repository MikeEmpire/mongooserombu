let application_api = {
  renderIndex: function(req, res) {
    let home = { title: 'Welcome to Rombu!', }
    res.render('index', home);
  },
  renderAbout: function(req, res) {
    let about = { title: 'About Rombu' }
    res.render('index/about', about);
  },
  renderContact: function(req, res) {
    let contact = { title: 'Contact Rombu' }
    res.render('index/contact', contact);
  },
  renderPortfolio: function(req, res) {
    let portfolio = { title: 'Rombu\'s Portfolio'}
    res.render('index/portfolio', portfolio);
  },
  renderTerms: function(req, res) {
    let terms = { title: 'Terms and Conditions of Rombu' }
    res.render('index/terms', terms)
  }
}

export default application_api;
