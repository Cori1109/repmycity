import React from 'react';
import DocumentMeta from 'react-document-meta';

class About extends React.Component{
  constructor(){
    super();
  }

  render() {
    return (
      <section className="section">
        <div className="container">
          <h1>About us</h1>
        </div>
      </section>
    )
  }
}

module.exports = About;
