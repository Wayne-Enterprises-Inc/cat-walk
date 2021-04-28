import React from "react";
import axios from "axios";
import requests from "../lib/axiosPrefilter.js";
import styled from "styled-components";
import RelatedItemsCarousel from "../components/RelatedItemsCarousel.jsx";
import CompareModal from "./CompareModal";

class RelatedItems extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      relatedId: [],
      allRelated: [],
      images: [],
      images2: [],
      imagesToSend: [],
      starData: 0,
      currentItemId: 19089,
      modalId: '',
      modalName: '',
      modalFeature1: '',
      modalFeature2: '',
      oModalName: '',
      oModalFeature1: '',
      oModalFeature2: '',
      reviewData: {},
      ratings: 0,
      starPercentage: 0,
      reviewAverages: [],
      outputArray: []

    };
    this.modalHandle = this.modalHandle.bind(this)
    // this.getRatings = this.getRatings.bind(this)
    // this.averageReviews = this.averageReviews.bind(this)
    // this.makeArray = this.makeArray.bind(this)
  }


  // getRatings() {
  //   this.state.relatedId.map((oneRating)=>{


  //     //Initial GET
  //     axios.get(`${requests.pullReviews}/meta/?product_id=${oneRating}`)
  //       .then(data => {
  //         this.setState({
  //           //Sets State to Product's Review Data
  //           reviewData: data.data,
  //         }/*, () => console.log(this.state.reviewData)*/)
  //      // }
  //    // }
  //       }).then(() => {
  //         this.setState({
  //           //From data sets seperate state for ratings and recommended
  //           // characteristics: this.state.reviewData.characteristics,
  //           ratings: this.state.reviewData.ratings,
  //           // recommended: this.state.reviewData.recommended,
  //         }/*, () => console.log(this.state.characteristics)*/)
  //       }).then(() => {
  //       //  this.recommendedReviews(this.state.recommended)
  //         this.setState({
  //           //After ratings state is set, it is used to calculate average rating
  //           averageRating: this.averageReviews(this.state.ratings),
  //         });
  //       })
  //       .then(() => {
  //         //Runs function to display graph corresponding to AverageRating
  //         this.displayStars();
  //       })
  //       .then(() => {
  //         this.makeArray(this.state.starPercentage)
  //       })
  //       .catch(err => {
  //         //Catches any errors in process
  //         console.error('ERROR GETTING REVIEWS: ', err);
  //       })
  //     })
  //   }
  //   averageReviews(reviews) {
  //     let reviewsArray = Object.entries(reviews);
  //     let number = 0;
  //     let total = 0;
  //     let average = 0;
  //     //Loops over array of reviews to pick out each key:value to convert to numeric values
  //     reviewsArray.forEach(([key, value]) => {
  //       total = total + Number(value);
  //       number = number + (key * value);
  //     })
  //     //Numeric rating sum divided by total number of reviews give average review, which is rounded to one decimal point
  //     this.setState({
  //       totalReviews: total,
  //     })
  //     this.eachStarAverage(reviewsArray, total);
  //     average = Number((number / total).toFixed(1));
  //     return average;
  //   }
  //   eachStarAverage(array, total) {
  //     let averagesArray = {};
  //     array.forEach(([key, value]) => {
  //       averagesArray[key] = [value, (((value / total)*100).toFixed(2) + '%')];
  //     })
  //     this.setState({
  //       reviewAverages: averagesArray
  //     })
  //   }
  //   displayStars() {

  //     const starsTotal = 5;
  //     //Gives percentage of reviews based on a 5 star count
  //     const starPercentage = (this.state.averageRating / starsTotal) * 100;
  //     //Rounds percentage so each Star is worth "20%" and each quarter will be at ex: 0%(empty), 5%(quarter), 10%(half), 15%(3/4), 20%(filled star)
  //     const starPercentageRounded = `${Math.round(starPercentage/5) * 5}%`

  //     this.setState({
  //       starPercentage: starPercentageRounded,
  //     })
  //     //this.handleRatingChange();
  //     //console.log(this.state.starPercentage)
  //   }

    // makeArray(starPercent){
    //   var newPercentageArray = this.state.outputArray
    //   newPercentageArray.push(starPercent)
    //   this.setState({
    //     outputArray: newPercentageArray
    //   }, () => {
    //     // console.log(this.state.outputArray)
    //   })
    // }
  componentDidMount() {


    axios
      .get(`${requests.pullProducts}/${this.state.currentItemId}/related`)
      .then((relatedProducts) => {
        this.setState(
          {
            relatedId: relatedProducts.data,
          },
          () => {
            var output = [];
            this.state.relatedId.map((singleProduct) => {
              axios.get(`${requests.pullProducts}/${singleProduct}`)
                .then((oneProduct) => {
                  output.push(oneProduct.data);

                  var sortedProducts = output.sort(
                    (a, b) => parseFloat(a.id) - parseFloat(b.id)
                  );

                  this.setState({
                    allRelated: sortedProducts,
                  });
                })
                .then(() => {
                  var secondOutput = [];
                  this.state.relatedId.map((oneElement) => {
                    axios.get(`${requests.pullProducts}/${oneElement}/styles`)
                      .then((response) => {
                        secondOutput.push(response.data);


                        this.setState({
                          images2: secondOutput,
                        });
                      })
                      .then(() => {
                        var iOutput = [];
                        this.state.allRelated.map((el) => {
                          this.state.images2.map((ek) => {

                            if (el.id === Number(ek.product_id)) {

                              iOutput.push([ek.results[1].photos[0], ek.product_id]);
                              this.setState({
                                imagesToSend: iOutput,
                              });
                            }
                          });
                        });

                      })
                       .then(()=>{

                              // this.getRatings()


                       })

                  });
                })
                .catch((error) => {
                  console.error("Error pulling products: ", error);
                });
            });
          }
        );
      })

      .catch((error) => {
        console.error("Error pulling products: ", error);
      });

  }

  componentDidUpdate(prevProps) {
    let updatedData = this.props.starData
    if (prevProps.starData !== updatedData) {
      this.setState({
        starData: updatedData
      }, () => {
        //console.log('HERE IS THE STAR DATA YOU WILL NEED', this.state.starData)
      })
    }

    //update currentId
    if (Number(this.state.currentItemId) !== Number(this.props.productId) && this.props.productId) {
      this.setState({
        currentItemId: this.props.productId
      }, () => {

        axios
          .get(`${requests.pullProducts}/${this.state.currentItemId}/related`)
          .then((relatedProducts) => {
            this.setState(
              {
                relatedId: relatedProducts.data,
              },
              () => {
                var output = [];
                this.state.relatedId.map((singleProduct) => {
                  axios.get(`${requests.pullProducts}/${singleProduct}`)
                    .then((oneProduct) => {
                      output.push(oneProduct.data);

                      var sortedProducts = output.sort(
                        (a, b) => parseFloat(a.id) - parseFloat(b.id)
                      );

                      this.setState({
                        allRelated: sortedProducts,
                      });
                    })
                    .then(() => {
                      var secondOutput = [];
                      this.state.relatedId.map((oneElement) => {
                        axios.get(`${requests.pullProducts}/${oneElement}/styles`)
                          .then((response) => {
                            secondOutput.push(response.data);


                            this.setState({
                              images2: secondOutput,
                            });
                          })
                          .then(() => {
                            var iOutput = [];
                            this.state.allRelated.map((el) => {
                              this.state.images2.map((ek) => {

                                if (el.id === Number(ek.product_id)) {
                                  if (ek.results[1]) {
                                    iOutput.push([ek.results[1].photos[0], ek.product_id]);
                                    this.setState({
                                      imagesToSend: iOutput,
                                    });
                                  }
                                }
                              });
                            });
                          });
                      });
                    })
                    .catch((error) => {
                      console.error("Error pulling products: ", error);
                    });
                });
              }
            );
          })

          .catch((error) => {
            console.error("Error pulling products: ", error);
          });


      })
    }
  }
  modalHandle(event) {
    axios.get(requests.pullProducts + `/${this.props.productId}`)
    .then((oProductForModal) => {
      this.setState({
        oModalName: oProductForModal.data.name,
        oModalFeature1: oProductForModal.data.features[0].feature,
        oModalFeature2: oProductForModal.data.features[0].value
      })
    })
    this.setState({
      modalId: event.target.attributes.value.nodeValue
    }, () => {
      this.state.relatedId.map((sinlgeId)=>{
        if(Number(this.state.modalId) === Number(sinlgeId) ) {
          axios.get(requests.pullProducts + `/${sinlgeId}`)
          .then((productForModal) => {
            this.setState({
              modalName: productForModal.data.name,
              modalFeature1: productForModal.data.features[0].feature,
              modalFeature2: productForModal.data.features[0].value
            })
          })
        }
           })
    })
}




  render() {
    // console.log('IMAGES2', this.state.imagesToSend)
    // console.log('RD',this.state.reviewData)
    var productDetails = this.state.allRelated.map(

      (productForRender, index) => (

        <div value={productForRender.id} onClick={this.modalHandle} key={index}>

          {/* <span id="idNumber" style={{ visibility: "hidden" }}>
            {productForRender.id}
          </span> */}
          <br />
          <span>{productForRender.category}</span>
          <br />
          <span>{productForRender.name}</span>
          <br />
          <span>${productForRender.default_price}</span>
          <br />
          <span>

            <StarsOuter>

              <StarsInner starsPercent={this.state.starData}>


              </StarsInner>
            </StarsOuter>
          </span>
        </div>

      )
    );

// console.log('SD',this.state.reviewAverages)
    return (
      <div>
        <RelatedItemsCarousel getId={this.props.getId}
          modalId={this.state.modalId}
          allProducts={this.props.allProducts}
          productCard={productDetails}
          productCardImg={this.state.imagesToSend}
          modalName={this.state.modalName}
          modalFeature1={this.state.modalFeature1}
          modalFeature2={this.state.modalFeature2}
          oModalName={this.state.oModalName}
          oModalFeature1={this.state.oModalFeature1}
          oModalFeature2={this.state.oModalFeature2}
          starPercentage={this.state.starPercentage}

        />
      </div>
    );
  }
}

const Card = styled.section`
  text-align: left;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  width: 200px;
  padding: 2px 16px;
`;

const StarsOuter = styled.div`
  & {
    position: relative;
    display: inline-block;
  }
  &:before {
    content: '\f005 \f005 \f005 \f005 \f005';
    font-family: 'Font Awesome 5 Free';
    font-weight: 900;
    color: #ccc;
  }
`;

const StarsInner = styled.div`
  & {
  position: absolute;
  top: 0;
  left: 0;
  white-space: nowrap;
  overflow: hidden;
  width: ${props => props.starsPercent}
  }
  &:before {
    content: '\f005 \f005 \f005 \f005 \f005';
    font-family:"Font Awesome 5 Free";
    font-weight:900;
    color: #f8ce0b;
  }
`;

export default RelatedItems;