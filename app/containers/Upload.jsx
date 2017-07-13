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

    this.formData = new FormData();
    this.state = {
      file: null,
      fileCoordinates: {
        x: 0,
        y: 0
      },
      fileDimensions: {
        width: 0,
        height: 0
      },
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

  handleCreateImage() {
    let backgroundImage = this.state.shirtStyles[this.state.activeShirtStyle].image;
    let filename = this.state.file;
    let fileDimensions = this.state.fileDimensions;
    let fileCoordinates = this.state.fileCoordinates;

    let data = {
      backgroundImage,
      filename,
      fileDimensions,
      fileCoordinates
    };

    console.log('creating image...', data);

    axios.post('/shopify/new_product_image', data, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then((response) => {
      console.log('success creating image!: ', response);
    })
    .catch(error => console.log('Error creating image file: ', error));
  }

  onDrop(files) {
    let file = files[0];
    this.formData.append('file', file);
    axios.post('/upload/file', this.formData, {
      headers: {
        'Content-Type': file.type
      }
    })
    .then((response) => {
      console.log('success!: ', response);

      this.setState({
        file: response.data.filename
      });
    })
    .catch(error => console.log('Error uploading file: ', error));
  }

  handleResized(e, data) {
    let x = data.x;
    let y = data.y;
    let width = e.path[1].clientWidth;
    let height = e.path[1].clientHeight;
    this.setState({
      fileCoordinates: { x, y },
      fileDimensions: { width, height }
    });
    console.log('x: ', x);
    console.log('y: ', y);
    console.log('width: ', width);
    console.log('height: ', height);
    console.log(this.state);
  }

  render() {
    let {dispatch} = this.props;
    let {file, shirtStyles, activeShirtStyle, dropzoneActive} = this.state;
    let dropzoneRef;

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
            </div>

            <label for="add-artwork">Add your artwork</label>
            <button type="button" className="button" onClick={() => { dropzoneRef.open() }}>Upload artwork</button>
            <div>
              <button type="button" className="button" onClick={this.handleCreateImage.bind(this)}>Create Image</button>
            </div>
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
                    x: this.state.fileCoordinates.x,
                    y: this.state.fileCoordinates.y,
                    width: 200,
                    maxWidth: 200,
                  }}
                  bounds="parent"
                  onResizeStop={this.handleResized.bind(this)}
                  onDragStop={this.handleResized.bind(this)}
                >
                  {file ? <img src={`uploads/${file}`} /> : '' }
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
