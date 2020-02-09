var express = require('express');
var router = express.Router();
var Company = require('../models/company.model.js');

// Create new account
router.post('/newAccount', function (req, res) {
  Company.findOne({ name: req.body.name }).then((currentCompany) => {
    if (currentCompany) {
      //Existing company
      res.send('Company already exists')
      console.log('Existing company: ' + currentCompany);
    } else {
      //New company  
      new Company({
        username: req.body.username,
        password: req.body.password,
        name: req.body.name,
        email: req.body.email,
        keywords: req.body.keywords,
        description: req.body.description,
        administrator: false,
        visible: true
      }).save().then((newCompany) => {
        res.send('Company successfully created')
        console.log('New company: ' + newCompany);
      });
    }
  });
});

// Update company
router.put('/updateAccount', function (req, res) {
  Company.findOneAndUpdate({ name: req.user.name },
    {
      name: req.body.name,
      email: req.body.email,
      keywords: req.body.keywords,
      description: req.body.description
    }, { new: true }, function (err, doc) {
      if (err) {
        res.send(`Update error: ${err}`);
        console.log('Something wrong while updating the account');
      }
      res.send('Account successfully updated');
    });
});

// Update company for admin page
router.put('/updateAccount/admin', function (req, res) {
  Company.findOneAndUpdate({ name: req.body.name },
    {
      visible: req.body.visible,
    }, { new: true }, function (err, doc) {
      if (err) {
        res.send(`Update error: ${err}`);
        console.log('Something wrong while updating the account');
      }
      res.send('Account successfully updated');
    });
});

// Get companies for results page
router.get('/results/:search', function (req, res) {
  Company.find({ keywords: req.params.search, visible: { $ne: false }  }, { name: true, email: true, description: true, _id: false }, function (err, companies) {
    if (err) {
      res.status(500).send({ message: 'Some error occurred while retrieving companies.' });
      console.log(`Fetch error: ${err}`);
    } else {
      if (companies.length === 0) {
        res.send({ companies: '', message: 'No results found' })
      } else {
        res.send({ companies, message: 'Results found: ' + companies.length });
      }
    }
  }).collation({ locale: 'en', strength: 2 });
});

// Get companies for admin page
router.get('/dashboard/admin', function (req, res) {
  Company.find({ username: { $ne: 'admin' } }, { name: true, visible: true, _id: false }, function (err, companies) {
    if (err) {
      res.status(500).send({ message: 'Some error occurred while retrieving companies.' });
      console.log(`Fetch error: ${err}`);
    } else {
      if (companies.length === 0) {
        res.send({ companies: '', message: 'No results found' })
      } else {
        res.send({ companies, message: 'Results found: ' + companies.length });
      }
    }
  });
});

// Get company for update page
router.get('/dashboard', function (req, res) {
  if (!req.user) {
    res.send({ company: '', message: 'Not logged in' });
  } else {
    Company.findOne({ name: req.user.name }, { name: true, email: true, description: true, keywords: true, administrator: true, _id: false }, function (err, company) {
      if (err) {
        res.status(500).send({ message: 'Some error occurred while retrieving companies.' });
        console.log(`Fetch error: ${err}`);
      } else {
        res.send({ company, message: 'Welcome ' + req.user.username });
      }
    });
  }
});

module.exports = router;



