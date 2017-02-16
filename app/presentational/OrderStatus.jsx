import React from 'react';
import DocumentMeta from 'react-document-meta';

class OrderStatus extends React.Component{
  constructor(){
    super();
  }

  render() {
    return (
      <section className="section">
        <div className="container">
          <h1>Order Status page</h1>
        </div>
      </section>
    )
  }
}

module.exports = OrderStatus;
