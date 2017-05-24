import React from 'react';
import {Link} from 'react-router';
let {connect} = require('react-redux');
import Dropzone from 'react-dropzone';
import FacebookProvider, { Login } from 'react-facebook';
import axios from 'axios';

class Upload extends React.Component {
  constructor(){
    super();

    this.state = {
      file: null,
      dropzoneActive: false
    }
  }

  onFacebookResponse(data, user_data) {
    console.log(user_data);
  }

  onDragEnter() {
    this.setState({
      dropzoneActive: true
    });
  }

  onDragLeave() {
    this.setState({
      dropzoneActive: false
    });
  }

  onDrop(files) {
    let file = files[0];
    let data = new FormData();
    data.append('file', file);

    axios.post('/upload/file', data, {
      headers: {
        'Content-Type': file.type
      }
    })
    .then((response) => {
      console.log('success!: ', response);

      this.setState({
        file: `/uploads/${response.data.filename}`
      });
    })
    .catch(error => console.log('Error uploading file: ', error));
  }

  render() {
    let {dispatch} = this.props;

    axios.get('/shopify').then((data) => {
      console.log('data: ', data);
    });

    return (
      <div className="container">
        <div className="row">
          <div className="small-3">
            <label for="shirt-style">Select shirt style</label>
            <select id="shirt-style">
              <option value="male">Male T-Shirt</option>
              <option value="female">Female T-Shirt</option>
            </select>
          </div>
          <div className="small-8 small-offset-1">
            <div className="preview">
              <Dropzone
                onDrop={this.onDrop.bind(this)}
                onDragEnter={this.onDragEnter.bind(this)}
                onDragLeave={this.onDragLeave.bind(this)}
                multiple={false}
                className={`dropzone ${this.state.dropzoneActive ? 'active' : ''} ${this.state.file ? 'accepted' : ''}`}
              >
                {({ isDragActive, isDragReject, acceptedFiles, rejectedFiles }) => {
                  if (isDragReject) {
                    return "This file is not supported. Please upload a JPG or PNG image.";
                  }
                  return acceptedFiles.length ? <img src={this.state.file} /> : "Drop your artwork here.";
                }}
              </Dropzone>
            </div>

          </div>
        </div>


        <FacebookProvider appID={ENV_CONFIG.FB_APP_ID}>
          <Login scope="email" onResponse={this.onFacebookResponse.bind(this)}>
            <span>Login via Facebook</span>
          </Login>
        </FacebookProvider>

        <img src="/images/upload-placeholder.png" />
      </div>
    )
  }
}

export default connect(
  (state) => {
    return {
      activeProduct: state.products.active
    }
  }
)(Upload);
