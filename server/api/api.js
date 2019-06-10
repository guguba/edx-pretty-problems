const express = require('express')
const path = require('path');
const MongoClient = require('mongodb').MongoClient;
const api = express.Router();

const ImageUploader = require('../server/ImageUploader');

//api.use('/problem',problem_api)

// used for authentication and problem uploading to the DB
const uri = "mongodb+srv://guybarner:fuckU456@designedx-users-bbhgk.mongodb.net/test?retryWrites=true";

 // TODO change name to problem


 // test api
api.get('/test', (req, res) => {
  res.send('hey')
});
// test api
api.get('/getS3Url', (req, res) => {

  const filename = req.query.imageName;

  ImageUploader(filename).
    then((tempUrl => res.send(tempUrl)))
  
});

api.post('/problem', (req, res) => {

  let params = req.body.params;

  // if there are images - send to S3 and get urls

  Object.values(params.options).forEach(elem => {
    console.log("elem", elem)
    ImageUploader(elem.image, 'filename', 'userId');
    return('filename')
  });


  



  // uploading the problem to the DB and retrieving the uuid

  MongoClient.connect(uri, { useNewUrlParser: true })
  .then((client) => {
    const dbo = client.db("designedx");
    console.log('adding problem');
    dbo.collection("problems").insertOne(params)
    .then( response => {
      res.send({ url: '/problems/multipleChoice/' + response.insertedId });
    })
    .catch( err => console.log(`Failed to insert problem: ${err}`) )
  })
});


// authentications API - login and signup

api.post('/auth', (req, res) => {
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

api.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, '../build/index.html'), function(err) {
    if (err) {
      res.status(500).send(err)
    }
  })
})


module.exports = api;
