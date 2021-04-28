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
    // this.handleDelete= this.handleDelete.bind(this)
  }


  renderYourOutift(id) {

    axios.get(requests.pullProducts)
      .then((allProducts) => {
        allProducts.data.map((oneProduct) => {

          if (Number(oneProduct.id) === Number(id)) {
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
  // handleDelete(e){

  //   var myobj = document.getElementById('trash');
  // // var mydiv = document.getElementById('trash');
  // //  console.log(mydiv)
  // //  while (mydiv.firstChild) {
  // //    mydiv.removeChild(mydiv.firstChild);
  // //  }

  //   // thingToRemove.parentNode.removeChild(thingToRemove);
  //   var myobj1 = document.getElementById('trash-title');
  //   var myobj2 = document.getElementById('trash-click');


  //    myobj.remove();
  //    myobj1.remove();
  //    myobj2.remove();



  // }



  render() {


    var outfitImg = (

      <Wrapper >
        <Card id='trash'>

          <img style={{ height: "200px" }}  src ={this.state.imageUrl}  alt='Clothes Picture' width="283"/>
          <span >{this.state.renderProduct.name}</span>
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
    console.log('props', this.state.toggle)
      var cts = "Click To Show"
      var ctd = (

          'Click Trash To Delete'
      )
    return (

      <div>
        <h4 id='trash-title' onClick={(e) =>  this.renderYourOutift(this.props.productId)}>
          {!this.state.toggle ? cts : ctd}

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
