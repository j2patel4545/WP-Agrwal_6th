var express = require('express');
var router = express.Router();

const userModel = require("./users");

const passport = require('passport');

const localStrategy = require("passport-local");
passport.use(new localStrategy (userModel.authenticate()));

0
const { search } = require('../app');

/* GET home page. */
router.get('/', function(req, res) {
 res.render("home");
});

router.get('/profile', isLoggedIn, function(req, res) {
  res.render("profile"); 
});


 router.get('/login', function(req, res) {
  res.render("login");
 });
 router.get('/reg', function(req, res) {
  res.render("Reg");
 });   
 
 router.get('/invalid', function(req, res) {
  res.render("  ");
 });
 
// register router  
router.post('/register', function (req, res) {
  var userdata = new userModel({
  username: req. body. username,
  secret: req. body. password
  });
  userModel. register (userdata, req. body.password)
  .then(function (registereduser) {
  passport. authenticate("Local")(req, res, function () {
  res.redirect('/login');
  console.log("hogya");
  })  
})
  });



  // login

  router.post("/login", passport.authenticate("local", {
    successRedirect: "/profile",
    failureRedirect: "/invalid"
}), function(req, res) {
    // This function is the callback that will be executed after authentication.
    // It can be used for additional logic, but it's optional in this case.
})


// Logout route
router.get('/logout', function(req, res, next) {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });
});

// isLoggedIn middleware
function isLoggedIn(req, res, next) {
  // Check if the user is authenticated
  if (req.isAuthenticated()) {
    // If authenticated, proceed to the next middleware/route handler
    return next();
  }
  // If not authenticated, redirect the user to the root URL ("/")
  res.redirect('/');
}




module.exports = router;
