import React from 'react';
import axios from 'axios';
import styled from 'styled-components';

class Gallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      productPics: '',//this.props.productPics[0],
      expand: false
    }
    //bindings

  }
  //functions/handlers




  //in the render: map through images
  render() {
    return (
      <MainImage>
        {this.state.productPics}
      </MainImage>
    )
  }

}

const MainImage = styled.div`
  position: relative;
  width: 600px;
  height: 600px;
  border-radius: 10px;
`

export default Gallery;