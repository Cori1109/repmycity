import React from 'react';
import {Link} from 'react-router';
let {connect} = require('react-redux');
let productActions = require('productActions');
let cartActions = require('cartActions');
import {browserHistory} from 'react-router';
import Format from 'format';
import Modal from 'react-modal';
import shopifyAPI from 'shopifyAPI';
import Loader from 'Loader';

class Product extends React.Component {
  constructor(){
    super();

    this.state = {
      modalIsOpen: false
    }

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);

    let dispatch;
    let product;
  }

  componentWillMount(){
    this.dispatch = this.props.dispatch;

    shopifyAPI.buyClient.fetchProduct(this.props.params.productId).then((data) => {
      let product = data || {};
      this.product = product;
      this.dispatch(productActions.setActiveProduct(product.options));
    });
  }

  componentWillUnmount(){
    this.dispatch(productActions.clearActiveProduct());
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  openModal() {
    this.setState({modalIsOpen: true});
  }

  handleOptionChange(optionName, value) {
    // update product options in the Shopify singleton
    this.product.options.filter((option) => {
      return option.name === optionName;
    })[0].selected = value;

    // update product options
    this.dispatch(productActions.updateActiveProductOptions(this.product.options));
  }

  render() {
    let activeProduct;
    activeProduct = this.product;
    if (activeProduct) {
      let {dispatch} = this.props;
      let {product_id, title, images, options} = activeProduct.attrs;
      let {description, selectedVariant, selectedVariantImage} = activeProduct;

      let renderOptions = () => {
        return (
          <div className="product-options">
            {activeProduct.options.map((option, index) => {
              if (option.name != "Size" && option.name != "Title") {
                return (
                  <select key={index} name={option.name} value={option.selected} onChange={(event) => {
                    this.handleOptionChange(option.name, event.target.value);
                  }}>
                    {option.values.map((value, index) => {
                      return (
                        <option key={index} value={value}>{value}</option>
                      )
                    })}
                  </select>
                )
              }
            })}
          </div>
        )
      }

      let renderSizes = () => {
        return (
          activeProduct.options.map((option, optionsIndex) => {
            if (option.name == "Size") {
              return (
                <ul key={optionsIndex} className="product-sizes">
                  {option.values.map((value, index) => {
                    return (
                      <li
                        key={index}
                        className={`product-size ${option.selected === value ? 'selected' : ''}`}
                        onClick={() => {
                          this.handleOptionChange(option.name, value);
                        }}
                      >
                        {value}
                      </li>);
                  })}
                </ul>
              )
            }
          })
        )
      }

      console.log('activeProduct: ', activeProduct);

      return (
        <div className="container">
          <div className="row">
            <div className="small-12 medium-8 column">
              <button onClick={browserHistory.goBack} className="button hollow">&lsaquo; Back to products</button>
              <p className="text-center"><img src={selectedVariantImage.src} alt="" /></p>
              {/* <p>Current options:</p> */}
              {/* {options.map(option => {
                return <p>{option.name}</p>
              })}
              {images.map(image => {
                return <img key={image.id} height="50" width="50" src={image.src} alt="" />
              })} */}
            </div>
            <div className="small-12 medium-4 column">
              <h1 className="product-title">{title}</h1>
              <div className="product-info">
                <h5 className="product-info__headline">Artist</h5>
                <p>JWISH88</p>

                <h5 className="product-info__headline">Description</h5>
                <div dangerouslySetInnerHTML={{__html: description}}></div>

                {renderOptions()}

                {/* <div className="product-style">
                  <input type="text" placeholder="Select style" />
                  <button type="submit" className="product-style__button"><i className="fa fa-caret-right"></i></button>
                </div> */}

                {renderSizes()}

                <div className="product-price">{Format.asMoney(selectedVariant.price)}</div>

                <div className="product-charity">
                  <input type="text" placeholder="Choose Charity" />
                  <button type="submit" className="product-charity__button"><i className="fa fa-caret-right"></i></button>
                  <div className="product-charity__more-info" onClick={this.openModal}><i className="fa fa-info-circle"></i> <a href="#">more info</a></div>

                  <Modal
                    isOpen={this.state.modalIsOpen}
                    onRequestClose={this.closeModal}
                    contentLabel="more info"
                    closeTimeoutMS={200}
                    className="ReactModal__Content"
                   >
                     <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque egestas, nibh sed tristique ornare, nunc dui sollicitudin elit, id consectetur odio lectus eu nulla. Proin dapibus convallis urna sit amet dictum. Ut porttitor ligula at purus auctor molestie. Etiam velit nibh, porttitor at ipsum mattis, consectetur egestas arcu. Donec pellentesque augue sit amet elementum facilisis. Aenean semper malesuada ligula faucibus sollicitudin. Curabitur ut lorem ac erat porta lacinia pulvinar et risus.</p>
                     <p>Sed at nulla dolor. Ut quis quam finibus, efficitur mi sed, sollicitudin urna. Nunc vel tortor commodo, mollis est eu, blandit massa. Vivamus sed mi vitae sem commodo consectetur eu in sem. Donec ut facilisis odio. Nullam id elementum eros, non tempus tortor. Nullam in mattis felis. Praesent bibendum blandit ante, et elementum metus consectetur vitae.</p>
                     <button className="close-modal-icon" onClick={this.closeModal}><i className="fa fa-times" /></button>
                  </Modal>
                </div>

                <button
                  onClick={()=>{
                    dispatch(cartActions.startAddorUpdateCartItem(activeProduct.selectedVariant, 1));
                  }}
                  className="button large add-to-cart">Add To Cart</button>
                <img src="/images/credit-cards.png" alt="Accepted credit cards" />
              </div>
            </div>
          </div>
        </div>
      )
    }else{
      return (
        <Loader />
      )
    }
  }
}

export default connect(
  (state) => {
    return {
      activeProduct: state.products.active
    }
  }
)(Product);
