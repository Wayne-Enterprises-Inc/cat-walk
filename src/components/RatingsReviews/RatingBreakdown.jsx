import React from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import requests from '../../lib/axiosPrefilter.js';
import styled from 'styled-components';



class RatingBreakdown extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentItemId: 19092,
      reviewData: {},
      ratings: 0,
      averageRating: 0,
      recommended: 0,
      starPercentage: 0,
    };

  //BINDINGS
  this.getReviews = this.getReviews.bind(this);
  this.averageReviews = this.averageReviews.bind(this);
  this.displayStars = this.displayStars.bind(this);

  }


/*
==============================================
FUNCTIONS
==============================================
*/


  getReviews(id) {
    //Initial GET
    axios.get((`${requests.pullReviews}/meta/?product_id=${id}`))
      .then(data => {
        this.setState({
          //Sets State to Product's Review Data
          reviewData: data.data,
        }, () => console.log(this.state.reviewData))
      }).then(() => {
        this.setState({
          //From data sets seperate state for ratings and recommended
          ratings: this.state.reviewData.ratings,
          recommended: this.state.reviewData.recommended,
        }, () => console.log(this.state.ratings, this.state.recommended))
      }).then(() => {
        this.setState({
          //After ratings state is set, it is used to calculate average rating
          averageRating: this.averageReviews(this.state.ratings)
        });
      }).then(() => {
        //Runs function to display graph corresponding to AverageRating
        this.displayStars();
      }).catch(err => {
        //Catches any errors in process
        console.error('ERROR GETTING REVIEWS: ', err);
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
    average = Number((number / total).toFixed(1));
    return average;
  }


  componentDidMount() {
    this.getReviews(this.state.currentItemId)
  }

  displayStars() {
    const starsTotal = 5;
    //Gives percentage of reviews based on a 5 star count
    const starPercentage = (this.state.averageRating / starsTotal) * 100;
    //Rounds percentage so each Star is worth "20%" and each quarter will be at ex: 0%(empty), 5%(quarter), 10%(half), 15%(3/4), 20%(filled star)
    const starPercentageRounded = `${Math.round(starPercentage/5) * 5}%`
    this.setState({
      starPercentage: starPercentageRounded,
    })
    console.log(this.state.starPercentage)
  }



/*
==============================================
MAIN RENDER
==============================================
*/

  render() {
    const { stars, rating, hovered, deselectedIcon, selectedIcon } = this.state;
    return (
    <Container>
      <h4>Ratings & Reviews</h4>
      <LeftWrapper>
        <Wrapper>
          <h2>{this.state.averageRating}</h2>
          <Ratings>
            <StarsOuter>
              <StarsInner starsPercent={this.state.starPercentage}></StarsInner>
            </StarsOuter>
          </Ratings>
        </Wrapper>
        <div>
          <Label>5 stars</Label>
            <ProgressBar><Bar width='65%'/></ProgressBar>
          <Label>4 stars</Label>
            <ProgressBar><Bar width='40%'/></ProgressBar>
          <Label>3 stars</Label>
            <ProgressBar><Bar width='100%'/></ProgressBar>
          <Label>2 stars</Label>
            <ProgressBar><Bar width='50%'/></ProgressBar>
          <Label>1 stars</Label>
            <ProgressBar><Bar width='25%'/></ProgressBar>
        </div>
      </LeftWrapper>
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
`;


const LeftWrapper = styled.div`
  width: 20%;
`;


const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;


const Ratings = styled.div`
  padding-left: 20px;
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

const Label = styled.div`
  float: left;
  font-size:20px;
`;

const ProgressBar = styled.div`
  padding:0;
  width:90%;
  height:10px;
  overflow:hidden;
  background:#e5e5e5;
  border-radius:6px;
`;

const Bar = styled.div`
  position:relative;
  float:left;
  min-width:1%;
  height:100%;
  background:	#585858;
  width: ${props => props.width};
`;




export default RatingBreakdown;