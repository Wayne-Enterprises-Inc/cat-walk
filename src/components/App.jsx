import React from 'react';
import ReactDom from 'react-dom';
import axios from 'axios';
import requests from '../lib/axiosPrefilter.js';


import CompareModal from "./CompareModal";
import YourOutfit from './YourOutfit'
import OutFitCreater from './OutFitCreater'
import RatingBreakdown from  './RatingsReviews/RatingBreakdown.jsx';

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
    };

    //bind functions here
    this.handleStarData = this.handleStarData.bind(this);

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


  render() {

    return (
      <div>
        <LogoBar>
          <p style={{ fontWeight: 'bold' }}>Clothing Inc.</p>
        </LogoBar>
        <Overview starData={this.state.starData}/>

      <div><RelatedItems allProducts={this.state.relatedProducts} starData={this.state.starData}/></div>
      <YourOutfit allProducts={this.state.relatedProducts}/>
      <OutFitCreater allProducts={this.state.relatedProducts}/>
        <RelatedItems allProducts={this.state.relatedProducts}/>

        <RatingBreakdown onRatingChange = {this.handleStarData} />
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