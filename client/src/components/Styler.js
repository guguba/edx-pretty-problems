import React, { Component } from 'react';
import '../styles/mystyle.css';


class Styler extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    
    onStyleChange(e, style) {
        this.props.onStyleChange(e, style);
    }
    
  render() {
      
      //isRadio need revactor to a better function
      let isRadio = this.props.styler.type === "radio";
      let layout = this.props.styler.layout;
      let language = this.props.styler.language;

      let fonts = ['Alef','Arial','Arial Narrow','Calibri','Concert One','Courier New','Frank Ruhl Libre','Georgia','Impact','Lato','Lora','Montserrat','Nunito Sans','Open Sans','Oswald','Rakkas','Raleway','Roboto','Segoe UI','Spectral','Tahoma','Times New Roman','Ubuntu','Verdana','Yatra One']
      let fontOptions = []
      for (const font of fonts) {
        let newOption = <option value={font}>{font}</option>
        fontOptions.push(newOption)
      }

    return (
        <div className="widget-external-box">
            <div className="widget-header">
                <h2>Design Settings</h2>
            </div>
            <div className="options-box">
                <h3>Problem type:</h3>
                <div>
                  <input className="radio-input" checked={isRadio} onChange={(e) => this.onStyleChange(e, "type")} type="radio" id="radio" name="type"/>
                  <label className="radio-label radio" for="radio">Single-choice (radio)</label>
                  <input className="radio-input" checked={!isRadio} onChange={(e) => this.onStyleChange(e, "type")} type="radio" id="checkbox" name="type"/>
                  <label className="radio-label radio" for="checkbox">Multi-choice (checkboxes)</label>
                </div>
                <h3>layout:</h3>
                <div>
                  <input className="radio-input" checked={layout === "rows"} onChange={(e) => this.onStyleChange(e, "layout")} type="radio" id="rows" name="layout"/>
                  <label className="radio-label radio" for="rows">rows</label>
                  <input className="radio-input" checked={layout === "boxes"} onChange={(e) => this.onStyleChange(e, "layout")} type="radio" id="boxes" name="layout"/>
                  <label className="radio-label radio" for="boxes">boxes</label>
                </div>
                <h3>Language:</h3>
                <div>
                  <input className="radio-input" checked={language === "enUs"} onChange={(e) => this.onStyleChange(e, "language")} type="radio" id="enUs" name="language"/>
                  <label className="radio-label radio" for="enUs">English</label>
                  <input className="radio-input" checked={language === "heb"} onChange={(e) => this.onStyleChange(e, "language")} type="radio" id="heb" name="language"/>
                  <label className="radio-label radio" for="heb">עברית</label>
                </div>
                <h3>Color:</h3>
                <div className="picker">
                  <input type="color" id="primaryColor" value={this.props.styler.primaryColor} onChange={(e) => this.onStyleChange(e, "primaryColor")}/>
                </div>
                <div>
                  <input className="radio-input" id="invertedColor" type="checkbox" name="inverted" value={this.props.styler.inverted} onChange={(e) => this.onStyleChange(e, "inverted")}/>
                  <label class="radio-label" for="invertedColor">Flip colors</label>
                </div>
                <h3>Font:</h3>
                <div className="picker dropdown">
                  <select defaultValue='Segoe UI' onChange={(e) => this.onStyleChange(e, "fontFamily")}>
                      {fontOptions}
                  </select>
                </div>
            </div>
        </div>
    );
  }
}

export default Styler;
