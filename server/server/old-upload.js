var AWS = require('aws-sdk'),
    fs = require('fs');

// For dev purposes only
AWS.config.update({ 
    accessKeyId: 'AKIAI6NMFL2MBGUQVVYQ', 
    secretAccessKey: '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' 
});

const uploader = async (filename, userId) => {

pathFilename = "../../problem_htmls/" + userId + '/' + filename;
// Read in the file, convert it to base64, store to S3
fs.readFile(pathFilename, function (err, data) {
  if (err) { throw err; }

  var base64data = new Buffer(data, 'binary');

  var s3 = new AWS.S3({apiVersion: '2012-10-17'});
  s3.upload({
    Bucket: 'edx-js-problems',
    Key: "problem_htmls/" + userId + '/' + filename,
    ContentType: 'text/html',
    Body: data
    //ACL: 'public-read'
  },function (resp) {
    //console.log(arguments);
    console.log('Successfully uploaded package.');
  });

});

}

/* const AWS = require('aws-sdk');
const Busboy = require('busboy');

const BUCKET_NAME = 'edx-js-problems';
const IAM_USER_KEY = 'AKIAI6NMFL2MBGUQVVYQ';
const IAM_USER_SECRET = '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';

function uploadToS3(file) {
  let s3bucket = new AWS.S3({
    accessKeyId: IAM_USER_KEY,
    secretAccessKey: IAM_USER_SECRET,
    Bucket: BUCKET_NAME
  });
  s3bucket.createBucket(function () {
      var params = {
        Bucket: BUCKET_NAME,
        Key: file.name,
        Body: file.data
      };
      s3bucket.upload(params, function (err, data) {
        if (err) {
          console.log('error in callback');
          console.log(err);
        }
        console.log('success');
        console.log(data);
      });
  });
}

module.exports = (app) => {

  app.post('/api/upload', function (req, res, next) {

    const element1 = req.body.element1;

    var busboy = new Busboy({ headers: req.headers });

    // The file upload has completed
    busboy.on('finish', function() {
      console.log('Upload finished');
      
      // Grabs your file object from the request.
      const file = req.files.element2;
      console.log(file);
      
      // Begins the upload to the AWS S3
      uploadToS3(file);
    });

    req.pipe(busboy);
  });
} */


// old google app engine code

/* const uploader = async (filename) => {
    const bucketName = 'edx-js-problems'
    const {Storage} = require('@google-cloud/storage');

    const projectId = 'edx-js-problems';
    const keyFilename = './edx-js-problems-4037f03dc00a.json';
    
    // Creates a client
    const storage = new Storage({
        projectId: projectId,
        keyFilename: keyFilename
    });

    // const bucketName = 'Name of a bucket, e.g. my-bucket';
    // const filename = 'Local file to upload, e.g. ./local/path/to/file.txt';

    // Uploads a local file to the bucket
    console.log("uploading file with filename " + filename)
    await storage.bucket(bucketName).upload(("./problem_htmls/" + filename), {
    // Support for HTTP requests made with `Accept-Encoding: gzip`
    gzip: true,
    metadata: {
      // Enable long-lived HTTP caching headers
      // Use only if the contents of the file will never change
      // (If the contents will change, use cacheControl: 'no-cache')
      cacheControl: 'public, max-age=31536000',
    },
    });

    console.log(`${filename} uploaded to ${bucketName}.`);
    // [END storage_upload_file]
} */

module.exports = uploader;




