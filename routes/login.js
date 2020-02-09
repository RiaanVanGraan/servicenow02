var express = require('express');
var router = express.Router();
var passport = require('passport');

// Log out
router.get('/logout', function (req, res) {
  console.log('Logged out');
  req.logout();
  res.redirect('http://localhost:3000/login');
});

//Local login
router.post('/login', passport.authenticate('local'), (req, res) => {
  res.send(req.user);
});

//Google login
router.get('/google', passport.authenticate('google', { scope: ['profile'] }));
// This path must match the redirect URI configured on Google's Developer console for this app
router.get('/google/redirect', passport.authenticate('google'), (req, res) => {
  res.redirect('http://localhost:3000/dashboard');
});

module.exports = router;