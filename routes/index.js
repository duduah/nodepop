var express = require('express');
var router = express.Router();

const Anuncio = require('../models/Anuncio');

/* GET home page. */
router.get('/', async (req, res, next) => {
  try {
    let filter = {};
    const rows = await Anuncio.getList(filter);

    res.locals.rows = rows;
    res.json(retrieveJSON.setResult(retrieveJSON.OK, rows));
} catch (err) {
    next(err);
}


  res.render('index', { title: 'Nodepop' });
});

module.exports = router;
