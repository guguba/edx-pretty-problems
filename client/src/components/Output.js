import React, { Component } from 'react';




class Output extends Component {

    constructor(props) {
        super(props);
    }

  render() {

    // let height =  (4 + (numOfOptions * 3))  * remInPixels + (numOfOptions)*2;
    const problemBox = document.getElementsByClassName('problem-external-box')[0];
    const fullHeight = problemBox ? parseInt(window.getComputedStyle(problemBox, null).height) : 0;

    //calculate number of options for a very ugly height calculation
    const numOfOptions = document.getElementsByClassName("label-input").length;
    const rows = Math.ceil(numOfOptions / 2)

    const layout = this.props.styler.layout;
    const height = layout === "rows" ? 
        fullHeight - 134 :
        // TODO - couldnt get boxes real height, only doing 4 boxes at the moment
        80 + (205*rows);

    let output =
        '<problem>' + '\n' +
        '<customresponse cfn="check_function">' + '\n' +
        '<script type="loncapa/python">' + '\n' +
        '<![CDATA[' + '\n' +
        'import json' + '\n' +
        'def check_function(e, ans):' + '\n' +
        ' response = json.loads(ans)' + '\n' +
        ' answerObj = json.loads(response["answer"])' + '\n' +
        ' finalAnswer = answerObj["answer"]' + '\n' +
        ' return finalAnswer == "correct"' + '\n' +
        ']]>' + '\n' +
        '</script>' + '\n' +
            ' <jsinput' + '\n' +
                '  gradefn="designedxApp.getGrade"' + '\n' +
                '  get_statefn="designedxApp.getState"' + '\n' +
                '  set_statefn="designedxApp.setState"' + '\n' +
                '  width="600"' + '\n' +
                '  height="' + height + '"' + '\n' +
                '  html_file="' + this.props.fileName + '"' + '\n' +
                '  title="Dropdown with Dynamic Text"' + '\n' +
                '  sop="false"/>' + '\n' +
            ' </customresponse>' + '\n' +
        '</problem>'
      let showOutput = this.props.showOutput ? output : '';

    return (
        <div className="widget-external-box">
            <div className="widget-header">
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
