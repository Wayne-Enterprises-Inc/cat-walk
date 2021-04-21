import React from 'react';
import styled from 'styled-components';

const Carousel = (props) => {
  //console.log('PROPS', props.thumbnails)
  const getIndex = (number, length) => {
    if (number >= length) {
      return number - length + 1;
    } else {
      return number;
    }
  }

  return (
    <div>

      {props.thumbnails.map((pic, index) => {

        return (
          <div key={index}>
            <Thumbnail
              key={index}
              style={{ backgroundImage: `url(${pic})` }}
            />
          </div>
        )
      })}

    </div>
  )
}

const Thumbnail = styled.div`
  display: relative;
  height: 65px;
  width: 65px;
  margin-bottom: 10px;
  cursor: pointer;
  border: 1px solid black;
  opacity: 0.75;
  background-position: center;
  background-size: cover;
  ${Thumbnail}:hover {
    border: 2px solid black;
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