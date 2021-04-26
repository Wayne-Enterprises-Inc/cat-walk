import React from 'react';
import ReactDom from 'react-dom';
import axios from 'axios';
import requests from '../lib/axiosPrefilter.js';


import CompareModal from "./CompareModal";
import YourOutfit from './YourOutfit'
import OutFitCreater from './OutFitCreater'
import RatingBreakdown from './RatingsReviews/RatingBreakdown.jsx';

import RelatedItems from './RelatedItems.jsx';



import Overview from './ProductOverview/Overview.jsx';

// testing out styled components
import styled from 'styled-components';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      relatedProducts: [],
      productPics: '',
      productTest: '',
      starData: 0,
      productId: '',
    };

    //bind functions here
    this.handleStarData = this.handleStarData.bind(this);
    this.relatedSelectHandle = this.relatedSelectHandle.bind(this)
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

  handleStarData(data) {
    this.setState({
      starData: data
    })
  }

  relatedSelectHandle(event) {
    if (this.state.productId !== '') {
      console.log('event: ', event.target.attributes.value.nodeValue)
      this.setState({
        productId: ''
      }, () => {
        this.setState({
          productId: event.target.attributes.value.nodeValue
        })
      }, () => {
        console.log('updated productId: ', this.state.productId)
      })
    } else {
      this.setState({
        productId: event.target.attributes.value.nodeValue
      }, () => {
        console.log('updated productId: ', this.state.productId)
      })
    }
  }


  render() {

    return (
      <div>
        <LogoBar>
          <p style={{ fontWeight: 'bold' }}>Clothing Inc.</p>
        </LogoBar>

        <Overview
          starData={this.state.starData}
          productId={this.state.productId} />

        <div><RelatedItems
        productId={this.state.productId}
        getId={this.relatedSelectHandle}
        allProducts={this.state.relatedProducts}
        starData={this.state.starData} /></div>

        <YourOutfit allProducts={this.state.relatedProducts} starData={this.state.starData} />
        {/* <OutFitCreater allProducts={this.state.relatedProducts}/> */}


        <RatingBreakdown onRatingChange={this.handleStarData}
        productId={this.state.productId} />

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