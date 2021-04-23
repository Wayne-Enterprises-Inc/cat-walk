import React from "react";
import styled from "styled-components";
import CompareModal from "./CompareModal";
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
        <h4>Related Items</h4>
        <CompareModal
          nameForCompare={this.state.nameCompare}
          allProducts={this.props.allProducts}
          onClose={this.showModal}
          show={this.state.show}
        />
        <div onClick={(e) => this.showModal(e)}>
          {this.props.productCardImg.map((el, index) => {
            return (
              <Wrapper key={index}>
                <Card>
                <img style={{width: "200px", height: '200px' }}  src={el.thumbnail_url}  alt='Clothes Picture' />
                </Card>
              </Wrapper>
            );
          })}
          <br />
          {this.props.productCard.map((single, index) => {
            return <Wrapper key={index}>{single}</Wrapper>;
          })}
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

export default RelatedItemsCarousel;