const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const hbsHelpers = require('./registerHbsHelpers')
var cors = require('cors')

const app = express();
app.use(cors())


const api = require('../api/api');
const problemsRouter = require('../problems_renderer/problems_renderer');


app.use(express.static('build'));

const hbs = exphbs.create(    {
    defaultView: 'default',
    helpers: hbsHelpers
});


app.engine('handlebars', hbs.engine);

app.set('view engine', 'handlebars');

// allows to serve public
app.use(express.static(__dirname + '/public'));




app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use('/api', api);
app.use('/problems', problemsRouter);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}`));

app.use(express.static('build'));