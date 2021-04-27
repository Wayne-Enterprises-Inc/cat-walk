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
    this.getNextImage = this.getNextImage.bind(this);
  }
  //functions/handlers



  imgSelect(selected) {
    for (let i = 0; i < this.props.styles.length; i++)

      if (this.props.styles[i].style_id === Number(selected)) {
        return i;
      }
  }

  getNextImage(event) {
    event.preventDefault();

    var index = this.state.currentImgIndex;

    if (this.props.mainPics[index + 1]) {
      this.setState({
        currentImgIndex: (index + 1)
      })
    } else {
      this.setState({
        currentImgIndex: 0
      })
    }
  }

  updateImgIndex(event) {
    event.preventDefault();
    //console.log('Carousel Click: ', event.target.attributes.value.nodeValue)
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
                    value={index}

                  />
                )}
              </div>
            )
          })}
          <Thumbnails>
            <i class="fas fa-arrow-right" style={{
              marginLeft: '20px',
              marginBottom: '5px',
              padding: '5px',
              backgroundColor: '#f7f7f7',
              color: '#393e46',
              border: '1px solid rgba(0, 0, 0, 1)',
              borderRadius: '30%',
            }}
              onClick={this.getNextImage}
            ></i>
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
const Arrow = styled.i`
  color: white;
  background: white;
  height: 50px;
  width: 50px;
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