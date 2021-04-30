import React from 'react';
import axios from 'axios';
import requests from '../../lib/axiosPrefilter.js';
import styled from 'styled-components';
import SortedBy from './SortedBy.jsx'
import moment from 'moment';
import WriteAReview from './WriteAReview.jsx'



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
      starPercentage: null,
      showModal: false,
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
    this.displayStars = this.displayStars.bind(this);
    this.setShowModal = this.setShowModal.bind(this);





  }

  setShowModal(e) {
    this.setState({
      showModal: !this.state.showModal
    }, () => {console.log(this.state.showModal)})
  }


  textToggle() {
    this.setState({ isOpen: !this.state.isOpen })
  }


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
    let updatedProduct = this.props.id
    if (prevProps.totalReviews !== updatedData) {
      this.setState({
        count: updatedData || 5,
      }, () => {
        this.getReviews();
      })
    }

    if (prevProps.id !== updatedProduct) {
      this.setState({
        product_id: updatedProduct,
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

  displayStars(rating) {
    console.log('here')
    const starsTotal = 5;
    //Gives percentage of reviews based on a 5 star count
    const starPercentage = (rating / starsTotal) * 100;
    //Rounds percentage so each Star is worth "20%" and each quarter will be at ex: 0%(empty), 5%(quarter), 10%(half), 15%(3/4), 20%(filled star)
    const starPercentageRounded = `${Math.round(starPercentage/5) * 5}%`
    this.setState({
      starPercentage: starPercentageRounded,
    }, () => console.log(this.state.starPercentage))
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
                <Rating>
                  <StarsOuter>
                    <StarsInner starsPercent={this.state.starPercentage ? this.displayStars(review.rating) : null}></StarsInner>
                  </StarsOuter>
                </Rating>
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

          <AddReview >
            <AddReviewButton>
                <button id='ReviewID' onClick={e => {this.setShowModal(e);}}> ADD A REVIEW &nbsp;&nbsp; +</button>
            </AddReviewButton>
            <WriteAReview className='WriteReview' onClose = {this.setShowModal} showModal={this.state.showModal} characteristics={this.props.characteristics} />
          </AddReview>
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
  max-height: 600px;
  overflow-y: scroll;
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

const TimeStamp = styled.div`
float: right;
`;

const WrapperFooter = styled.div`
  margin-top:25px;
  display: flex;
  justify-content: space-around;
`;

const MoreReviewsButton = styled.div`
  height: 40px;
  width: 100px;
  background-color: LightGray;
  top: 40px;
  left: 20px;
  order: 3;
  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
  font-size: 16px;
`;

const AddReview = styled.div`
`;

const AddReviewButton = styled.div`
  height: 40px;
  width: 100px;
  background-color: LightGray;
  top: 40px;
  left: 20px;
  order: 3;
  &:hover {
    cursor: pointer;
    text-decoration: underline;
  }
  font-size: 16px;
`;





export default Reviews;