const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const api = require('../api/api');
const problemsRouter = require('../problems_renderer/problems');

app.use(express.static('build'));
app.set('view engine', 'hbs');

app.use('/api', api);
app.use('/problems', problemsRouter);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}`));


//uuid - is this supposed to be here or in server?

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

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

module.exports = filename;
  
