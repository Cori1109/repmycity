import React from 'react';
import {Link} from 'react-router';
let {connect} = require('react-redux');
import Dropzone from 'react-dropzone';
import FacebookProvider, { Login } from 'react-facebook';
import axios from 'axios';
import Rnd from 'react-rnd';

class Upload extends React.Component {
  constructor(){
    super();

    this.state = {
      file: null,
      dropzoneActive: false,
      shirtStyles: [
        {
          name: 'Male T-shirt',
          image: '01-front-highlights-forwhite-1.png'
        },
        {
          name: 'Female T-shirt',
          image: '01-anvil-880-front-shadows.png'
        }
      ],
      activeShirtStyle: 0
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
    let {file, shirtStyles, activeShirtStyle, dropzoneActive} = this.state;
    let dropzoneRef;

    axios.get('/shopify').then((data) => {
      console.log('data: ', data);
    });

    return (
      <div className="container">
        <div className="row">
          <div className="small-3">
            <label for="shirt-style">Select shirt style</label>
            <select id="shirt-style" onChange={(event) => {
              this.setState({activeShirtStyle: event.target.value});
            }}>
              {shirtStyles.map((shirt, index) => {
                return <option value={index}>{shirt.name}</option>
              })}
            </select>

            <label for="shirt-color">Change shirt color</label>
            <div className="shirt-colors">
              <div className="shirt-color blue"></div>
              <div className="shirt-color black"></div>
              <div className="shirt-color white"></div>
              <div className="shirt-color blue"></div>
              <div className="shirt-color black"></div>
              <div className="shirt-color white"></div>
              <div className="shirt-color blue"></div>
              <div className="shirt-color black"></div>
              <div className="shirt-color white"></div>
            </div>

            <label for="add-artwork">Add your artwork</label>
            <button type="button" className="button" onClick={() => { dropzoneRef.open() }}>Upload artwork</button>
          </div>
          <div className="small-8 small-offset-1">
            <div className="preview" style={{backgroundImage: `url('/images/${shirtStyles[activeShirtStyle].image}')`}}>
              <Dropzone
                disableClick={file ? true : false}
                onDrop={this.onDrop.bind(this)}
                onDragEnter={this.onDragEnter.bind(this)}
                onDragLeave={this.onDragLeave.bind(this)}
                multiple={false}
                className={`dropzone ${dropzoneActive ? 'active' : ''} ${file ? 'accepted' : ''}`}
                ref={(node) => { dropzoneRef = node; }}
              >
                <Rnd
                  default={{
                    x: 0,
                    y: 0,
                    width: 200,
                    maxWidth: 300,
                  }}
                  bounds="parent"
                >
                  <img src={file} />
                </Rnd>
              </Dropzone>
            </div>
          </div>
        </div>


        {/* <FacebookProvider appID={ENV_CONFIG.FB_APP_ID}>
          <Login scope="email" onResponse={this.onFacebookResponse.bind(this)}>
            <span>Login via Facebook</span>
          </Login>
        </FacebookProvider>

        <img src="/images/upload-placeholder.png" /> */}
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
