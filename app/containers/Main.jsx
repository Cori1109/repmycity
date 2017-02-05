import React from 'react';
import Header from 'Header';
import DocumentMeta from 'react-document-meta';

class Main extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      title: '',
      content: ''
    };
  }

  render() {
    const meta = {
      title: 'Rep Your City',
      description: 'Rep Your City description',
      meta: {
        charset: 'utf-8'
      },
      auto: {
        ograph: true
      }
    };

    return (
      <div id="main">
        <DocumentMeta {...meta} />
        <Header/>
        <div className="container">
          {this.props.children}
        </div>
      </div>
    );
  }
}

module.exports = Main;
