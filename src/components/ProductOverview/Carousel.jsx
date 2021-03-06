import React from 'react';
import styled from 'styled-components';

const Carousel = (props) => {
  if (props.thumbnails[0]) {

    for (var i = 0; i < props.thumbnails.length; i++) {
      if (props.thumbnails[i][1] === Number(props.selectedStyle)) {
        //console.log('thumbnails: ', props.thumbnails[i][0])
        var currentThumbnails = props.thumbnails[i][0];

      }
    }
  }

  const getIndex = (number, length) => {
    if (number >= length) {
      return number - length + 1;
    } else {
      return number;
    }
  }
  if (currentThumbnails) {
    return (

      <Container>

        {currentThumbnails.map((pic, index) => {

          return (
            <div key={index}>
              <Thumbnail
                key={index}
                style={{ backgroundImage: `url(${pic.thumbnail_url})` }}
                onClick={props.updateImgIndex}
                value={index}
              />
            </div>
          )

        })}
      </Container>
    )
  } else {
    return (
      <div>loading...</div>
    )
  }
}

const Container = styled.div`
  overflow: scroll;
  width: 75px;
  height: 455px;
  background-color: rgba(255, 255, 255, .4);
`

const Thumbnail = styled.div`
  display: relative;
  height: 65px;
  width: 65px;
  margin-bottom: 10px;
  cursor: pointer;
  border: 1px solid black;
  border-radius: 30%;
  opacity: 0.75;
  background-position: center;
  background-size: cover;
  ${Thumbnail}:hover {
    border: 2px solid black;
    border-radius: 30%;
    opacity: 1;
  }
`

export default Carousel;

// {index === (props.selectedStyle ? props.imgSelect(props.selectedStyle) : props.mainThumbnail) && (
//   <>
//     <Thumbnail
//       style={{ backgroundImage: `url(${props.thumbnails[getIndex(index, props.thumbnails.length)]})` }}
//     />
//     <Thumbnail
//       style={{ backgroundImage: `url(${props.thumbnails[getIndex(index + 1, props.thumbnails.length)]})` }}
//     />
//     <Thumbnail
//       style={{ backgroundImage: `url(${props.thumbnails[getIndex(index + 2, props.thumbnails.length)]})` }}
//     />
//     <Thumbnail
//       style={{ backgroundImage: `url(${props.thumbnails[getIndex(index + 3, props.thumbnails.length)]})` }}
//     />
//     <Thumbnail
//       style={{ backgroundImage: `url(${props.thumbnails[getIndex(index + 4, props.thumbnails.length)]})` }}
//     />
//     <Thumbnail
//       style={{ backgroundImage: `url(${props.thumbnails[getIndex(index + 5, props.thumbnails.length)]})` }}
//     />
//   </>
// )}