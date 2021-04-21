import React from 'react';
import ReactDom from 'react-dom';
import axios from 'axios';
import requests from '../lib/axiosPrefilter.js';
import RatingBreakdown from  './RatingsReviews/RatingBreakdown.jsx';
import RelatedItems from './relatedItems.jsx';

import Overview from './ProductOverview/Overview.jsx';

// testing out styled components
import styled from 'styled-components';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      productPics: '',
      productTest: '',
      relatedProducts: []

    };
    //bind functions here

  }
  //functions/handler section


  //api pull test
  // componentDidMount() {
  //   axios.get(requests.pullCart)
  //     .then(products => {
  //       console.log(products)
  //     })
  //     .catch(error => {
  //       console.error('Error pulling products: ', error)
  //     })
  // }
  //Michael Note: I am basically just doing this on my own widget.
  //I can have more control without affecting your code.
  componentDidMount() {
    axios.get(requests.pullProducts+'/19089/styles')
      .then(products => {
        var productArray = products.data.results
        this.setState({
          productPics: productArray[0].photos
        })
        //console.log(productArray[0].photos)
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
        <LogoBar>
          <p style={{ fontWeight: 'bold' }}>Good day, Planet!</p>
        </LogoBar>

        <Overview/>
        <RelatedItems allProducts={this.state.relatedProducts}/>
        <RatingBreakdown />
      </div>
    )
  }
}
// experimenting with the styled-components package
const LogoBar = styled.div`
display: flex;
justify-content: space-around;
align-items: center;
width: 100%;
background-color: grey;
height: 50px;
`;

export default App;