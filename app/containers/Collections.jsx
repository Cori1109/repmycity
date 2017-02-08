import React from 'react';
let { connect } = require('react-redux');
let actions = require('collectionActions');

import Collection from 'Collection';
import CollectionItem from 'CollectionItem';

class Collections extends React.Component {
  constructor(){
    super();
  }

  render() {
    let {collections} = this.props;

    if (collections.length > 0) {
      return (
        <div className="row">
          {collections.map(collection => {
            return <CollectionItem key={collection.collection_id} id={collection.collection_id} title={collection.title} />
          })}
        </div>
      )
    }else{
      return (
        <div>Loading collections...</div>
      )
    }
  }
}


export default connect(
  (state) => {
    return {
      collections: state.collections.all
    }
  }
)(Collections);
