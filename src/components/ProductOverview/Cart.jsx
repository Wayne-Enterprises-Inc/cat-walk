
import React from 'react';
import styled from 'styled-components';

const stockArray = (totalStock) => {

  if (totalStock === 0) {
    console.log('Out of Stock')
    return 'Out of Stock';
  } else {
    var numbers = [];
    var currentstock = totalStock;
    for (var i = 1; i < totalStock; i++) {
      numbers.push(i);
    }
    return numbers
  }
}

const Cart = (props) => {
  if (props.selected) {

    let Skus = [];
    let allSizes = {};
    let totalStock;
    let quantity;
    for (let i = 0; i < props.styles.length; i++) {
      if (props.styles[i].style_id === Number(props.selected)) {
        Skus = props.styles[i].skus;
      }
      for (let key in Skus) {
        allSizes[key] = Skus[key].size
      }
    }

    if (props.selectedSize) {
      totalStock = Skus[Number(props.selectedSize)].quantity;
    }

    return (
      <div>
        <form>
          <SizeStyles onChange={props.sizeSelectHandle}>
            <option>Select a Size</option>
            {Object.keys(allSizes).map(sizeId => {
              return (
                <option
                  name={allSizes[sizeId]}
                  key={sizeId}
                  value={sizeId}
                >
                  {allSizes[sizeId]}
                </option>
              )
            })}
          </SizeStyles>

          <QuantityStyles>
            <option>
              Qty: 0
              </option>
            {stockArray(totalStock).map((quantity, index) => {
              return (
                <option
                  key={index}
                  value={quantity}
                >
                  {quantity}
                </option>
              )
            })}
          </QuantityStyles>

          <br></br>
          <CartStyles>Add to Cart</CartStyles>
        </form>
      </div>
    )
  } else {
    return (
      <div>Loading...</div>
    )
  }
};

const CartStyles = styled.button`
position: relative;
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
`
const SizeStyles = styled.select`

  position: relative;
  height: 40px;
  width: 100px;
  top: 25px;
  left: 20px;
  background-color: LightGray;
  color: black;
  order: 1;
`
const QuantityStyles = styled.select`
  position: relative;
  height: 40px;
  width: 50px;
  top: 25px;
  left: 40px;
  background-color: LightGray;
  color: black;
  order: 2;
`

export default Cart;