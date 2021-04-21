import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import requests from '../../lib/axiosPrefilter.js';

import Gallery from './Gallery.jsx'
import StyleSelect from './StyleSelect.jsx';

class Overview extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentItemId: 19089,
      selectedStyle: 103466,
      productInfo: {},
      mainPics: [],
      thumbnails: [],
      styles: [],
      stylePics: [],
      reviewCount: 0,
    };
    //bindings go here
    this.getStyles = this.getStyles.bind(this);
    this.getPhotos = this.getPhotos.bind(this);
    this.getProductInfo = this.getProductInfo.bind(this);

    this.styleSelectHandle = this.styleSelectHandle.bind(this);
  }
  //hander functions go here.


  styleSelectHandle(event) {
    if (this.selectedStyle !== '') {
      console.log('event: ', event)
      this.setState({
        selectedStyle: ''
      }, () => {
        this.setState({
          selectedStyle: event.target.attributes.value.nodeValue
        })
      })
    } else {
      this.setState({
        selectedStyle: event.target.attributes.value.nodeValue
      })
    }
  }

  getProductInfo(id) {
    axios.get(requests.pullProducts + `/${id}`)
      .then(data => {
        this.setState({
          productInfo: data.data,
        }, () => console.log('Product Info: ', data.data));
      })
      .catch((err) => {
        console.error('Error getting product info', err);
      });
  }

  getStyles(id) {

    axios.get(requests.pullProducts + `/${id}/styles`)
      .then(styles => {
        this.setState({
          styles: styles.data.results
        }, () => { this.getPhotos(this.state.styles) })
      })
      .catch(err => {
        console.error('Overview get error: ', err);
      })
  }

  getPhotos(styles) {
    let mainPics = [];
    let thumbnails = [];
    //let stylePics = [];
    //console.log('STYLES: ', styles)
    if (styles !== undefined) {
      //console.log('STYLES: ', styles)
      for (let i = 0; i < styles.length; i++) {
        let pics = styles[i].photos[0].url;
        let thumbs = [styles[i].photos, styles[i].style_id];
        //let styles = [styles[i].photos[0].thumbnail_url, styles[i].style_id];
        mainPics.push(pics);
        thumbnails.push(thumbs);
        //stylePics.push(styles);
      }
      //console.log('THUMBNAILS',thumbnails);
      this.setState({
        mainPics: mainPics,
        thumbnails: thumbnails,
        // stylePics: stylePics
      }, () => { console.log('Product State: ', this.state) })
    }
  }

  componentDidMount() {
    this.getStyles(this.state.currentItemId)
    this.getProductInfo(this.state.currentItemId)
  }


  render() {
    return (
      <Container>
        <Images>
          <Gallery
            styles={this.state.styles}
            mainPics={this.state.mainPics}
            thumbnails={this.state.thumbnails}
            selectedStyle={this.state.selectedStyle}
            styleSelectHandle={this.styleSelectHandle}
          />
        </Images>
        <div>
          <StyleSelect
            styleSelectHandle={this.styleSelectHandle}
            styles={this.state.styles}
            stylePics={this.state.stylePics}
            selectedStyle={this.state.selectedStyle}
          />
        </div>
      </Container>

    )
  }
}

const Container = styled.div`
  padding-top: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid black;
`;

const Images = styled.div`
  display: flex;
  order: 1;
  flex-grow: 1;
`

export default Overview;