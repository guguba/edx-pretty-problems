const express = require('express');
const bodyParser = require('body-parser');
const hbs = require('express-handlebars');

const app = express();

const api = require('../api/api');
const problemsRouter = require('../problems_renderer/problems_renderer');


app.use(express.static('build'));
app.set('view engine', 'hbs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use('/api', api);
app.use('/problems', problemsRouter);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}`));

app.use(express.static('build'));

app.engine('hbs', hbs({
    extname: 'hbs',
    defaultView: 'default'
}));


app.set('view engine', 'hbs');