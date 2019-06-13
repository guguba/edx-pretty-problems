import React, {Component, useEffect, useState} from 'react';
import Dropzone from 'react-dropzone';
import Loader from 'react-loader-spinner';
import translations from '../Translations/translations';


const AWS = require('aws-sdk');


class ImageUploader extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loadingImage: false
    }
  }

  async onImageDrop(img, id) {
    this.setState({loadingImage: true});
    await this.props.onImageDrop(img, id);
    this.setState({loadingImage: false});
    document.getElementById("dropzone"+(id)).style.opacity = 0;
  }

  render() {

    const langStrings = translations[this.props.styler.language];
    console.log(langStrings.imageDrag);

    return (
      <Dropzone onDrop={(accepted) => this.onImageDrop(accepted, this.props.id)}>
        {({getRootProps, getInputProps}) => (
          <section className="dropzone-container">
            {this.state.loadingImage ?
            <Loader 
              type="Oval"
              color="#00BFFF"
              height="25"	
              width="25"
            /> : 
            <div {...getRootProps({className: 'dropzone', id: 'dropzone'+this.props.id})}>
              <input {...getInputProps()} />
              <p>{langStrings.imageDrag}</p>
            </div>}
            {this.props.image && !this.state.loadingImage && (
                <div className="preview-image">
                  <img
                    src={this.props.image}
                  />
                </div>
            )}
          </section>
        )}
      </Dropzone>
    );
  
  }
}

export default ImageUploader;