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

  // outfit: this.state.outfit.concat(<OutFitCreater/>)

  outfit: this.state.outfit.concat(<OutFitCreater stars={this.props.starData}/>)
  });


  // outfit: this.state.outfit.concat(<OutFitCreater stars={this.props.starData}/>)


  };
  // this.props.create


//}


  render() {



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
