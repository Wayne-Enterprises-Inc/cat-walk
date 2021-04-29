import React from 'react';
import styled from 'styled-components';

function WriteAReview ({showModal, setShowModal, onClose}) {

  function close(e) {
    onClose && onClose(e);
  }

  (console.log(showModal));



  let containerStyle;
  let radioText = 'Pick a rating';

  if(!showModal) {
    containerStyle = {
      display: 'none',
    }
    return null;
  }

  if(showModal) {
    containerStyle = {
      display: 'block',
    }
  }

  function changeResultsText() {
    if(document.getElementById('5-stars').checked) {
      document.getElementById('results').innerHTML = 'Hi'
    }
  }



  return (
    <Container style = {containerStyle}>
        <Content>
          <Header>
            <Title>Hey There!</Title>
            <Body>
              <Rating>
                <StarRating>
                  <div id="results"></div>
                  <input type="radio" id="5-stars" name="rating" value="5" onChange={changeResultsText()}/>
                  <label htmlFor="5-stars" className="star"></label>
                  <input type="radio" id="4-stars" name="rating" value="4" />
                  <label htmlFor="4-stars" className="star"></label>
                  <input type="radio" id="3-stars" name="rating" value="3" />
                  <label htmlFor="3-stars" className="star"></label>
                  <input type="radio" id="2-stars" name="rating" value="2" />
                  <label htmlFor="2-stars" className="star"></label>
                  <input type="radio" id="1-star" name="rating" value="1" />
                  <label htmlFor="1-star" className="star"></label>
                </StarRating>
              </Rating>
              <Recommend>Recommend</Recommend>
              <Characteristics>Characteristics</Characteristics>
              <ReviewTitle>ReviewTitle</ReviewTitle>
              <ReviewBody>ReviewBody</ReviewBody>
              <Photos>Photos</Photos>
              <Nickname>Nickname</Nickname>
            </Body>
          </Header>
        <Footer>
          <Exit>
            <Buttons onClick={close}> Exit </Buttons>
            <Buttons>Submit</Buttons>
          </Exit>
        </Footer>
      </Content>
    </Container>
  )
}


const Container = styled.div`
  display: none; /* Hidden by default */
  position: fixed; /* Stay in place */
  z-index: 50; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0,0,0); /* Fallback color */
  background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
`;

const Content = styled.div`
  background-color: #fefefe;
  margin: 15% auto; /* 15% from the top and centered */
  padding: 20px;
  border: 1px solid #888;
  width: 40%; /* Could be more or less, depending on screen size */
`;

const Header = styled.div`
`;

const Title = styled.div`
  text-align: center;
  margin-bottom: 25px;
  border-bottom: 1px solid black;
`;

const Body = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
  gap: 0px 0px;
  grid-template-areas:
    "Ratings"
    "Recommend"
    "Characteristics"
    "ReviewTitle"
    "ReviewBody"
    "ReviewBody"
    "Photos"
    "Nickname";
`;

const Rating = styled.div`
  grid-area: 'Ratings';
`;

const StarRating = styled.div`
  border:solid 1px #ccc;
  display:flex;
  flex-direction: row-reverse;
  font-size:1.5em;
  justify-content:space-around;
  padding:0 .2em;
  text-align:center;
  width:5em;

  input {
    display:none;

    &:checked ~ label {
      color:#f90;
    }
  };


  label {
    color:#ccc;
    cursor:pointer;

    &:before {
    content: '\f005';
    font-family: 'Font Awesome 5 Free';
    font-weight: 900;
    }

    &:hover {
      color:#fc0;
    }

    &:hover ~ label {
      color:#fc0;
    }
  };
`;

const Recommend = styled.div`
  grid-area: 'Recommend';
`;

const Characteristics = styled.div`
  grid-area: 'Characteristics';
`;

const ReviewTitle = styled.div`
  grid-area: 'ReviewTitle';
`;

const ReviewBody = styled.div`
  grid-area: 'ReviewBody';
  background:green;
`;

const Photos = styled.div`
  grid-area: 'Photos';
`;

const Nickname = styled.div`
  grid-area: 'Nickname';
`;

const Footer = styled.div`
`;

const Exit = styled.div`

`;

const Buttons = styled.div`
  color: #aaa;
  float: right;
  font-size: 14px;
  font-weight: bold;
  display: inline-block;
  margin-left: 25px;
    &:hover,
    &:focus {
    color: black;
    text-decoration: none;
    cursor: pointer;
    }
`;


export default WriteAReview;