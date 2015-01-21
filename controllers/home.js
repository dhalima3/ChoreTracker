/**
 * GET /
 * Home page.
 */

exports.index = function(req, res) {
  res.render('home', {
    title: 'Home'
  });
};

exports.newTemplate = function(req, res) {
  res.render('new-template', {
    title: 'Landing Page'
  });
};