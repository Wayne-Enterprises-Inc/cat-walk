import React from 'react';
import axios from 'axios';
import requests from '../../lib/axiosPrefilter.js';
import styled from 'styled-components';
import SortedBy from './SortedBy.jsx'
import moment from 'moment';



class Reviews extends React.Component {
  constructor(props) {
    super(props);


    this.state = {
      sort: 'Relevant',
      count: 5,
      reviewData: {},
      visibleReviews: null,
      product_id: this.props.id,
      isOpen: false,
      isT: false,
      reviewCounter: 2,
      // review_id: 289132,
      // rating: 4,
      // summary: 'Best purchase ever',
      // recommend: true,
      // response: null,
      // body: 'So damn good',
      // date: '2021-03-15T00:00:00.000Z',
      // reviewer_name: 'hii123',
      // helpfulness: 3,
      // photos: [],
    };
    this.getReviews = this.getReviews.bind(this);
    this.textToggle = this.textToggle.bind(this);
    this.getMoreText = this.getMoreText.bind(this);
    this.currentSelection = this.currentSelection.bind(this);
    this.moreReviews = this.moreReviews.bind(this);


    // this.isT = this.isT.bind(this);


  }

  textToggle() {
    this.setState({ isOpen: !this.state.isOpen })
  }

  //Currently out of commission
  // isT() {
  //   console.log('guessing here')
  //   this.setState({isT: true})
  // }

  getMoreText(text) {
    if (text.length > 250) {
      //Plan was to call isT here for button
      if (this.state.isOpen) {
        return text
      }
      return text.slice(0, 250);
    } else {
      return text;
    }
  }

  moreReviews() {
    this.setState({
      reviewCounter: this.state.reviewCounter + 2
    }, () => {
      this.setState({
        visibleReviews: this.state.reviewData.results.slice(0, this.state.reviewCounter)
      })
    })
  }

  getReviews() {
    axios.get(`${requests.pullReviews}/?product_id=${this.state.product_id}&sort=${this.state.sort.toLowerCase()}&count=${this.state.count}`)
      .then(data => {
        this.setState({
          reviewData: data.data,
          visibleReviews: data.data.results.slice(0, this.state.reviewCounter)
        }, () => {
          console.log(this.state.visibleReviews)
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

  currentSelection(selection)  {
    console.log('SELECTION', selection);
    this.setState({
      sort: selection[0].value,
    }, () => {
      this.getReviews()
    });
  }

  render() {
    let showButton = this.state.isT ? (
      <button onClick={this.textToggle}>
          {this.state.isOpen ? 'show less' : 'show more'}
      </button>
    ) : (
     null
    );

    const sortItems = [
      {
        id: 1,
        value: 'Relevant'
      },
      {
        id: 2,
        value: 'Helpful'
      },
      {
        id: 3,
        value: 'Newest'
      },
    ]
    return (
      <RightWrapper>
        <WrapperHeader>
          {this.state.reviewData.count} reviews, sorted by &nbsp;
          <SortedBy title={this.state.sort} items={sortItems} callback={this.currentSelection}/>
        </WrapperHeader>

        <ReviewList>
          {this.state.visibleReviews ? this.state.visibleReviews.map((review) => (
            <IndividualReview key={review.review_id}>

              <ReviewHead>
                <Rating>{review.rating}</Rating>
                <TimeStamp>{review.reviewer_name}, {moment(review.date).format('LL')}</TimeStamp>
              </ReviewHead>

              <Clear></Clear>

              <ReviewBody>
                <Title>{review.summary}</Title>
                <br></br>
                <Desciption>{this.getMoreText(review.body)}
                  <br></br>
                  <div>{showButton}</div>
                </Desciption>
              </ReviewBody>
              <Photos>
                {review.photos ? review.photos.map((photo) => (
                <IndividualPhotos key={photo.id} src={photo.url} ></IndividualPhotos>
              )): null }
              </Photos>
              {/* Response: {review.response} */}
              <br></br>

              <Helpfulness>Helpful? <u>Yes</u>({review.helpfulness}) | <u>No</u></Helpfulness>

            </IndividualReview>
          )) : null }
        </ReviewList>

        <WrapperFooter>
          <MoreReviewsButton>
            <button onClick={() => this.moreReviews()}>MORE REVIEWS</button>
          </MoreReviewsButton>

          <AddReviewButton>
            <button> ADD A REVIEW &nbsp;&nbsp; +</button>
          </AddReviewButton>
        </WrapperFooter>

      </RightWrapper>
    )
  }
}


const RightWrapper = styled.div`
  width: 100%;
  height: 100%;
`;

const WrapperHeader = styled.div`
`;

const ReviewList = styled.div`

`;

const IndividualReview = styled.div`
  margin-top: 25px;
  padding-bottom:25px;
  padding-top: 20px;
  border-bottom: 1px solid black;
`;

const Photos = styled.div`
  padding-top: 25px;
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
font-size: 20px;
overflow: hidden;
white-space: nowrap;
text-overflow: ellipsis;
`;

const Desciption = styled.div`
`;

const Helpfulness = styled.div`
  margin-top: 40px;
`;

const Rating = styled.div`
float: left;
`;

const TimeStamp = styled.div`
float: right;
`;

const WrapperFooter = styled.div`
`;

const MoreReviewsButton = styled.div`
`;

const AddReviewButton = styled.div`
`;



export default Reviews;