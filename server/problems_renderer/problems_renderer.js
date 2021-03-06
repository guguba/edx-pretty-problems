// TODO: change name to problems renderer
const {MongoClient, ObjectId} = require("mongodb");

const express = require('express')
const problems = express.Router()


problems.get('/multipleChoice/:id', function (req, res) {

  const problemId = {_id: ObjectId(req.params.id)};

  // get problem params from DB
  const uri = "mongodb+srv://guybarner:fuckU456@designedx-users-bbhgk.mongodb.net/test?retryWrites=true";

  MongoClient.connect(uri, {
      useNewUrlParser: true
    })
    .then((client) => {
      const dbo = client.db("designedx");
      // if the request is a login, check username and password and return user ID
      dbo.collection("problems").findOne(problemId)
        .then((response) => {
          if (response) {

            let questionText = response.question;
            let options = response.options;
            let type = response.styler.type;
            let primaryColor = response.styler.primaryColor;
            let inverted = response.styler.inverted ? "inverted" : '';
            let rtl = (response.styler.textDirection === "rtl") ? "rtl" : '';
            const problemLayout = (response.styler.layout === "boxes") ? "box-layout" : "";
            let fontFamily = response.styler.fontFamily.replace(" ", "+");

            //inputs
            let inputs = '';
            let corrects = [];
            for (let i in options) {
              let addition =
                '<input type="' + type + '" id="option' + i + '" value="' + i + '" name="example">' + '\n' +
                '<label class="' + type + '" for="option' + i + '">' + options[i].text + '</label>' + '\n'

              inputs += addition;

              corrects.push(options[i].selected);
            }

            res.render('problems', {
              options,
              corrects,
              optionLength: options.length,
              primaryColor,
              inverted,
              questionText,
              rtl,
              problemLayout,
              type,
              fontFamily
            })

          } else res.send({
            error: 'didnt find problem'
          })
        })
    })





})


module.exports = problems;