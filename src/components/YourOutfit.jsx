import React from "react";
import styled from "styled-components";
import requests from "../lib/axiosPrefilter.js";
import axios from "axios";
import OutFitCreater from './OutFitCreater'
class YourOutfit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

      outfit: []
    };
     this.createDivs = this.createDivs.bind(this);
  }
  createDivs() {

  this.setState({
  outfit: this.state.outfit.concat(<OutFitCreater/>)
    // or {AnimatedDiv} or {new AnimatedDiv}, depends on how AnimatedDiv is written
    // I don't know, I haven't been using React as much lately, give me some slack

  });
  // this.props.create
  console.log(this.state)
}
  // renderYourOutift(id) {
  //   axios.get(requests.pullProducts)
  //     .then((allProducts) => {
  //       allProducts.data.map((oneProduct) => {
  //         if (oneProduct.id === id) {
  //           this.setState({
  //             renderProduct: oneProduct,
  //           });
  //         }
  //       });
  //     })
  //     .catch((error) => {
  //       console.error("Error pulling products: ", error);
  //     });
  //   axios.get(`${requests.pullProducts}/${id}/styles`)
  //     .then((img)=>{
  //       this.setState({
  //         imageUrl: img.data.results[0].photos[0].thumbnail_url
  //       })
  //     })
  //     this.setState({
  //       toggle: !this.state.toggle
  //     })

  // }

  render() {

 console.log(this.state)

    return (
      <div>
      <button onClick={this.createDivs}>Add Outfit</button>


      {this.state.outfit.map((box, index) =>

        <Wrapper key={index}>

        {box}

      </Wrapper>
      )}


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

export default YourOutfit;
