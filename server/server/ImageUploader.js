const AWS = require('aws-sdk'),
    fs = require('fs');

let credentials = { 
  accessKeyId: 'AKIAI6NMFL2MBGUQVVYQ', 
  secretAccessKey: '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',
  region: 'us-east-2'
}

// For dev purposes only
AWS.config.update(credentials);


// get temp creds


const ImageUploader = async (filename) => {

  var params = {
    Bucket: 'edx-js-problems-images', 
    Key: filename, 
    Expires: 60,
    ContentType: 'image/jpeg'
  };
  
  var s3 = new AWS.S3();
  var url = s3.getSignedUrl('putObject', params);
  console.log(url);

  return url;
}

/* const ImageUploader = async (image, filename, userId) => {

  console.log('image', image.name);

pathFilename = "../../problem_htmls/" + userId + './' + filename;
// Read in the file, convert it to base64, store to S3

  //var buf = new Buffer(image.replace(/^data:image\/\w+;base64,/, ""),'base64');
  //const buffer = fs.readFileSync("/" + image.path);




  var s3 = new AWS.S3({apiVersion: '2012-10-17'});
  s3.upload({
    Bucket: 'edx-js-problems-images',
    Key: image.path,
    ContentType: 'image/*',
    Body: image.path
    //ACL: 'public-read'
  },function (resp) {
    //console.log(arguments);
    console.log("response", resp);
  });


} */

module.exports = ImageUploader;
