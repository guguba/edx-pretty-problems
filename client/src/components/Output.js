import React, { Component } from 'react';
import '../styles/mystyle.css';




class Output extends Component {

    constructor(props) {
        super(props);
    }

  render() {

    // let height =  (4 + (numOfOptions * 3))  * remInPixels + (numOfOptions)*2;
    const problemBox = document.getElementsByClassName('problem-external-box')[0];
    const fullHeight = problemBox ? parseInt(window.getComputedStyle(problemBox, null).height) : 0;

    const layout = this.props.styler.layout;
    const height = layout === "rows" ? 
        fullHeight - 135 :
        // TODO - couldnt get boxes real height, only doing 4 boxes at the moment
        493;

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
