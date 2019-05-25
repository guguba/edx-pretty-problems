import React, {Component, useEffect, useState} from 'react';
import Dropzone from 'react-dropzone';

const AWS = require('aws-sdk');

class ImageUploader extends Component {

  constructor(props) {
    super(props);
  }

  render() {

    return (
      <Dropzone onDrop={(accepted) => this.props.onImageDrop(accepted, this.props.id)}>
        {({getRootProps, getInputProps}) => (
          <section className="dropzone-container">
            <div {...getRootProps({className: 'dropzone'})}>
              <input {...getInputProps()} />
              <p>Drag 'n' drop some files here, or click to select files</p>
            </div>
            {this.props.image && (
                <div className="preview-image">
                  <img
                    src={URL.createObjectURL(this.props.image)}
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