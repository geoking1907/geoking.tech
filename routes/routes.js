const {Router} = require('express');

const sqlite3 = require('sqlite3').verbose();
let sql;

const router = Router();


const cgdb = new sqlite3.Database("cg.db", sqlite3.OPEN_READWRITE, (err) => {
  if (err) return console.error(err.message);
});
const drdb = new sqlite3.Database("dr.db", sqlite3.OPEN_READWRITE, (err) => {
  if (err) return console.error(err.message);
});

/*
drdb.run('CREATE TABLE IF NOT EXISTS doshirak(id INTEGER PRIMARY KEY AUTOINCREMENT, title VARCHAR(255) NOT NULL, short VARCHAR(255) NOT NULL, text TEXT)');
*/

router.get('/', function(req, res) {
  res.render('index', {
    title: 'Аракелян Георгий'
  });
});

router.get('/admin/', async (req, res) => {
  res.render('admin', {
    title: 'Administrator'
  });
});

// cryptography

router.get('/cryptography/', async (req, res) => {
  sql = `SELECT * FROM cryptography`;
  cgdb.all(sql, [], (err, rows) => {
    if (err) return console.error(err.message);
    rows.forEach((row) => {
      console.log(row)
    })
    res.render('cryptography', {
      title: 'Шифры',
      rows: rows
    });
  });
});

router.get('/cryptography-add/', async (req, res) => {
  sql = `SELECT * FROM cryptography`;
  cgdb.all(sql, [], (err, rows) => {
    if (err) return console.error(err.message);
    rows.forEach((row) => {
      console.log(row)
    })
    res.render('cradd', {
      title: 'CrAddPanel',
      rows: rows
    });
  });
});

router.post('/cradd', async (req, res) => {
    cgdb.run(
      'INSERT INTO cryptography (title, short, text) VALUES (?,?,?)', 
      [req.body.title, req.body.short, req.body.text], 
      (err) => {
        if (err) return console.error(err.message);
      });
      res.redirect('/cryptography-add')
});

// doshirak

router.get('/doshirak/', async (req, res) => {
  sql = `SELECT * FROM doshirak`;
  drdb.all(sql, [], (err, rows) => {
    if (err) return console.error(err.message);
    rows.forEach((row) => {
      console.log(row)
    })
    res.render('sd-doshirak', {
      title: 'Дошики',
      rows: rows
    });
  });
});

router.get('/doshirak-add/', async (req, res) => {
  sql = `SELECT * FROM doshirak`;
  drdb.all(sql, [], (err, rows) => {
    if (err) return console.error(err.message);
    rows.forEach((row) => {
      console.log(row)
    })
    res.render('sd-dradd', {
      title: 'DrAddPanel',
      rows: rows
    });
  });
});

router.post('/dradd', async (req, res) => {
    drdb.run(
      'INSERT INTO doshirak (title, short, text) VALUES (?,?,?)', 
      [req.body.title, req.body.short, req.body.text], 
      (err) => {
        if (err) return console.error(err.message);
      });
      res.redirect('/doshirak-add')
});


router.use((req, res, next) => {
  res.status(404).render('error', {
    title: 'Где мы?!'
  });
});


module.exports = router;
