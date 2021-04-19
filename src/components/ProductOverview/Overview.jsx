import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import requests from '../../lib/axiosPrefilter.js';

import Gallery from './Gallery.jsx'


class Overview extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentItemId: 19089,
      productInfo: {},
      mainPics: [],
      thumbnails: [],
      styles: [],
      reviewCount: 0,
      productPics: this.props.productPics,
    };
    //bindings go here
    this.getStyles = this.getStyles.bind(this);
    this.getPhotos = this.getPhotos.bind(this);
  }
  //hander functions go here.





  getStyles(id) {
    axios.get(requests.pullProducts+`/${id}/styles`)
      .then(styles => {
        this.setState({
          styles: styles.data.results
        }, ()=>{this.getPhotos(this.state.styles)})
      })
      .catch((err) => {
        console.error(err);
      })
  }

  getPhotos(styles) {
    let mainPics = [];
    let thumbnails = [];

    if (styles !== undefined) {

      for (let i = 0; i < styles.length; i++) {
        let pics = styles[i].photos[0].url;
        let thumbs = [styles[i].photos[0].thumbnail_url, styles[i].style_id];
        mainPics.push(pics);
        thumbnails.push(thumbs);
      }

      this.setState({
        mainPics: mainPics,
        thumbnails: thumbnails
      }, () => {console.log('Product State: ', this.state)})
    }
  }

componentDidMount(){
  this.getStyles(this.state.currentItemId)
}


  render() {
    return (
      <Container>
        <div>
          <Gallery
            productPics={this.state.productPics}
          />
        </div>
      </Container>

    )
  }
}

const Container = styled.div`
  width: 100%;
  border-bottom: 1px solid #ebedee;
`;

export default Overview;