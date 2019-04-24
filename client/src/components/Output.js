import React, { Component } from 'react';
import '../styles/mystyle.css';




class Output extends Component {
    
    constructor(props) {
        super(props);
    }
    
  render() {

    let userId = this.props.user.userId;
    // this is an indirect lookup for options, so not to move them from MultipleChoice.js just for this
    let numOfOptions = document.getElementsByName('options').length;
    let root = document.getElementById('root');
    let remInPixels = getComputedStyle(root, null).fontSize;
    remInPixels = parseInt(remInPixels, 10);
    // 2 rem up and sown margin, plus 3 rem per option, plus 2 per each option to to borders
    // let height =  (4 + (numOfOptions * 3))  * remInPixels + (numOfOptions)*2;
    let elem = document.getElementsByClassName('problem-external-box')[0];
    let height;
    if (elem) {
        height = getComputedStyle(elem).height;
        height = parseInt(height);
        height -= 117;
    }    



      
    let output = 
        '<problem>' + '\n' +
        '<customresponse cfn="check_function">' + '\n' + 
        '<script type="loncapa/python">' + '\n' + 
        '<![CDATA[' + '\n' + 
        'import json' + '\n' + 
        'def check_function(e, ans):' + '\n' + 
        ' response = json.loads(ans)' + '\n' + 
        ' answer = response["answer"]' + '\n' + 
        ' return answer == "correct"' + '\n' + 
        ']]>' + '\n' + 
        '</script>' + '\n' + 
            ' <jsinput' + '\n' + 
                '  gradefn="try1.getGrade"' + '\n' + 
                '  width="600"' + '\n' + 
                '  height="' + height + '"' + '\n' + 
                '  html_file="https://s3.us-east-2.amazonaws.com/edx-js-problems/problem_htmls/' + userId + '/' + this.props.fileName + '"' + '\n' + 
                '  title="Dropdown with Dynamic Text"' + '\n' + 
                '  sop="false"/>' + '\n' + 
            ' </customresponse>' + '\n' + 
        '</problem>'
      let showOutput = this.props.showOutput ? output : '';
      
    return (
        <div className="widget-external-box">
            <div className="box-header">
                <h2>Script (copy-paste to edX editor)</h2>
            </div>
            <div className="widget-internal-box">
            <p className="output">{showOutput}</p>
            </div>
        </div>
    );
  }
}

export default Output;
