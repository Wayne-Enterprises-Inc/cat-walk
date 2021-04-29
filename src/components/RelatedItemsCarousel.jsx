import React from "react";
import styled from "styled-components";
import CompareModal from "./CompareModal";
import Carousel from "./Carousel"
class RelatedItemsCarousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      nameCompare: "",
    };
    this.showModal = this.showModal.bind(this);
  }

  showModal(e) {

    this.setState({
      nameCompare: e.target.innerHTML,
      show: !this.state.show,
    });
  }
  render() {


    return (
      <div>
        <h4 style={{marginLeft: '10%'}}>Related Items</h4>
        <div>

        <CompareModal
        cards={this.props.productCard}
        modalId={this.props.modalId}
        nameForCompare={this.state.nameCompare}
        allProducts={this.props.allProducts}
        onClose={this.showModal}
        show={this.state.show}
        modalName={this.props.modalName}
          modalFeature1={this.props.modalFeature1}
          modalFeature2={this.props.modalFeature2}
          oModalName={this.props.oModalName}
          oModalFeature1={this.props.oModalFeature1}
          oModalFeature2={this.props.oModalFeature2}
        />
        </div>

        {/* click modal replace */}
        <div >
          <Line>
        <div style={{ marginLeft: '25%', marginRight: '25%'}} >

        <Carousel getId={this.props.getId} show={this.state.show} onClick={(e) => this.showModal(e)} slides={this.props.productCardImg} cards={this.props.productCard}/>
        </div>
        </Line>
        </div>

      </div>
    );
  }
}


const Card = styled.section`
  text-align: left;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  width: 200px;
  padding: 2px 16px;
`;
const Wrapper = styled.section`
  display: inline-block;
  margin-right: 10px;
`;
const Line = styled.section`
border-bottom: 1px solid black
`;




export default RelatedItemsCarousel;

/* <div onClick={(e) => this.showModal(e)}>
{this.props.productCardImg.map((el, index) => {
  return (
    <Wrapper key={index}>
      <Card>
      <img style={{width: "200px", height: '200px' }}  src={el.thumbnail_url}  alt='Clothes Picture' />
      </Card>
    </Wrapper>
  );
})}
</div>
<br />
{this.props.productCard.map((single, index) => {
  return (

  <Wrapper key={index}>{single}</Wrapper>


  )
})} */