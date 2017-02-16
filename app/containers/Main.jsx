import React from 'react';
import Header from 'Header';
import Footer from 'Footer';
import DocumentMeta from 'react-document-meta';
import Cart from 'cart';

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

    let pageName = this.props.location.pathname.replace('/', '-').substr(1);

    return (
      <div id="main" className={`page-${pageName ? pageName + ' subpage' : 'home'}`}>
        <DocumentMeta {...meta} />
        <Header />
        <div id="main-container">
          <Cart />
          {this.props.children}
        </div>
        <Footer />
      </div>
    );
  }
}

module.exports = Main;
