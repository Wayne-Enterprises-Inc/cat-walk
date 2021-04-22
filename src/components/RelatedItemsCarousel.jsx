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

showModal(e) {


  this.setState({
    nameCompare: e.target.innerHTML,
    show: !this.state.show
  });
}
render() {


  return (
    <div>

Related Items
 <CompareModal nameForCompare = {this.state.nameCompare} allProducts={this.props.allProducts} onClose={this.showModal} show={this.state.show}/>
<carouselContainer>

    <div className="carousel-container">
      <carouselWarpper>

      <div className='carousel-wrapper'>
      <button className="left-arrow">
        &lt;
    </button>
        <carouselContentWrapper>

        <div className='carousel-content-wrapper'>
          <carouselContent>
          <button className="right-arrow">
        &gt;
    </button>
          <div  onClick={((e) =>
      this.showModal(e))
 }className='carousel-content'>



   {this.props.productCardImg}<br/>
   {this.props.productCard [0]}
   {this.props.productCard [1]}
   {this.props.productCard [2]}
   {this.props.productCard [3]}
   {this.props.productCard [4]}
   {this.props.productCard [5]}
   {this.props.productCard [6]}
          </div>
          </carouselContent>
        </div>
      </carouselContentWrapper>
   </div>
    </carouselWarpper>
   </div>
</carouselContainer>
   </div>
  );
}
};
const carouselContainer = styled.section`
width: 100%;
    display: flex;
    flex-direction: column;
`;
const carouselWarpper = styled.section`
display: flex;
    width: 100%;
    position: relative;
`;
const carouselContentWrapper = styled.section`
overflow: hidden;
    width: 100%;
    height: 100%;
`;
const carouselContent = styled.section`
display: flex;
transition: all 250ms linear;
-ms-overflow-style: none;
scrollbar-width: none;
`;

export default RelatedItemsCarousel ;