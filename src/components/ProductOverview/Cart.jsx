
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
          <select onChange={props.sizeSelectHandle}>
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
          </select>

          <select>
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
          </select>

          <br></br>
          <button>Add to Cart</button>
        </form>
      </div>
    )
  } else {
    return (
      <div>Loading...</div>
    )
  }
};

export default Cart;