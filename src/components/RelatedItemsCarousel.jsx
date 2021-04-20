import React from 'react';
import styled from 'styled-components';
const RelatedItemsCarousel = (props) => {
  console.log('Admin props', props);
//   const Car = styled.section`
//   display: flex;
//   max-width: 57rem;
//   overflow-y: auto;
// `;
  return (
    <div>


    <div>

   {props.productCardImg}<br/>



   {props.productCard [0]}
   {props.productCard [1]}
   {props.productCard [2]}
   {props.productCard [3]}
   {props.productCard [4]}
   {props.productCard [5]}
   {props.productCard [6]}
   </div>

   </div>
  );
};


export default RelatedItemsCarousel ;