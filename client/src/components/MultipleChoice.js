import React, { Component } from 'react';
import '../styles/mystyle.css';
import translations from '../Translations/translations';
import {Client_config} from '../client_config'


let emptyOptions = [
    {
        selected: false,
        text: ''
    },
    {
        selected: false,
        text: ''
    },
    {
        selected: false,
        text: ''
    },
    {
        selected: false,
        text: ''
    }
]

class MultipleChoice extends Component {

    constructor(props) {
        super(props);
        this.state = {
            question: '',
            options: emptyOptions,
            validation: {
                show: false,
                text: 'placeholder'
            }
        };
    }

    //controls the checkboxes for radio/checkbox behaviors
    onSelect(e) {
        //debugger;
        let options = this.state.options;
        let id = e.target.id.substring(6);
        let arrayId = id - 1;
        let checked = e.target.checked;
        let isRadio = (this.props.styler.type === "radio");
        // if it's a radio - clear all boxes first
        if (isRadio) {
            for (let key in options) {
                options[key].selected = false;
            }
        }
        options[arrayId].selected = checked;
        this.setState({options: options})
    }

    async sendJson() {
        let params = {
            question: this.state.question,
            options: {...this.state.options},
            userId: this.props.user.userId,
            styler: this.props.styler,
        }
        //refactor required
        let body = JSON.stringify({params: params});
        const options = {
            method: 'POST',
              headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: body
        };

        let filename;

        try {
            const res = await fetch( Client_config.SERVER + '/api/problem', options)
            const json = await res.json();
            this.props.setFilename(Client_config.SERVER + json.url);
        } catch (error) {
            console.log('There has been a problem with your fetch operation: ', error.message);
        }

        return;

    }

    onSubmit() {
        //one missing answer will make this false
        let textValidation = true;
        //one selected answer will make this true
        let selectValidation = false;
        let texts = Array.from(document.getElementsByClassName('label-input'));
        let selected = document.getElementsByName('options');
        //This assumes that there are as many inputs as checkboxes. fair assumption
        for (let i in texts) {
            // updating this checked boxes because can't control them since :before doesn't trigger onChange
            if (!texts[i].value) {textValidation = false};
            if (selected[i].checked) {
                selectValidation = true;
            };
        }
        let newValidation = {show: false, text: 'placeholder'};
        //if all fields are okay
        if (textValidation && selectValidation) {
            () => this.setState({
                validation: newValidation
            });
            this.sendJson()
            this.props.showOutput();
        }
        else {
            if (!textValidation || !selectValidation) {newValidation.show = true};
            if (!textValidation) {newValidation.text = "Please fill all 4 answers"};
            if (!selectValidation) {newValidation.text = "Please select at least one answer"};
            if (!textValidation && !selectValidation) {newValidation.text = "Please fill all 4 answers and select at least one answer"};

            this.setState({
                validation: newValidation
            })
        }
    }

    // TODO - requires rafactor!!!
    //workaround to cancel the multiple checkmarks when switching to radio mode
    checkChangeToRadio() {
        let options = this.state.options;
        let values = [];
        for (let option in options) {
            values.push(options[option].selected);
        }
        //let values = options.map(option => option.selected);
        //values = Object.values(this.state.options.selected) || [];
        let corrects = values.filter(val => val===true).length;
        if (this.props.styler.type === 'radio' && corrects > 1) {
            for (let option in options) {
                options[option].selected = false;
            }
            this.setState({options: options})
        }
    }

    onDeleteOption(e) {
        let id = e.target.id;
        id = id.substring(7);
        let options = this.state.options;
        options.splice(id-1, 1);
        this.setState({
            options: options
        })
    }

    onUpdateOption(e) {
        let id = e.target.id;
        id = id.substring(6);
        let value = e.target.value;
        let options = this.state.options;
        options[id-1].text = value;
        this.setState({
            options: options
        })
    }

    onUpdateQuestion(e) {
        let value = e.target.innerHTML;
        console.log("value", value);

        value = value.replace(/<br>/g, '');
        value = value.replace(/<div>/g, '<br>');
        value = value.replace(/<\/div>/g, '');
        //let question = value || this.state.question;
        this.setState({
            question: value
        })
    }


    onAddOption() {
        let options = this.state.options;
        options.push({selected: false, text: ''})
        this.setState({
            options: options
        })
    }

  render() {

      this.checkChangeToRadio();
      let type = this.props.styler.type;
      // TODO: refactor this to a more general class
      const layout = this.props.styler.layout === "boxes" ? "box-layout" : "";
      const textDirection = this.props.styler.textDirection;
      let arrOfOptions = [];
      let allSelected = [];
      let options = this.state.options;
      for (let option in options) {
          if (options[option].selected) {
            allSelected.push(option);
          }
      }
      let langStrings = translations[this.props.styler.language];
      //requires refactor
      //let allSelected = options.map(option => option.selected);
      let numOfOptions = this.state.options.length;
      for (let i=1 ; i<=numOfOptions ; i++) {
          let selected = (options[i-1].selected);
          arrOfOptions.push(
                [
                <input className="radio-input" type="checkbox" id={"option" + i} name="options" checked={selected} onChange={(e)=>this.onSelect(e)}/>,
                <label className={'radio-label ' + type} for={"option" + i}>
                    <textarea className="label-input" id={'input-' + i} type="text" placeholder={langStrings.option+i} value={this.state.options[i-1].text} onChange={(e)=>this.onUpdateOption(e)}></textarea>
                    <p id={"delete-" + i} onClick={(e)=>this.onDeleteOption(e)} className="delete-answer">✖</p>
                </label>
                ]
          )
      };
      let validationStyle = {visibility: this.state.validation.show ? 'visible' : 'hidden'};
    return (
        <div className="problem-external-box inverted">
            <div className="question-text"><p
            contenteditable="true"
            placeholder={langStrings.question}
            className={textDirection}
            onInput={(e)=>this.onUpdateQuestion(e)}
            ></p></div>
            <div className={"multiple-choice-box " + textDirection + " " + layout}>
                {arrOfOptions}
                <label className="radio-label add-option" onClick={(e)=>this.onAddOption(e)}>{langStrings.addOption}</label>
            </div>

            <p style={validationStyle} className="validation">{this.state.validation.text}</p>
            <button className='button' onClick={()=>this.onSubmit()}>Create</button>
        </div>
    );
  }
}

export default MultipleChoice;
