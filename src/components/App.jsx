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
      productTest: ''
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