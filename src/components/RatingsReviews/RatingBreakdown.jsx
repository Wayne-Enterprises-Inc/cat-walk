import React from 'react';
import axios from 'axios';
import requests from '../../lib/axiosPrefilter.js';
import styled from 'styled-components';
import SizeBreakdown from './SizingBreakdown.jsx'
import Reviews from './Reviews.jsx'





class RatingBreakdown extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentItemId: 19089,
      reviewData: {},
      ratings: 0,
      averageRating: 0,
      recommended: 0,
      recommendedPercentage: 0,
      starPercentage: 0,
      reviewAverages: [],
      characteristics: 0,
      totalReviews: 0,
    };

  //BINDINGS
  this.getRatings = this.getRatings.bind(this);
  this.averageReviews = this.averageReviews.bind(this);
  this.displayStars = this.displayStars.bind(this);
  this.eachStarAverage = this.eachStarAverage.bind(this);
  this.handleRatingChange = this.handleRatingChange.bind(this);


  }

/*
==============================================
FUNCTIONS
==============================================
*/


  getRatings(id) {
    //Initial GET
    axios.get(`${requests.pullReviews}/meta/?product_id=${id}`)
      .then(data => {
        this.setState({
          //Sets State to Product's Review Data
          reviewData: data.data,
        }/*, () => console.log(this.state.reviewData)*/)
      }).then(() => {
        this.setState({
          //From data sets seperate state for ratings and recommended
          characteristics: this.state.reviewData.characteristics,
          ratings: this.state.reviewData.ratings,
          recommended: this.state.reviewData.recommended,
        }/*, () => console.log(this.state.characteristics)*/)
      }).then(() => {
        this.recommendedReviews(this.state.recommended)
        this.setState({
          //After ratings state is set, it is used to calculate average rating
          averageRating: this.averageReviews(this.state.ratings),
        });
      }).then(() => {
        //Runs function to display graph corresponding to AverageRating
        this.displayStars();
      }).catch(err => {
        //Catches any errors in process
        console.error('ERROR GETTING REVIEWS: ', err);
      })
  }

  handleRatingChange () {
    var starData = this.state.starPercentage
    this.props.onRatingChange(starData);
  }


  recommendedReviews(recommended) {
    let total = 0;
    total = Number(recommended.true) + Number(recommended.false);
    let positiveRecommended = (Math.round((Number(recommended.true) / total) * 100) + '%')
    this.setState({
      recommendedPercentage: positiveRecommended
    })
  }

  averageReviews(reviews) {
    let reviewsArray = Object.entries(reviews);
    let number = 0;
    let total = 0;
    let average = 0;
    //Loops over array of reviews to pick out each key:value to convert to numeric values
    reviewsArray.forEach(([key, value]) => {
      total = total + Number(value);
      number = number + (key * value);
    })
    //Numeric rating sum divided by total number of reviews give average review, which is rounded to one decimal point
    this.setState({
      totalReviews: total,
    })
    this.eachStarAverage(reviewsArray, total);
    average = Number((number / total).toFixed(1));
    console.log('AVERAGE', average)
    return average;
  }

  eachStarAverage(array, total) {
    let averagesArray = {};
    array.forEach(([key, value]) => {
      averagesArray[key] = [value, (((value / total)*100).toFixed(2) + '%')];
    })
    this.setState({
      reviewAverages: averagesArray
    })
  }


  componentDidUpdate(prevProps) {
    if (Number(this.state.currentItemId) !== Number(this.props.productId) && this.props.productId) {
      this.setState({
        currentItemId: this.props.productId
      }, () => {
        this.getRatings(this.state.currentItemId)
      })
    }
  }

  componentDidMount() {
    this.getRatings(this.state.currentItemId)
  }

  displayStars() {
    const starsTotal = 5;
    //Gives percentage of reviews based on a 5 star count
    console.log('AVERAGE RATING', this.state.averageRating)
    const starPercentage = (this.state.averageRating / starsTotal) * 100;
    //Rounds percentage so each Star is worth "20%" and each quarter will be at ex: 0%(empty), 5%(quarter), 10%(half), 15%(3/4), 20%(filled star)
    const starPercentageRounded = `${Math.round(starPercentage/5) * 5}%`
    this.setState({
      starPercentage: starPercentageRounded,
    })
    this.handleRatingChange();
    //console.log(this.state.starPercentage)
  }




