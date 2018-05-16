var express = require('express');
var jwt = require('jsonwebtoken');
var authCtrl = require('../controllers/auth.controller');
var listCtrl = require('../controllers/list.controller');
var router = express.Router();

var isAuthenticated = function(req, res, next) {
  // Check that the request has the JWT in the authorization header
  var token = req.headers['authorization'];
  if (!token) {
    return res.status(401).json({
      error: null,
      msg: 'You have to login first before you can access your lists.',
      data: null
    });
  }
  // Verify that the JWT is created using our server secret and that it hasn't expired yet
  jwt.verify(token, req.app.get('secret'), function(err, decodedToken) {
    if (err) {
      return res.status(401).json({
        error: err,
        msg: 'Login timed out, please login again.',
        data: null
      });
    }
    req.decodedToken = decodedToken;
    next();
  });
};

var isNotAuthenticated = function(req, res, next) {
  // Check that the request doesn't have the JWT in the authorization header
  var token = req.headers['authorization'];
  if (token) {
    return res.status(403).json({
      error: null,
      msg: 'You are already logged in.',
      data: null
    });
  }
  next();
};

//-----------------------------Authentication Routes-------------------------
router.post('/auth/login', authCtrl.login);
router.get('/auth/getAllUsers', authCtrl.getAllUsers );
router.post('/auth/AddEmp', authCtrl.AddEmp);
router.delete('/auth/deleteEmp/:userId', authCtrl.deleteEmp);
router.patch('/auth/updateEmployee/:userId', authCtrl.updateEmployee);



module.exports = router;
