import React from 'react';
let { connect } = require('react-redux');
let actions = require('collectionActions');

class Collection extends React.Component {
  constructor(){
    super();
  }

  componentWillMount(){
    let {dispatch} = this.props;
    dispatch(actions.setActiveCollection(this.props.params.collectionId));
  }

  render() {
    let collection;
    collection = this.props.collection;
    if (collection){
      let {dispatch} = this.props;
      let {collection_id, title} = collection;

      return (
        <div className="collection-index">
          <h1 className="text-center">{title}</h1>
        </div>
      )
    }else{
      return (
        <div>Loading collection...</div>
      )
    }
  }
}

export default connect(
  (state) => {
    return {
      collection: state.collections.active
    }
  }
)(Collection);
