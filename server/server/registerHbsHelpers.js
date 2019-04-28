var Handlebars = require('handlebars');

module.exports = {
  // put all of your helpers inside this object
  // foo: function () {
  //   return "FOO";
  // },
  // bar: function () {
  //   return "BAR";
  // },
  'encode': (text) => {
    return new Handlebars.SafeString(text)
  }
}
