var express = require('express');
var router = express.Router();
var app = module.parent.exports;

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', {
      title: 'Express',
      userId: app.get('username')
  });
});

module.exports = router;
