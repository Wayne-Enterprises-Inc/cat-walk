import React, { useState } from "react";
import styled from "styled-components";
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from "react-icons/fa";

const Carousel = ({ slides, cards, onClick, show }) => {
  const [current, setCurrent] = useState(0);
  const length = slides.length;


  const onClose = (e) => {
    show = false;
  }
  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  if (!Array.isArray(slides) || slides.length <= 0) {
    return null;
  }

  console.log('PROPS', onClick);

  return (
    <div>
      <section className="slider">
        <LeftArrow>
          <FaArrowAltCircleLeft style={{marginLeft: '250px'}} className="left-arrow" onClick={prevSlide} />
        </LeftArrow>
        <RightArrow>
          <FaArrowAltCircleRight style={{marginRight: '300px'}} className="right-arrow" onClick={nextSlide} />
        </RightArrow>
        {slides.map((slide, index) => {
          return (
            <Wrapper key={index}>
              <div>
                <div className={index === current ? "slide active" : "slide"}>
                  {index === current && (
                    <img
                      style={{ width: "200px", height: "200px" }}
                      src={slide.thumbnail_url}
                      alt="clothes picture"
                    />
                  )}
                </div>
                <div className={index === current ? "slide active" : "slide"}>
                  {index === current + 1 && (
                    <img
                      style={{ width: "200px", height: "200px" }}
                      src={slide.thumbnail_url}
                      alt="clothes picture"
                    />
                  )}
                </div>
                <div className={index === current ? "slide active" : "slide"}>
                  {index === current + 2 && (
                    <img
                      style={{ width: "200px", height: "200px" }}
                      src={slide.thumbnail_url}
                      alt="clothes picture"
                    />
                  )}
                </div>
              </div>
            </Wrapper>
          );
        })}
      </section>
      <section onClick={onClick}className="card-slider">
        {cards.map((card, index) => {
          return (
            <Wrapper key={index}>
              <div className={index === current ? "slide active" : "slide"}>
                {index === current && card}
              </div>
              <div className={index === current ? "slide active" : "slide"}>
                {index === current + 1 && card}
              </div>
              <div className={index === current ? "slide active" : "slide"}>
                {index === current + 2 && card}
              </div>

            </Wrapper>
          );
        })}
      </section>
    </div>
  );
};
const RightArrow = styled.section`
  position: absolute;
  top: 50%;
  right: 32px;
  font-size: 1rem;
  z-index: 10;

`;
const LeftArrow = styled.section`
  position: absolute;
  top: 50%;
  left: 32px;
  font-size: 1rem;
  z-index: 10;
`;
const Wrapper = styled.section`
  display: inline-block;

  width: 200px;
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