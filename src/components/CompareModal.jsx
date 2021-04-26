import React from "react";
import styled from "styled-components";
class CompareModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };

  }


  renderTableData() {
    var check = <i style={{ textAlign: "left" }} className="fas fa-check"></i>;

    return (
      <div>
        <ModOn>

            <span>Comparing</span><br/><br/>

            <CheckStyleLeft>{this.props.nameForCompare}</CheckStyleLeft>
            <CheckStyleRight>{this.props.nameForCompare}</CheckStyleRight>
            <div>
              <br />
              <br />
        <TextStyle>
              <div>
                <span style={{fontSize: "x-small" }}>
                  GMO and Pesticide-free<CheckStyleRight>{check}</CheckStyleRight>
                </span>
              </div>
              <br />
              <br />
              <div>
                <span style={{ fontSize: "x-small" }}>
                  <CheckStyleLeft>{check}</CheckStyleLeft>Made with 100% Genetic Modification<CheckStyleRight>{check}</CheckStyleRight>
                </span>
              </div>
              <br />
              <br />
              <div>
                <span style={{ fontSize: "x-small" }}><CheckStyleLeft>{check}</CheckStyleLeft> Made in USA </span>
              </div>
              <br />
              <br />
              <div>
              <span style={{ fontSize: "x-small" }}><CheckStyleLeft>{check}</CheckStyleLeft>Machine Washable</span> <br /> <br />
            </div>
        </TextStyle>
            </div>


        </ModOn>
      </div>
    );
  }

  render() {
    if (!this.props.show) {
      return null;
    }

    return (
      <div>

      {this.renderTableData()}

      </div>
    );
  }
}

const ModOn = styled.section`
  position: absolute;
  top: 50rem;
  left: 30rem;

  width: 300px;
  background: white;
  border: 1px solid #ccc;

  opacity: 0.95;

  margin: 5px;
`;
const TextStyle = styled.section`
  text-align: center;
`;
const CheckStyleLeft = styled.section`
float: left;
`;
const CheckStyleRight = styled.section`
float: right;
`;

export default CompareModal;