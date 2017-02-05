import React from 'react';
import {Link} from 'react-router';

class CollectionItem extends React.Component {
  render() {
    let {title, id} = this.props;

    return (
      <div className="collection-item">
        <div className="collection-item-inner">
          <h2 className="text-center"><Link to={`/collection/${id}`}>{title}</Link></h2>
        </div>
      </div>
    )
  }
}

module.exports = CollectionItem;
