import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import requests from '../../lib/axiosPrefilter.js';

import Gallery from './Gallery.jsx'
import StyleSelect from './StyleSelect.jsx';
import ProductInfo from './ProductInfo.jsx';
import Cart from './Cart.jsx';

class Overview extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentItemId: 19089,
      selectedStyle: 103466,
      selectedSize: 0,
      sizeId: '',
      selectedQuantity: 0,
      productInfo: {},
      mainPics: [],
      thumbnails: [],
      styles: [],
      stylePics: [],
      ratingCount: 0,
      rating: 0,
      starData: 0,
      disabled: true,
    };
    //bindings go here
    this.getStyles = this.getStyles.bind(this);
    this.getPhotos = this.getPhotos.bind(this);
    this.getProductInfo = this.getProductInfo.bind(this);
    // this.getReviewInfo = this.getReviewInfo.bind(this);

    this.styleSelectHandle = this.styleSelectHandle.bind(this);
    this.sizeSelectHandle = this.sizeSelectHandle.bind(this);
    this.handleDisable = this.handleDisable.bind(this);
    this.quantitySelect = this.quantitySelect.bind(this);
    this.parseReviews = this.parseReviews.bind(this);
  }
  //hander functions go here.

  // componentDidUpdate(prevProps) {
  //   let updatedData = this.props.starData
  //   if (prevProps.starData !== updatedData) {
  //     this.setState({
  //       starData: updatedData
  //     }, () => {
  //       console.log('HERE IS THE STAR DATA YOU WILL NEED', this.state.starData)
  //     })
  //   }
  // }


  sizeSelectHandle(event, id) {
    if (event) {
      this.setState({
        selectedSize: event.target.value,
        sizeId: id,
        disabled: false
      }, () => { console.log(this.state.selectedSize) })
    } else {
      this.setState({
        selectedSize: null,
        sizeId: null
      }, () => { console.log(this.state.selectedSize) })
    }
  }

  quantitySelect(event) {
    if (event) {
      this.setState({
        selectedQuantity: event.target.value
      }, () => { console.log(this.state.selectedQuantity) })
    }
  }

  handleDisable() {
    if (this.state.selectedSize) {
      this.setState({
        disabled: false
      })
    } else {
      this.setState({
        disabled: true
      })
    }
  }

  styleSelectHandle(event) {
    if (this.selectedStyle !== '') {
      //console.log('event: ', event)
      this.setState({
        selectedSize: null,
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
        console.log('all info: ', data.data)
        this.setState({
          productInfo: data.data,
        });
      })
      .catch((err) => {
        console.error('Error getting product info', err);
      });
  }

  getStyles(id) {

    axios.get(requests.pullProducts + `/${id}/styles`)
      .then(styles => {
        this.setState({
          styles: styles.data.results,
          selectedStyle: styles.data.results[0].style_id
        }, () => {
          //console.log('All Styles', styles)
          this.getPhotos(this.state.styles)
        })
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
        let pics = styles[i].photos;
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
      }/*, () => { console.log('Product State: ', this.state) }*/)
    }
  }

  parseReviews() {
    var totalRatings = 0;
    for (var key in this.props.reviewData.data.ratings) {
      totalRatings += Number(this.props.reviewData.data.ratings[key])
    }
    this.setState({
      ratingCount: totalRatings
    }/*, () => {console.log(this.state.ratingCount)}*/)
  }

  componentDidUpdate(prevProps) {
    // console.log('currentId: ', this.state.currentItemId)
    // console.log('props Id: ', this.props.productId)
    if (Number(this.state.currentItemId) !== Number(this.props.productId) && this.props.productId) {
      this.setState({
        currentItemId: this.props.productId
      }, () => {
        this.getProductInfo(this.state.currentItemId)
        this.getStyles(this.state.currentItemId)
      })
    }

    //star data
    let updatedData = this.props.starData
    if (prevProps.starData !== updatedData) {
      this.setState({
        starData: updatedData
      }, () => {
        //console.log('HERE IS THE STAR DATA YOU WILL NEED', this.state.starData)
      })
    }

  }

  componentDidMount() {
    this.getStyles(this.state.currentItemId)
    this.getProductInfo(this.state.currentItemId)
    // this.getReviewInfo(this.state.currentItemId)
    if (this.props.reviewData) {
      this.parseReviews();
    }
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
          <SelectionContainer>
            <ProductInfo
              productInfo={this.state.productInfo}
              totalRatings={this.state.totalRatings}
              selectedStyle={this.state.selectedStyle}
              starData={this.state.starData}

              styleSelectHandle={this.styleSelectHandle}
              styles={this.state.styles}
              stylePics={this.state.stylePics}
              selectedStyle={this.state.selectedStyle}
            />
            <Cart
              styles={this.state.styles}
              selected={this.state.selectedStyle}
              selectedSize={this.state.selectedSize}
              sizeSelectHandle={this.sizeSelectHandle}
              handleDisable={this.handleDisable}
              disabled={this.state.disabled}
              selectedQuantity={this.state.selectedQuantity}
              quantitySelect={this.quantitySelect}
            />
          </SelectionContainer>
        </Images>
        <DescStyle>
          <div><em><b>{this.state.productInfo.slogan}</b></em></div>
          <br />
          <div>{this.state.productInfo.description}</div>

        </DescStyle>
      </Container>

    )
  }
}


const Container = styled.div`
  padding-top: 20px;
  padding-bottom: 20px;
  margin-left: 20%;
  margin-right: 20%;
  border-bottom: 1px solid black;
`;

const SelectionContainer = styled.div`
 display: flex;
 flex-direction: column;
 flex-grow: 1;
 order: 2;
`

const Images = styled.div`
  display: flex;
  order: 1;
  width: 600px;
  margin-right: 0px;
`

const DescStyle = styled.div`
  display: relative;
  padding: 15px;
`

export default Overview;