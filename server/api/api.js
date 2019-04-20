const express = require('express')
const path = require('path');
const MongoClient = require('mongodb').MongoClient;

const createProblemHtml = require('../server/createHTML');
const problemsRouter = require('../problems_renderer/problems')
const uploader = require('../server/upload');
const filename = require('../server/server');

const app = express();
const router = express.Router()



//app.use('/problems', problemsRouter)

router.get('/uuid', (req, res) => {
  console.log(filename);
  res.send({ express: filename });
});

router.get('/test', (req, res) => {
  res.send('hey 1');
});


router.post('/post', (req, res) => {

  function guid() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
      s4() + '-' + s4() + s4() + s4();
  };
  
  let filename = guid() + ".html";
  console.log("first created filename " + filename)

  let params = req.body.params;
  //console.log(params);
  // TODO - refactor the uploader callback to a async promise
  createProblemHtml(params, filename, uploader);
  console.log('2');
  res.send({filename: filename});
});


// mongodb API

const uri = "mongodb+srv://guybarner:fuckU456@designedx-users-bbhgk.mongodb.net/test?retryWrites=true";

router.post('/auth', (req, res) => {
  console.log("req is ");
  console.log(req.body);
  let params = req.body.params;
  console.log("uri is  " + uri);

  let username = params.username;
  let email = params.email;
  let password = params.password;
  let action = params.action;

  let loginUser = {
    'username': username,
    'password': password
  }

  let signupUser = {
    'username': username,
    'email': email,
    'password': password,
    'createdAt': new Date().toUTCString()
  }

  console.log(params);
  // TODO - refactor the uploader callback to a async promise

  MongoClient.connect(uri, { useNewUrlParser: true })
    .then((client) => {
      const dbo = client.db("designedx");
      // if the request is a login, check username and password and return user ID
      if (action === 'login') {
        dbo.collection("users").findOne(loginUser)
        .then((response) => {
          if (response && response._id) {
            res.send({ id: response._id });
            console.log(response._id);
          }

          else res.send({error: 'didnt find user'})})
      }
      // if the request is a signup, first check that the usernane doesn't exist, then perform the signup
      else if (action === 'signup') {
        dbo.collection("users").findOne({'username': username})
        .then((response) => {
          if (response) {
            console.log('username exists');
            res.send({ error: 'username already exists' });
          }
          else {
            console.log('adding user');
            dbo.collection("users").insertOne(signupUser, function(err) {
              res.send({ id: signupUser._id })
            })
            console.log(signupUser._id)
          }
        })
      }
  })
})

// redirect all routes back to index (prevents react router issue)

router.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, '../build/index.html'), function(err) {
    if (err) {
      res.status(500).send(err)
    }
  })
})


module.exports = router;
