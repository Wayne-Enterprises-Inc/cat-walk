import React from 'react';
import axios from 'axios';
import requests from '../lib/axiosPrefilter.js';
import styled from 'styled-components';

class RelatedItems extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        relatedId: [],
        allRelated: [],
        images: [],

      };

    }

    componentDidMount() {
      axios.get(`${requests.pullProducts}/19089/related`)
        .then(relatedProducts => {

          this.setState({
            relatedId: relatedProducts.data
          }, () => {
            var output = []
            this.state.relatedId.map((singleProduct) => {

              axios.get(`${requests.pullProducts}/${singleProduct}`)
                .then(oneProduct => {




                  output.push(oneProduct.data)

                  var sortedProducts = output.sort((a, b) => parseFloat(a.id) - parseFloat(b.id));



                  this.setState({
                      allRelated: sortedProducts
                    })
                    })
                .then(()=>{
                  var output=[]
                  this.state.relatedId.map((oneElement)=>{

                   axios.get(`${requests.pullProducts}/${oneElement}/styles`)
                   .then(response=>{
                    var otherStyles = response.data.results.slice()
//need to fix hard coding for it to work with other product ID
                   if(otherStyles[2].style_id === 103474 || otherStyles[2].style_id === 103478 || otherStyles[2].style_id === 103499 || otherStyles[2].style_id === 103504){
                          var imgOutput = response.data.results[3]

                       output.push(imgOutput.photos[0].thumbnail_url)
                   }

                   this.setState({
                     images: output
                   })
                    })


                   })


                })
                .catch(error => {
                  console.error('Error pulling products: ', error)
                })
            })
          })

        })

        .catch(error => {
          console.error('Error pulling products: ', error)
        })

    }
  render() {

    const Card = styled.section`
    text-align: left;
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    transition: 0.3s;

    width: 268px;


    padding: 2px 16px;
  `;
  const Wrapper = styled.section`
  display: inline-block;
  margin-right:10px;
  `;
    // console.log('RI PROPS',this.props)
     //console.log('ley STATE',this.state)
   var imgDetail =
   this.state.images.map((thumb, index)=>(

 <Wrapper key={index}>

<div >
    <img src={thumb}/>
    </div>
    </Wrapper>
   ))
   var productDetails = this.state.allRelated.map((productForRender, index)=>(

      <Wrapper key={index}>

      <Card >
      <div >
        <span>{productForRender.category}</span><br/>
        <span>{productForRender.name}</span><br/>
        <span>${productForRender.default_price}</span><br/>
        <span></span>
      </div>
      </Card>
      </Wrapper>

    ))


    return (



     <div>

{imgDetail}<br/>
    {productDetails[0]}

    {productDetails[1]}
    {productDetails[2]}
    {productDetails[3]}
    {productDetails[4]}
    {productDetails[5]}
    {productDetails[6]}

        </div>


    )
  }
}

export default RelatedItems;

