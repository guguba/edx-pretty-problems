import React, { Component } from 'react';
import '../styles/mystyle.css';
import translations from '../Translations/translations';
import {Client_config} from '../client_config';
import ImageUploader from './ImageUploader';
import axios from "axios";

import mixpanel from '../helpers/mixpanel'





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

    // controls image drop
    async onImageDrop(image, id) {

        //set indexes to 0 (refactor needed)
        id = id - 1

        const getUrl = async (ext) => {
    
          const timestamp = new Date();
          const formattedTimestamp = timestamp.getDate() + "-" + (timestamp.getMonth() + 1) + "-" + timestamp.getFullYear() + "/" + timestamp.getTime();
          const imageName = this.props.user.userId + "/" + formattedTimestamp + "." + ext;
          console.log(imageName)
          const request = new Request(Client_config.SERVER + '/api/getS3Url' + "?imageName=" + imageName);
          const response = await fetch(request);
          const url = await response.text();
          console.log(url)
          return(url);
          
        }
      
        // upload image to S3 and get url
        const file = image[0];
        const ext = image[0].path.split('.').pop();
        const tempUrl = await getUrl(ext);
    
        const config = {
            headers: { 
                'Content-Disposition': 'inline',
                'content-type': "image/" + ext
         }
        }

        const response = await axios.put(tempUrl, file, config);
        if (response) {
            console.log(response.config.url);
        }
        else if (!response) {console.log("error uploading image!")}

        let imageUrl = response.config.url;
        imageUrl = imageUrl.substring(0, imageUrl.indexOf('?'));

        // save image to state

        let options = [...this.state.options];
        options[id].image = imageUrl;
        this.setState({
            options: options
        })
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
        const texts = Object.values(this.state.options).map(it=>it.text);      
        const selected = Object.values(this.state.options).map(it=>it.selected);   
        console.log(texts)
        console.log(selected)
        //This assumes that there are as many inputs as checkboxes. fair assumption
        for (let i in texts) {
            // updating this checked boxes because can't control them since :before doesn't trigger onChange
            if (!texts[i]) {textValidation = false};
            if (selected[i]) {
                selectValidation = true;
            };
        }
        //debugger;
        let newValidation = {show: false, text: 'placeholder'};
        //if all fields are okay
        if (textValidation && selectValidation) {
            this.setState({
                validation: newValidation
            })
            this.sendJson()
            this.props.showOutput();
            mixpanel.track('submitted problem')
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

    formatInputText(text) {
        text = text.replace(/<br>/g, '');
        text = text.replace(/<div>/g, '<br>');
        text = text.replace(/<\/div>/g, '');
        return text

    }

    onUpdateOption(e) {
        let id = e.target.id;
        id = id.substring(6);
        let value = e.target.innerHTML;
        value = this.formatInputText(value);
        let options = [...this.state.options];
        options[id-1].text = value;
        this.setState({
            options: options
        })
    }

    onUpdateQuestion(e) {
        let value = e.target.innerHTML;
        value = this.formatInputText(value);
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
      const inverted = this.props.styler.inverted === true ? 'inverted' : "";
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
                    {/* the OR condition is so that the image only appears in box layout*/}
                    {!layout || <ImageUploader 
                    id={i} 
                    image={this.state.options[i-1].image} 
                    onImageDrop={(acc, rej, e)=>this.onImageDrop(acc, rej, e)} 
                    user={this.props.user}
                    styler={this.props.styler}
                    />}
                    <p
            contenteditable="true"
            className="label-input"
            placeholder={langStrings.option+i}
            id={'input-' + i}
            value={this.state.options[i-1].text}
            onInput={(e)=>this.onUpdateOption(e)}
            onClick={(e)=>{e.preventDefault()}}
            ></p>
                    {/* <input className="label-input" id={'input-' + i} type="text" placeholder={langStrings.option+i} value={this.state.options[i-1].text} onChange={(e)=>this.onUpdateOption(e)}></input> */}
                    <p id={"delete-" + i} onClick={(e)=>this.onDeleteOption(e)} className="delete-answer">✖</p>
                </label>
                ]
          )
      };
      let validationStyle = {visibility: this.state.validation.show ? 'visible' : 'hidden'};
    return (
        <div className="problem-external-box">
            <div className="question-text"><p
            contenteditable="true"
            placeholder={langStrings.question}
            className={textDirection}
            onInput={(e)=>this.onUpdateQuestion(e)}
            ></p></div>
            <div className={"multiple-choice-box " + textDirection + " " + layout + " " + inverted}>
                {arrOfOptions}
                <label className="radio-label add-option" onClick={(e)=>this.onAddOption(e)}><p>{langStrings.addOption}</p></label>
            </div>

            <p style={validationStyle} className="validation">{this.state.validation.text}</p>
            <button className='button' onClick={()=>this.onSubmit()}>Create</button>
        </div>
    );
  }
}

export default MultipleChoice;
