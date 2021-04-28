import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from "react-icons/fa";

const Carousel = ({ slides, cards, onClick, show, getId }) => {
  const [current, setCurrent] = useState(0);
  const [showResultsRight, setShowResultsRight] = React.useState(true)
  const [showResultsLeft, setShowResultsLeft] = React.useState(true)
  const length = slides.length;

useEffect(()=>{
  console.log('Current', current)
})
  // const onClose = (e) => {
  //   show = false;
  // }
  const nextSlide = () => {

    setCurrent(current === length - 1 ? 0 : current + 1);
    console.log(current, length)
    console.log(showResultsRight)
    console.log(current === length -2)
    // current === length - 2 ?  setShowResultsRight(false) : setShowResultsRight(true)
    if(current === length-2){
      setShowResultsRight(false)
      }
      if(current === 0) {
        setShowResultsLeft(false)
      }
      // if(current !== length-2){
      //   setShowResultsRight(true)
      // }
  };


  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
    //console.log(showResultsRight)
    if(current !== length - 2){
      setShowResultsRight(true)
    }
    if(current === 1){
      setShowResultsLeft(true)
    }



  };

  if (!Array.isArray(slides) || slides.length <= 0) {
    return null;
  }



  return (
    <div style={{width: '100%'}} >

      <section style={{marginRight: '147px',
    marginLeft: '100px'}} className="slider">
        <LeftArrow onClick={prevSlide}>
          <div>

         {showResultsLeft ? null : <FaArrowAltCircleLeft style={{ marginLeft: '250px' }} className="left-arrow" />}


          </div>

        </LeftArrow>
        <RightArrow onClick={nextSlide}>

        {showResultsRight ? <FaArrowAltCircleRight style={{ marginRight: '300px' }} className="right-arrow" /> : null}

        </RightArrow>
        <div style={{display: 'flex', width: '100%', alignItems: 'center'}}>
        {slides.map((slide, index) => {
          // console.log('SLIDE', slide)

          return (

              <div key={index}>
                <div className={index === current ? "slide active" : "slide"}>
                  {index === current && (
                    <img onClick={getId}
                      style={{ width: "200px", height: "200px",
                    border: '1px solid black' }}
                      src={slide[0].thumbnail_url}
                      value={slide[1]}
                      alt="clothes picture"
                    />
                  )}
                </div>
                <div className={index === current ? "slide active" : "slide"}>
                  {index === current + 1 && (
                    <img
                      onClick={getId}
                      style={{ width: "200px", height: "200px",
                      border: '1px solid black'  }}
                      src={slide[0].thumbnail_url}
                      value={slide[1]}
                      alt="clothes picture"
                    />
                  )}
                </div>
                <div className={index === current ? "slide active" : "slide"}>
                  {index === current + 2 && (
                    <img
                      onClick={getId}
                      style={{ width: "200px", height: "200px",
                      border: '1px solid black'  }}
                      src={slide[0].thumbnail_url}
                      value={slide[1]}
                      alt="clothes picture"
                    />
                  )}
                </div>
              </div>

          );
        })}
        </div>
        <section style={{width: '100%', display: 'flex'}} onClick={onClick} className="card-slider">
        {cards.map((card, index) => {
          return (
            <div key={index}>
             {/* <Wrapper key={index}> */}
              <div style={{ alignItems: 'center'}} className={index === current ? "slide active" : "slide"}>
                {index === current && card}
              </div>
              <div  style={{ alignItems: 'center', paddingRight:'30px'}} className={index === current ? "slide active" : "slide"}>
                {index === current + 1 && card}
              </div>
              <div  style={{ alignItems: 'center'}} className={index === current ? "slide active" : "slide"}>
                {index === current + 2 && card}
              </div>
</div>

          );
        })}
      </section>
      </section>


      <br/><br/>
    </div>
  );
};
const RightArrow = styled.section`
  position: absolute;
  top: 60rem;
  right: 20px;
  font-size: 1rem;
  z-index: 10;

`;

const LeftArrow = styled.section`
  position: absolute;
  top: 60rem;
  left: 20px;
  font-size: 1rem;
  z-index: 10;
`;
const Wrapper = styled.section`
  display: flex;
  width: 100%;
`;


const Card = styled.section`
  display: inline-block;
  margin-right: 10px;
  text-align: left;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  width: 200px;
  padding: 2px 16px;
`;
export default Carousel;