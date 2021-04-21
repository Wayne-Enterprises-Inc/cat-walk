import React from 'react';
import ReactDom from 'react-dom';
import axios from 'axios';
import requests from '../lib/axiosPrefilter.js';
import RatingBreakdown from  './RatingsReviews/RatingBreakdown.jsx';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      productTest: ''
    };
    //bind functions here

  }
  //functions/handler section derp

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
        <div>Good day, Planet!</div>
        <RatingBreakdown />
      </div>
    )
  }
}

export default App;