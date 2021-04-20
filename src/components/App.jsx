import React from 'react';
import ReactDom from 'react-dom';
import axios from 'axios';
import requests from '../lib/axiosPrefilter.js';
import RelatedItems from './relatedItems.jsx';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      productTest: '',
      relatedProducts: []

    };
    //bind functions here

  }
  //functions/handler section derp

  //api pull test
  componentDidMount() {
    axios.get(requests.pullCart)
      .then(products => {
        console.log(products)
      })
      .catch(error => {
        console.error('Error pulling products: ', error)
      })
    axios.get(requests.pullProducts)
    .then(allProducts => {
      this.setState({
        relatedProducts: allProducts.data
      })
    })
    .catch(error => {
      console.error('Error pulling products: ', error)
    })
  }



  render() {

    return (
      <div>
      <div>Good day, Planet!</div>

      <div><RelatedItems allProducts={this.state.relatedProducts}/></div>
      </div>
    )
  }
}

export default App;