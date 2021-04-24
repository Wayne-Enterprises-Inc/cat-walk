import React from "react";
import styled from "styled-components";
import requests from "../lib/axiosPrefilter.js";
import axios from "axios";
class OutFitCreater extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toggle: false,
      renderId: 19091,
      renderProduct: {},
      img: '',
      starData: 0
    };
    this.renderYourOutift = this.renderYourOutift.bind(this);
    this.starRender = this.starRender.bind(this)
  }


  renderYourOutift(id) {
    axios.get(requests.pullProducts)
      .then((allProducts) => {
        allProducts.data.map((oneProduct) => {
          if (oneProduct.id === id) {
            this.setState({
              renderProduct: oneProduct,
            });
          }
        });
      })
      .catch((error) => {
        console.error("Error pulling products: ", error);
      });
    axios.get(`${requests.pullProducts}/${id}/styles`)
      .then((img)=>{
        this.setState({
          imageUrl: img.data.results[0].photos[0].thumbnail_url
        })
      })
      this.setState({
        toggle: !this.state.toggle
      })

      this.starRender(this.props.stars)

  }
  starRender(prevProps) {
    let updatedData = this.props.stars
    if (prevProps.stars !== updatedData) {
      this.setState({
        starData: updatedData
      }, () => {
        console.log('OUTHERE IS THE STAR DATA YOU WILL NEED', this.state.starData)
      })
    }
  }

  render() {
console.log(this.props)

    var outfitImg = (
      <Wrapper>
        <Card>
          <img  src ={this.state.imageUrl}  alt='Clothes Picture' width="283"/>
          <span>{this.state.renderProduct.name}</span>
          <br />
          <span>{this.state.renderProduct.category}</span>
          <br />
          <span>{this.state.renderProduct.default_price}</span>
          <span>
              <StarsOuter>

              <StarsInner starsPercent={this.state.starData}>


              </StarsInner>
              </StarsOuter>
              </span>
          <br />
        </Card>
      </Wrapper>
    );



    // })

    //)

    return (
      <div>
        <h4 onClick={(e) => this.renderYourOutift(this.state.renderId)}>
          Your Outfit
        </h4>
        <div>
        {this.state.toggle ? outfitImg : ""}
        </div>
      </div>
    );
  }
}

const Card = styled.section`
  text-align: left;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;

  width: 268px;

  padding: 2px 16px;
`;
const Wrapper = styled.section`
  display: inline-block;
  margin-right: 10px;
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

export default OutFitCreater;
