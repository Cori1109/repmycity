import React from 'react';

class CollectionItem extends React.Component {
  render() {
    let {title, id} = this.props;

    return (
      <div className="collection-item">
        <div className="collection-item-inner">
          <h2 className="text-center"><a href={'/collection/' + id}>{title}</a></h2>
        </div>
      </div>
    )
  }
}

module.exports = CollectionItem;
