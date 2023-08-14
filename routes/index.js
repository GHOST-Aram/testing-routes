var express = require('express');
var router = express.Router();

const array = []
/* GET home page. */
router.get('/', function(req, res, next) {
  res.json({ name: 'frodo'});
});

router.get('/test', (req, res) => res.json({ array}))

router.post('/test', (req, res) =>{
  array.push(req.body.item)
  res.send('success !')
})

router.get('/user', (req, res) =>{
  res.status(200).json({ name: 'John', age: 45, height: '56 inch' })
})

router.post('/users', (req, res) =>{
  array.push(req.body.name)
  res.json({ name: 'John' })
})

router.get('/workers', (req, res) =>{
  res.json({ email: ' worker@work.com'})
})

router.get('/tasks', (req, res) =>{
  res.json({tasks: ['abc', 'xyz']})
})

router.post('/player', (req, res) =>{
  res.json({name: req.body.name})
})
module.exports = router;
