'use strict';


// todo: separate to: server.js, api.js, and make api routes to be a router (google: "express router")

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

const createProblemHtml = require('./createHTML');
const uploader = require('./upload');

const port = process.env.PORT || 5000;

app.use(express.static('build'));

//uuid

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
};

let fileName = guid() + ".html";
console.log("first created filename " + fileName)

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/api/uuid', (req, res) => {
  res.send({ express: fileName });
});

app.post('/api/post', (req, res) => {
    let params = req.body.params;
    console.log(params);
    // TODO - refactor the uploader callback to a async promise
    createProblemHtml(params, fileName, uploader);
    res.send('okay!');
    fileName = guid() + ".html";
    console.log("renamed filename to " + fileName);
});

app.listen(port, () => console.log(`Listening on port ${port}`));



module.exports = fileName;

//mongo db connection. TODO - refactor to separate file



const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://guybarner:fuckU456@designedx-users-bbhgk.mongodb.net/test?retryWrites=true";

/* MongoClient.connect(uri, { useNewUrlParser: true }, function(err, client) {
   if(err) {
        console.log('Error occurred while connecting to MongoDB Atlas...\n',err);
   }
   console.log('Connected...');
   var dbo = client.db("designedx");
   /* var newUser = {
     username: "test",
     email: "test@test.test",
     password: "test1"
   };
   dbo.collection("users").insertOne(newUser, function(err, res) {
     if (err) throw err;
     console.log("1 document inserted");
     client.close();
   });
 
}); */

app.post('/api/auth', (req, res) => {
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
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, '/build/index.html'), function(err) {
    if (err) {
      res.status(500).send(err)
    }
  })
})

