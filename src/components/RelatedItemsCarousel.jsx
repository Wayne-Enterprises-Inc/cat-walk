import React from 'react';
import styled from 'styled-components';
import CompareModal from "./CompareModal";
class RelatedItemsCarousel extends React.Component {
  constructor(props) {
    super (props);
    this.state = {
      show: false,
      nameCompare: ''

    }
    this.showModal = this.showModal.bind(this)
  }
  //console.log('Admin props', props);
//   const Car = styled.section`
//   display: flex;
//   max-width: 57rem;
//   overflow-y: auto;
// `;
showModal(e) {
console.log(this.props.productCard[0])
  this.setState({
    nameCompare: e.target.innerHTML,
    show: !this.state.show
  });
}
render() {


  return (
    <div onClick={((e) =>
      this.showModal(e))
 }>
 <CompareModal nameForCompare = {this.state.nameCompare} allProducts={this.props.allProducts} onClose={this.showModal} show={this.state.show}/>

    <div >

   {this.props.productCardImg}<br/>



   {this.props.productCard [0]}
   {this.props.productCard [1]}
   {this.props.productCard [2]}
   {this.props.productCard [3]}
   {this.props.productCard [4]}
   {this.props.productCard [5]}
   {this.props.productCard [6]}
   </div>

   </div>
  );
}
};


export default RelatedItemsCarousel ;