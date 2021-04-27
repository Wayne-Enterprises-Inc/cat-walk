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
      starData: 0,

      productId: 19089,
      reviewData: null,
    };

    //bind functions here
    this.handleStarData = this.handleStarData.bind(this);
    this.relatedSelectHandle = this.relatedSelectHandle.bind(this)
    this.getReviewInfo = this.getReviewInfo.bind(this)
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

  getReviewInfo(id) {
    axios.get(requests.pullReviews + `/meta/?product_id=${id}`)
      .then(reviews => {
        //console.log('All reviews: ', reviews.data.ratings)
        this.setState({
          reviewData: reviews
        })
      })
      .catch(err => {
        console.error('Error getting review info: ', err)
      })
  }

  componentDidMount() {
    this.getReviewInfo(this.state.productId)
  }

  render() {

    return (
      <SyledApp>
        <LogoBar>
        <i class="fas fa-tshirt" style={{
            fontWeight: 'bold',
            float: 'left',
            marginLeft: '20px',
            marginTop: '16px',
            marginBottom: '16px',
            backgroundColor: '#f8b500'}}></i>
          <p style={{
            fontWeight: 'bold',
            float: 'left',
            backgroundColor: '#f8b500'
        }}>Clothing Inc.</p>
        <input
        style= {{
          float: 'right',
          marginRight: '40px',
          marginTop: '15px'
        }}
        type='text'
        placeholder='Product Search...'

        ></input>
        </LogoBar>

        <Overview
          starData={this.state.starData}
          productId={this.state.productId}
          reviewData={this.state.reviewData}
        />

        <div>
          <RelatedItems
          productId={this.state.productId}
          getId={this.relatedSelectHandle}
          allProducts={this.state.relatedProducts}
          starData={this.state.starData}
          reviewData={this.state.reviewData}
           />
          </div>

        <YourOutfit allProducts={this.state.relatedProducts}
        reviewData={this.state.reviewData} starData={this.state.starData} />
        {/* <OutFitCreater allProducts={this.state.relatedProducts}/> */}


        <RatingBreakdown
        onRatingChange={this.handleStarData}
        productId={this.state.productId}
        reviewData={this.state.reviewData}
        />

      </SyledApp>
    )
  }
}
// experimenting with the styled-components package

const SyledApp = styled.div`
  font-family: helvetica;
  background: #f7f7f7;
  color: #393e46;
`

const LogoBar = styled.div`

left: 50px;
height: 50px;
background: #5c636e;
`;

export default App;