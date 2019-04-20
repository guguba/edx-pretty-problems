// callback makes sure that the upload executes only after the file is created
let createProblemHtml = (params, filename, callbackUploader) => {
    
    function buildHtml(req) {
      var header = '';
      var body = '';

      // concatenate header string
      // concatenate body string

      return htmlTemplate(params);
    };

    function upload(folderPath, filename, callbackUploader) {
        var stream = fs.createWriteStream(folderPath + filename);

        stream.once('open', function(fd) {
          var html = buildHtml();
    
          stream.end(html);
        });
    
        stream.once('close', function(fd) {
            callbackUploader(filename, userId);      
        });
    }
    
    
    var fs = require('fs');
    
    let userId = params.userId;
    //console.log('params are');
    //console.log(params);

    let folderPath = "../../problem_htmls/" + userId + '/';
    //add the folder if doesnt exist
    if (!fs.existsSync(folderPath)) {fs.mkdir(folderPath, function (err){
        if (err) {
            return console.log('failed to write directory', err);
        }
        upload(folderPath, filename, callbackUploader)
    })}
    else {
        upload(folderPath, filename, callbackUploader)
    };
    
}

module.exports = createProblemHtml;


 

let htmlTemplate = (params) => {
    
    let questionText = params.question;
    let options = params.options;
    let type = params.type;
    let primaryColor = params.primaryColor;
    let rtl = (params.textDirection === "rtl") ? "rtl" : '';
    
    //question
    let question = '<div class=' + '"question-text">' +
        '<p class="' + rtl + '">' +
        questionText +
        '</p>' +
    '</div>'


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
    
    
    //correct answer for radio
    let numOfAnswers = Object.keys(options).length;
    
    
    return (
        '<!doctype html>' + '\n' +
        '<html lang="en">'  + '\n' +

          '<head>' + '\n' +
            '<meta charset="UTF-8">' + '\n' +
            '<title>Untitled Document</title>' + '\n' +
            '<link rel="stylesheet" href="https://s3.us-east-2.amazonaws.com/edx-js-problems/styles.css">' + '\n' +

          '</head>'  + '\n' +

          '<body>' + '\n' +
            '<script src="https://studio.edx.org/c4x/edX/DemoX/asset/jschannel.js"></script>' + '\n' +
            '<script defer>' + '\n' +

                'var try1 = (function() {' + '\n' +

                    'let channel;' + '\n' +

                    'if (window.parent !== window) {' + '\n' +
                        'channel = Channel.build({' + '\n' +
                            'window: window.parent,' + '\n' +
                            'origin: "*",' + '\n' +
                            'scope: "JSInput"' + '\n' +
                        '});' + '\n' +

                        'channel.bind("getGrade", getGrade);' + '\n' +
                    '}' + '\n' +

                    'function getGrade() {' + '\n' +
                        'let corrects = [];' + '\n' +
                        'let correct = true;' + '\n' +
                        'for (let i=0 ; i< ' + numOfAnswers + ' ; i++) {' + '\n' +
                            'corrects.push(document.getElementById("option" + i).checked);' + '\n' +
                        '}' + '\n' +
                        'correct = (JSON.stringify(corrects) === "' + JSON.stringify(corrects) + '")' + '\n' +
                        //'let answer = document.getElementById("option' + correct + '").checked;' + '\n' +
                        'correct = correct ? "correct" : "";' + '\n' +
                        'return JSON.stringify({' + '\n' +
                            'answer: correct' + '\n' +
                        '});' + '\n' +
                    '};' + '\n' +

                    'return {' + '\n' +
                        'getGrade: getGrade,' + '\n' +
                    '};' + '\n' +
                '}());' + '\n' +    

              '</script>' + '\n' +
              '<script>' + '\n' + 
                'let elem = document.querySelector("html");' + '\n' + 
                'elem.style.setProperty("--primary-color", "' + primaryColor + '");' + '\n' + 
              '</script>' + '\n' + 
              question +
              '<div class="box ' + rtl + '">' + '\n' +
                inputs
              + '</div>' + '\n' +
          '</body>' + '\n' +

        '</html>'    
    )
} 
