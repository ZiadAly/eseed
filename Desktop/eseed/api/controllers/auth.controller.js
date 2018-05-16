var mongoose = require('mongoose'),
  jwt = require('jsonwebtoken'),//web token betetsayyev 3and el client
  Validations = require('../utils/validations'),
  Encryption = require('../utils/encryption'),
  EMAIL_REGEX = require('../config').EMAIL_REGEX,
  User = mongoose.model('User');

module.exports.AddEmp = function(req, res, next) {
  // Check that the body keys are in the expected format and the required fields are there
  var valid =
    req.body.name &&
    Validations.isString(req.body.name) &&
    req.body.email &&
    Validations.isString(req.body.email) &&
    Validations.matchesRegex(req.body.email, EMAIL_REGEX);
    req.body.MNumber &&
    Validations.isNumber(req.body.MNumber)


    if (!valid) {
    return res.status(422).json({
      err: null,
      msg: 'email(String and of valid email format), password(String), confirmPassword(String), firstname(String) and lastname(String) are required fields',
      data: null
    });
  }
  // Check that the password is 8+ characters

  User.findOne({
    name: req.body.name.trim().toLowerCase()
  }).exec(function(err, user) {
    // If an err occurred, call the next middleware in the app.js which is the error handler
    if (err) {
      return next(err);
    }
    // If there is a user with this user don't continue
    if (user) {
      return res.status(422).json({
        err: null,
        msg:
          'A user with this username already exists, please try another username.',
        data: null
      });
    }

    // Security Check
    delete req.body.createdAt;
    delete req.body.updatedAt;

  });
};

module.exports.login = function(req, res, next) {
  // Check that the body keys are in the expected format and the required fields are there
  var valid =
    req.body.email &&
    Validations.isString(req.body.email) &&
    Validations.matchesRegex(req.body.email, EMAIL_REGEX);
    req.body.password &&
    Validations.isString(req.body.password);

  if (!valid) {
    return res.status(422).json({
      err: null,
      msg:
        'username(String and of valid email format) and password(String) are required fields.',
      data: null
    });
  }

  // Find the user with this username from the database
  User.findOne({
    email: req.body.User.trim().toLowerCase()
  }).exec(function(err, user) {
    if (err) {
      return next(err);
    }
    // If user not found then he/she is not registered
    if (!User) {
      return res
        .status(404)
        .json({ err: null, msg: 'User not found.', data: null });
    }

    // If user found then check that the password he entered matches the encrypted hash in the database
    Encryption.comparePasswordToHash(req.body.password, User.password, function(
      err,
      passwordMatches
    ) {
      if (err) {
        return next(err);
      }
      // If password doesn't match then its incorrect
      if (!passwordMatches) {
        return res
          .status(401)
          .json({ err: null, msg: 'Password is incorrect.', data: null });
      }
      // Create a JWT and put in it the user object from the database
      var token = jwt.sign(
        {
          // user.toObject transorms the document to a json object without the password as we can't leak sensitive info to the frontend
          User: User.toObject()
        },
        req.app.get('secret'),
        {
          expiresIn: '12h'
        }
      );
      // Send the JWT to the frontend
      res.status(200).json({ err: null, msg: 'Welcome', data: token });
    });
  });
}

module.exports.getAllUsers = async (req, res) => {
  const users = await User.find({});
  res.status(200).json({
    err: null,
    msg: 'Users retrieved successfully.',
    data: users
  });
};

module.exports.deleteEmp= async (req, res) => {
    /**
     * This method basically deletes the user
     * upon reciving the _id of the user as a
     * parameter in the delete request.
     *
     */

    if (!Validations.isObjectId(req.params.userId)) {
      return res.status(422).json({
        err: null,
        msg: 'activityId parameter must be a valid ObjectId.',
        data: null
      });
    }
    console.log('test1');
    const user = await User.findById(req.decodedToken.user._id).exec();
    if(!user) {
      return res.status(404).json({
        err: null,
        msg: 'User not found.',
        data: null
      });
    }
    console.log('test2');
    const deleteduser = await user.findByIdAndRemove(req.params.useId).exec();
    console.log('test3');
    if (!deleteduser) {
      return res
        .status(404)
        .json({ err: null, msg: 'user not found.', data: null });
    }
    res.status(200).json({
      err: null,
      msg: 'user was deleted successfully.',
      data: deletedActivity
    });
  };
