import React from 'react';
import styled from 'styled-components';

import StyleSelect from './StyleSelect.jsx';

const ProductInfo = (props) => {
  //console.log('productInfo: ',props.productInfo)

  if (props.selectedStyle) {
    return (
      <StyledInfo>
        <div style={{
          width: "300px",
          padding: "10px"
          }}>
            <Ratings>
            <StarsOuter>
              <StarsInner starsPercent={props.starData}></StarsInner>
            </StarsOuter>
          </Ratings>
          <div>
            Read all reviews
        </div>
          <h5>{props.productInfo.category}:</h5>
          <h2>{props.productInfo.name}</h2>
          <h3>{props.styles.map((style) => {
            if (style.style_id === Number(props.selectedStyle)) {
              if (style.sale_price !== null) {
                return (
                  <div>
                    <a key={style.style_id}>Now ${style.sale_price}</a>
                    <br />
                    <OriginalPrice key={Number(style.style_id) + 1}>Was ${style.original_price}</OriginalPrice>
                  </div>
                )
              } else {
                return `$${(style.original_price)}`
              }
            }
          })}</h3>
          <h2>Style > {props.styles.map((style) => {
            if (style.style_id === Number(props.selectedStyle)) {
              return (style.name);
            }
          })}</h2>
          <StyleSelect
            styleSelectHandle={props.styleSelectHandle}
            styles={props.styles}
            stylePics={props.stylePics}
            selectedStyle={props.selectedStyle}
          />
        </div>
      </StyledInfo>
    )
  } else {

    return (
      <div>loading...</div>
    )
  }
}

const StyledInfo = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px
  height: 200px;
`
const StyledStyleSelector = styled.div`
  display: flex;
  order: 1
`

const OriginalPrice = styled.p`
  text-decoration: line-through;
`
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

export default ProductInfo;