/*
==============================================
MAIN RENDER
==============================================
*/

  render() {
    const {reviewAverages, recommendedPercentage} = this.state
    return (
    <Container>
      <MainHeading>RATINGS & REVIEWS</MainHeading>
      <LeftWrapper>
        <Wrapper>
          <AverageStar>{this.state.averageRating ? this.state.averageRating : 'N/A'}</AverageStar>
          <Ratings>
            <StarsOuter>
              <StarsInner starsPercent={this.state.starPercentage}></StarsInner>
            </StarsOuter>
          </Ratings>
        </Wrapper>
        <Graph>
          <NumberLabel>{reviewAverages[5] ? reviewAverages[5][0] : null}</NumberLabel>
          <StarLabel>5 stars</StarLabel>
          <ProgressBar><Bar width={reviewAverages[5] ? reviewAverages[5][1] : null}/></ProgressBar>
            <NumberLabel>{reviewAverages[4] ? reviewAverages[4][0] : null}</NumberLabel>
            <StarLabel>4 stars</StarLabel>
            <ProgressBar><Bar width={reviewAverages[4] ? reviewAverages[4][1] : null}/></ProgressBar>
          <NumberLabel>{reviewAverages[3] ? reviewAverages[3][0] : null}</NumberLabel>
          <StarLabel>3 stars</StarLabel>
          <ProgressBar><Bar width={reviewAverages[3] ? reviewAverages[3][1] : null}/></ProgressBar>
            <NumberLabel>{reviewAverages[2] ? reviewAverages[2][0] : null}</NumberLabel>
            <StarLabel>2 stars</StarLabel>
            <ProgressBar><Bar width={reviewAverages[2] ? reviewAverages[2][1] : null}/></ProgressBar>
          <NumberLabel>{reviewAverages[1] ? reviewAverages[1][0] : null}</NumberLabel>
          <StarLabel>1 stars</StarLabel>
          <ProgressBar><Bar width={reviewAverages[1] ? reviewAverages[1][1] : null}/></ProgressBar>
        </Graph>
        <Recommended>{recommendedPercentage} of reviews recommended this product</Recommended>
      </LeftWrapper>
      <RightWrapper>
        <Reviews id={this.state.currentItemId} totalReviews={this.state.totalReviews} starData={this.state.starPercentage} characteristics={this.state.characteristics}></Reviews>
      </RightWrapper>
    </Container>
    );
  }


}




/*
==============================================
STYLED COMPONENTS
==============================================
*/

const Container = styled.div`
  padding-top: 20px;
  padding-bottom: 20px;
  border-top: 1px solid black;
  margin-left: 10%;
  margin-right: 10%;
  overflow: hidden;
`;

const MainHeading = styled.div`
  font-size: 20px;
`;

const LeftWrapper = styled.div`
  width: 35%;
  float: left;
  display:inline-block;
  margin-right: 5%;
`;

const RightWrapper = styled.div`
  float: left;
  display:inline-block
  width: 60%;
  max-width: 60%;
`;


const Wrapper = styled.div`
  display: flex;
  margin-bottom: 30px;
`;

const AverageStar = styled.div`
  font-size: 72px;
`;

const Ratings = styled.div`
  padding-left: 20px;
  padding-top: 10px;
  margin-top: 5px;
`;


const StarsOuter = styled.div`
  & {
    position: relative;
    display: inline-block;
  }
  &:before {
    content: '\f005 \f005 \f005 \f005 \f005';
    font-family: 'Font Awesome 5 Free';
    font-weight: 900;
    color: #ccc;
  }
`;

const StarsInner = styled.div`
  & {
  position: absolute;
  top: 0;
  left: 0;
  white-space: nowrap;
  overflow: hidden;
  width: ${props => props.starsPercent}
  }
  &:before {
    content: '\f005 \f005 \f005 \f005 \f005';
    font-family:"Font Awesome 5 Free";
    font-weight:900;
    color: #f8ce0b;
  }
`;

const Graph = styled.div`
  margin-bottom: 25px;
`;

const StarLabel = styled.div`
  float: left;
  font-size:16px;
  text-decoration: underline;
  display:block;
  margin-right: 5px;
`;

const NumberLabel = styled.div`
  position: relative;
  display: inline-block;
  font-size: 16px;
  margin-left: 5px;
  float: right;
`;
const ProgressBar = styled.div`
  position: relative;
  margin: 0px 0px 15px 0px;
  width:80%;
  height:18px;
  overflow:hidden;
  background: #d3d3d3;
  border-radius: 2px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.25) inset;
  min-height: 1%;
`;

const Bar = styled.div`
  position:relative;
  float:left;
  min-width:1%;
  height:100%;
  background-color:#64dd17;
  width: ${props => props.width};
`;

const Recommended = styled.div`
  font-size: 16px;
  width: 100%;
`;




export default RatingBreakdown;