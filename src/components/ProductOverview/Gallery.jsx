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
    this.imgSelect = this.imgSelect.bind(this);
    this.updateImgIndex = this.updateImgIndex.bind(this);
  }
  //functions/handlers



  imgSelect(selected) {
    for (let i = 0; i < this.props.styles.length; i++)

      if (this.props.styles[i].style_id === Number(selected)) {
        return i;
      }
  }

  updateImgIndex(event) {
    event.preventDefault();
    console.log('Carousel Click: ', event.target.attributes.value.nodeValue)
    var index = Number(event.target.attributes.value.nodeValue)
    this.setState({
      currentImgIndex: index
    })
  }


  //in the render: map through images. render based on selected style
  render() {
    if (this.props.mainPics[0]) {

      for (var i = 0; i < this.props.thumbnails.length; i++) {
        if (this.props.thumbnails[i][1] === Number(this.props.selectedStyle)) {
          //console.log('Mains: ', this.props.mainPics[i])

          var currentMains = this.props.mainPics[i];

        }
      }
    } else {
      return (
        <div>loading...</div>
      )
    }
    if (currentMains) {
      return (
        <GalleryView>
          {currentMains.map((image, index) => {

            const images = Object.assign({}, {

              height: '600px',
              width: '600px',
              backgroundImage: `url(${image.url})`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              backgroundSize: 'cover'
            })
            return (
              <div key={index}>
                {index === (this.state.currentImgIndex) && (
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
              selectedStyle={this.props.selectedStyle}
              updateImgIndex={this.updateImgIndex}
            />
          </Thumbnails>
        </GalleryView>
      )
    } else {
      return (
        <div>loading...</div>
      )
    }
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
  width: 600px;
`

export default Gallery;