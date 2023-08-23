var express = require('express');
var router = express.Router();

/* GET users listing. */
const routes = (db) =>{
  router.get('/user', function(req, res, next) {
    res.send('respond with a resource');
  });
  
  router.post('/user', async(req, res) =>{
    const {
      first_name,
      last_name, 
      username, 
      email, 
      password, 
      password_confirm
    } = req.body

	const user = await db.createUser({
		first_name, 
		last_name, 
		username, 
		email, 
		password
	})
    res.json({
		first_name: user.first_name,
		last_name: user.last_name,
		username: user.username,
		email: user.email,
	})
  }   )

  return router
}

module.exports = routes
