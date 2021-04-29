import React from 'react';
import styled from 'styled-components';

const StyleSelect = (props) => {
  //console.log('PROPS: ', props.styles[0])
  return (
    <Styles>

      {props.styles.map((style, index) => {

        let styleOptions = {
          backgroundImage: `url(${style.photos[0].thumbnail_url})`,
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
        }

        if (style.style_id) {
          return (
            < div key={index}>
              < Select
                key={style.style_id}
                style={styleOptions}
                value={style.style_id}
                onClick={props.styleSelectHandle}
              />
            </div>
          )
        }
      })}

    </Styles >
  )
}

const Select = styled.div`
  border-radius: 50%;
  height: 65px;
  width: 65px;
  cursor: pointer;
  margin-bottom: 5px;
  ${Select}:hover {
    border: 1px solid black;
  }
`
const Styles = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 80%;
  padding-bottom: 20px;
  border-bottom: 1px solid black;

`


export default StyleSelect;

