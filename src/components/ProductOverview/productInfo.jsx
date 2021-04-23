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


export default ProductInfo;
