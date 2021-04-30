import React, {useState, useEffect} from 'react';
import styled from 'styled-components';

function WriteAReview ({showModal, onClose, characteristics}) {

  function close(e) {
    onClose && onClose(e);
  }

  const [RatingText, setRatingText] = useState('Pick A Rating!');
  const [SizeS, setSize] = useState('')
  const [WidthS, setWidth] = useState('')
  const [ComfortS, setComfort] = useState('')
  const [QualityS, setQuality] = useState('')
  const [LengthS, setLength] = useState('')
  const [FitS, setFit] = useState('')
  const [TitleMessage, setTitleMessage] = useState('');
  const [name, setName] = useState('');
  const [selectedFile, setselectedFile] = useState(null);


  function SizeOptions(value) {
        switch (value.value) {
      case '1':
        setSize('A size too small')
        break;
      case '2':
        setSize('½ a size too small')
        break;
      case '3':
        setSize('Perfect')
        break;
      case '4':
        setSize('½ a size too big')
        break;
      case '5':
        setSize('A size too wide')
        break;
    }
}

  function WidthOptions(value) {
        switch (value.value) {
      case '1':
        setWidth('Too narrow')
        break;
      case '2':
        setWidth('Slightly narrow')
        break;
      case '3':
        setWidth('Perfect')
        break;
      case '4':
        setWidth('Slightly wide')
        break;
      case '5':
        setWidth('Too wide')
        break;
    }
 }

  function ComfortOptions(value) {
        switch (value.value) {
      case '1':
        setComfort('Uncomfortable')
        break;
      case '2':
        setComfort('Slightly uncomfortable')
        break;
      case '3':
        setComfort('Ok')
        break;
      case '4':
        setComfort('Comfortable')
        break;
      case '5':
        setComfort('Perfect')
        break;
    }

  }

  function QualityOptions(value) {
        switch (value.value) {
      case '1':
        setQuality('Poor')
        break;
      case '2':
        setQuality('Below average')
        break;
      case '3':
        setQuality('What I expected')
        break;
      case '4':
        setQuality('Pretty great')
        break;
      case '5':
        setQuality('Perfect')
        break;
    }

  }

  function LengthOptions(value) {
    switch (value.value) {
      case '1':
        setLength('Runs Short')
        break;
      case '2':
        setLength('Runs slightly short')
        break;
      case '3':
        setLength('Perfect')
        break;
      case '4':
        setLength('Runs slightly long')
        break;
      case '5':
        setLength('Runs long')
        break;
    }

  }

  function FitOptions(value) {
    switch (value.value) {
      case '1':
        setFit('Runs Tight')
        break;
      case '2':
        setFit('Runs slightly tight')
        break;
      case '3':
        setFit('Perfect')
        break;
      case '4':
        setFit('Runs slightly long')
        break;
      case '5':
        setFit('Runs long')
        break;
    }

  }

  let functionOptions = {
    "Size": SizeOptions,
    "Width": WidthOptions,
    "Comfort": ComfortOptions,
    "Quality": QualityOptions,
    "Length": LengthOptions,
    "Fit": FitOptions,
  }

  let stateOptions = {
    "Size": SizeS,
    "Width": WidthS,
    "Comfort": ComfortS,
    "Quality": QualityS,
    "Length": LengthS,
    "Fit": FitS,
  }

  let charKeys;
  let containerStyle;
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

  if(characteristics) {
    charKeys = Object.keys(characteristics)
  }

  // function handleFileSelect(evt) {
  //   var files = evt.target.files;

  //   // Loop through the FileList and render image files as thumbnails.
  //   for (var i = 0, f; f = files[i]; i++) {

  //     // Only process image files.
  //     if (!f.type.match('image.*')) {
  //       continue;
  //     }

  //     var reader = new FileReader();

  //     // Closure to capture the file information.
  //     reader.onload = (function(theFile) {
  //       return function(e) {
  //         // Render thumbnail.
  //         var span = document.createElement('span');
  //         span.innerHTML =
  //         [
  //           '<img style="height: 75px; border: 1px solid #000; margin: 5px" src="',
  //           e.target.result,
  //           '" title="', escape(theFile.name),
  //           '"/>'
  //         ].join('');

  //         document.getElementById('list').insertBefore(span, null);
  //       };
  //     })(f);

  //     // Read in the image file as a data URL.
  //     reader.readAsDataURL(f);
  //   }
  // }

  // document.getElementById('files') ? document.getElementById('files').addEventListener('change', handleFileSelect, false) : null;

  // useEffect(() => {
  //   //   document.getElementById("files").onchange = function () {
  //       console.log(document.getElementById('files'))
  //   //
  //   }, []);

  function test(e) {
    document.getElementById('image').src=window.URL.createObjectURL(e.target.files[0])
  }




  return (
    <Container style = {containerStyle}>
        <Content>
          <Header>
            <Title>Hey There!</Title>
            <Body>
              <Rating>
                <StarRating>
                  <input type="radio" id="5-stars" name="rating" value="5" checked={RatingText === 'Great'} onChange={() => setRatingText('Great')}/>
                  <label htmlFor="5-stars" className="star"></label>
                  <input type="radio" id="4-stars" name="rating" value="4" checked={RatingText === 'Good'} onChange={() => setRatingText('Good')}/>
                  <label htmlFor="4-stars" className="star"></label>
                  <input type="radio" id="3-stars" name="rating" value="3" checked={RatingText === 'Average'} onChange={() => setRatingText('Average')}/>
                  <label htmlFor="3-stars" className="star"></label>
                  <input type="radio" id="2-stars" name="rating" value="2" checked={RatingText === 'Fair'} onChange={() => setRatingText('Fair')}/>
                  <label htmlFor="2-stars" className="star"></label>
                  <input type="radio" id="1-star" name="rating" value="1" checked={RatingText === 'Poor'} onChange={() => setRatingText('Poor')}/>
                  <label htmlFor="1-star" className="star"></label>
                </StarRating>
                <RatingTxt>{RatingText}</RatingTxt>
              </Rating>
              <Recommend>
                <label htmlFor="yes_no_radio"><p>Would you recommend this product?</p></label>
                <Yes>
                  <input type="radio" name="yes_no" ></input>
                  <p>Yes</p>
                </Yes>
                <No>
                  <input type="radio" name="yes_no"></input>
                  <p>No</p>
                </No>

              </Recommend>
              <Characteristics>
                {charKeys ? charKeys.map((characteristic, index) => (
                  <CharBody key={index}>
                    <Char>
                    <label htmlFor="yes_no_radio"><p>{characteristic.replace(/['"]+/g, '')}: {stateOptions[characteristic]}</p></label>

                    <input type="radio" key={index.characteristic} id={index.characteristic} name={index} value='1' onClick={() => functionOptions[characteristic](document.querySelector(`input[name = '${index}']:checked`))}></input>

                    <input type="radio" key={index.characteristic} id={index.characteristic} name={index} value='2' onClick={() => functionOptions[characteristic](document.querySelector(`input[name = '${index}']:checked`))}></input>

                    <input type="radio" key={index.characteristic} id={index.characteristic} name={index} value='3' onClick={() => functionOptions[characteristic](document.querySelector(`input[name = '${index}']:checked`))}></input>

                    <input type="radio" key={index.characteristic} id={index.characteristic} name={index} value='4' onClick={() => functionOptions[characteristic](document.querySelector(`input[name = '${index}']:checked`))}></input>

                    <input type="radio" key={index.characteristic} id={index.characteristic} name={index} value='5' onClick={() => functionOptions[characteristic](document.querySelector(`input[name = '${index}']:checked`))}></input>

                    </Char>
                  </CharBody>
                )) : null }
              </Characteristics>
              <ReviewTitle>
                <input type="text" value={TitleMessage} onChange={() => setTitleMessage()} placeholder="Example: Best purchase ever!"/>
              </ReviewTitle>
              <ReviewBody>
                <textarea value={TitleMessage} onChange={() => setTitleMessage()} placeholder="Why did you like the product or not?"/>
              </ReviewBody>
              <Photos >
                <form>
                  <input type="file" id="files" onChange={e => test(e)} multiple/>
                  <img id="image" />
                </form>
              </Photos>

              <Nickname>
                <input type="text" value={TitleMessage} onChange={() => setTitleMessage()} placeholder="Example: jackson11!"/>
              </Nickname>
              <Email>
                <input type="text" value={TitleMessage} onChange={() => setTitleMessage()} placeholder="Example: jackson11@email.com"/>
              </Email>
            </Body>
          </Header>
        <Footer>
          <Exit>
            <Buttons onClick={close}> Exit </Buttons>
            <Buttons onClick={close}>Submit</Buttons>
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
  width: 30%; /* Could be more or less, depending on screen size */
`;

const Header = styled.div`
`;

const Title = styled.div`
  text-align: center;
  margin-bottom: 30px;
  border-bottom: 1px solid black;
`;

const Body = styled.div`
`;

const Rating = styled.div`
  display:flex;
  margin-bottom:20px;
  align-content: center;
  align-items: center;
  justify-content: space-evenly;
`;

const RatingTxt = styled.div`

`;

const StarRating = styled.div`
  border:solid 1px #ccc;
  display:flex;
  flex-direction: row-reverse;
  font-size:1.5em;
  justify-content:space-around;
  padding:0 .2em;
  text-align:center;
  align-items: center;
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
  display: inline-block;

  p {
    margin: 0px;
  }

  margin-bottom: 20px;
`;

const Characteristics = styled.div`
  border-bottom: 1px solid black;
  margin-bottom: 20px;
  border-top: 1px solid black;

`;

const CharTitle = styled.div`
`;

const CharBody = styled.div`
`;

const Char = styled.div`
`;




const Yes = styled.div`
  p {
    display:inline-block;
  }
`;

const No = styled.div`
  p {
    display:inline-block;
  }
`;

const ReviewTitle = styled.div`
  margin-bottom: 5px;
  input {
    width: 100%;
  }
`;

const ReviewBody = styled.div`
  margin-bottom: 20px;

  textarea {
    width: 100%;
    resize: none;
    height: 150px;
  }
`;

const Photos = styled.div`
  grid-area: 'Photos';
  margin-bottom: 110px;

  form {
    img {
      display:none;
    }

    img[src] {
      display: block;
      height: 100px;
      width: 100px;
    }
  }

`;

const Nickname = styled.div`
  margin-bottom: 5px;
  input {
    width: 100%;
  }`;

const Email = styled.div`
  margin-bottom: 5px;
  input {
    width: 100%;
  }
`;

const Footer = styled.div`

`;

const Exit = styled.div`
`;

const Buttons = styled.div`
  color: #aaa;
  float: right;
  font-size: 20px;
  font-weight: bold;
  display: inline-block;
  margin-left: 25px;
  margin-bottom: 10px;
    &:hover,
    &:focus {
    color: black;
    text-decoration: none;
    cursor: pointer;
    }
`;


export default WriteAReview;