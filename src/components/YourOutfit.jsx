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
     this.handleDelete= this.handleDelete.bind(this)
  }
  createDivs() {

  this.setState({



  outfit: this.state.outfit.concat(<OutFitCreater productId={this.props.productId} stars={this.props.starData}/>)
  });

  }

  handleDelete(e){

     var myobj = document.getElementById(e.target.id);
    myobj.remove();


  }


  render() {



    return (
      <div>
        <br/><br/>

        <i  style={{marginLeft: '10%', padding: '5px'}} onClick={this.createDivs} className="fas fa-plus-circle"><h5 style={{marginRight: '20%', paddingRight: '15px'}}>Add To Outfit</h5></i>



      {this.state.outfit.map((box, index) =>

        <Wrapper key={index} id={index}>

<i id={index} onClick={this.handleDelete} className="fas fa-trash-alt"></i>


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
