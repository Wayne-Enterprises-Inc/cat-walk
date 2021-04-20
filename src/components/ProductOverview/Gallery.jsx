import React from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Carousel from './Carousel.jsx';


class Gallery extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentImgIndex: 0,
      mainThumbnail: 0,
      expand: false
    }
    //bindings
    this.imgSelect = this.imgSelect.bind(this)

  }
  //functions/handlers

  imgSelect(selected) {
    for (let i = 0; i < this.props.styles.length; i++)

      if (this.props.styles[i].style_id === Number(selected)) {
        return i;
      }
  }

  //in the render: map through images. render based on selected style
  render() {
    return (
      <GalleryView>
        {this.props.mainPics.map((image, index) => {

          const images = Object.assign({}, {

            height: '600px',
            width: '600px',
            backgroundImage: `url(${image})`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundSize: 'cover'
          })
          return (
            <div key={index}>
              {index === (this.props.selectedStyle ? this.imgSelect(this.props.selectedStyle) : this.state.currentImgIndex) && (
                <MainImage
                  key={index}
                  style={images}
                />
              )}
            </div>
          )
        })}
        <Thumbnails>
          <Carousel
            currentImgIndex={this.state.currentImgIndex}
            thumbnails={this.props.thumbnails}
            mainThumbnail={this.state.mainThumbnail}
            imgSelect={this.imgSelect}
            selectedStyle={this.props.selectedStyle}
          />
        </Thumbnails>
      </GalleryView>
    )
  }
}

const MainImage = styled.div`
  position: relative;
  width: 600px;
  height: 600px;
  border-radius: 10px;
`
const Thumbnails = styled.div`
  position: relative;
  bottom: 95%;
  width: 10%;
  padding: 10px;
`
const GalleryView = styled.div`
  position: relative;
  height: 600px;
  width: 650px;
`

export default Gallery;