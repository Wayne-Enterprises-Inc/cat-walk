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
    };
  }

  componentDidMount() {
    axios
      .get(`${requests.pullProducts}/19089/related`)
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
                              iOutput.push(ek.results[1].photos[0]);
                              this.setState({
                                imagesToSend: iOutput,
                              });
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
  }

  render() {
    var productDetails = this.state.allRelated.map(
      (productForRender, index) => (
        <Card key={index}>
          <div>
            <span id="idNumber" style={{ visibility: "hidden" }}>
              {productForRender.id}
            </span>
            <br />
            <span>{productForRender.category}</span>
            <br />
            <span>{productForRender.name}</span>
            <br />
            <span>${productForRender.default_price}</span>
            <br />
            <span></span>
          </div>
        </Card>
      )
    );

    return (
      <div>
        <RelatedItemsCarousel
          allProducts={this.props.allProducts}
          productCard={productDetails}
          productCardImg={this.state.imagesToSend}
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

export default RelatedItems;