import React from 'react';
import axios from 'axios';
import requests from '../../lib/axiosPrefilter.js';
import styled from 'styled-components';


class Reviews extends React.Component {
  constructor(props) {
    super(props);


    this.state = {
      sort: null,
      count: 5,
      reviewData: {},
      visibleReviews: null,
      product_id: this.props.id,
      isOpen: false,
      review_id: 289132,
      rating: 4,
      summary: 'Best purchase ever',
      recommend: true,
      response: null,
      body: 'So damn good',
      date: '2021-03-15T00:00:00.000Z',
      reviewer_name: 'hii123',
      helpfulness: 3,
      photos: [],
    };
    this.getReviews = this.getReviews.bind(this);

  }

  textToggle() {
    this.setState({ isOpen: !this.state.isOpen })
  }

  getMoreText(text) {
    if (this.state.isOpen) {
      return text
    }
    return text.slice(0, 60);
  }

  getReviews() {
    axios.get(`${requests.pullReviews}/?product_id=${this.state.product_id}&sort=${this.state.sort}&count=${this.state.count}`)
      .then(data => {
        this.setState({
          reviewData: data.data,
          visibleReviews: data.data.results.slice(0,2)
        }, () => {
          console.log('WORK PLEASE', this.state.visibleReviews);
        })
      }).catch(err => {
        console.log('ERROR', err);
      })
  }

  componentDidUpdate(prevProps) {
    let updatedData = this.props.totalReviews
    if (prevProps.totalReviews !== updatedData) {
      this.setState({
        count: updatedData || 5,
      }, () => {
        this.getReviews();
      })
    }
  }


  render() {
    return (
      <RightWrapper>
        <ReviewList>
          {this.state.visibleReviews ? this.state.visibleReviews.map((review) => (
            <IndividualReview key={review.review_id}>

              <ReviewHead>
                <Rating>{review.rating}</Rating>
                <TimeStamp>{review.reviewer_name}, {review.date}</TimeStamp>
              </ReviewHead>
              <Clear></Clear>
              <ReviewBody>
                <Title>{review.summary}</Title>
                <Desciption>{this.getMoreText}
                  <button onClick={this.textToggle}>
                    {this.state.isOpen ? 'less' : 'more'}
                  </button>
                </Desciption>
              </ReviewBody>
              <br></br>
              <br></br>
              Helpfulness: {review.helpfulness}
              <Photos>
                {review.photos ? review.photos.map((photo) => (
                <IndividualPhotos key={photo.id} src={photo.url} ></IndividualPhotos>
              )): null }
              </Photos>
              <br></br>
              Recommended: {review.recommended}
              <br></br>
              Response: {review.response}
              <br></br>
              Review_id: {review.review_id}
              <br></br>
              Summary: {review.summary}
              <br></br>

            </IndividualReview>
          )) : null }
        </ReviewList>
      </RightWrapper>
    )
  }
}


const RightWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const ReviewList = styled.div`

`;

const IndividualReview = styled.div`
  margin-bottom:50px;
`;

const Photos = styled.div`
  width: 100%;
  max-height: 20%;
  display: inline-block;
`;

const IndividualPhotos = styled.img`
  width: 30%;
  float: left;
  margin: 3px;
  padding: 3px;
  display: block;
`;

const ReviewHead = styled.div`
  width:100%;
  max-height: 20px;
`;

const Clear = styled.div`
  clear: both;
  margin-bottom: 25px;
`;

const ReviewBody = styled.div`
  width:100%;
`;

const Title = styled.div`
font-weight: bold;
overflow: hidden;
white-space: nowrap;
text-overflow: ellipsis;
`;

const Desciption = styled.div`
`;

const Rating = styled.div`
float: left;
`;

const TimeStamp = styled.div`
float: right;
`;

export default Reviews;