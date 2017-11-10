let application_api = {
  renderIndex: function(req, res) {
    let home = { title: 'Welcome to Rombu!', }
    res.render('index', home);
  },
  renderAbout: function(req, res) {
    let about = { title: 'About Rombu' }
    res.render('about', about);
  },
  renderContact: function(req, res) {
    let contact = { title: 'Contact Rombu' }
    res.render('contact', contact);
  },
  renderPortfolio: function(req, res) {
    let portfolio = { title: 'Rombu\'s Portfolio'}
    res.render('portfolio', portfolio);
  }
}

export default application_api;
