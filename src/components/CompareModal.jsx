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

            <CheckStyleLeft>{this.props.oModalName}</CheckStyleLeft>
            <CheckStyleRight>{this.props.modalName}</CheckStyleRight>
            <div>
              <br />
              <br />
        <TextStyle>
              <div>
              <CheckStyleLeft>  <span style={{fontSize: "x-small" }}>
                  {this.props.oModalFeature1}
                </span></CheckStyleLeft>
              <CheckStyleRight>
                <span style={{fontSize: "x-small" }}>
                  {this.props.modalFeature1}
                </span>
                  </CheckStyleRight>
              </div>
              <br />
              <br />
              <div>
                <span style={{ fontSize: "x-small" }}>
                  <CheckStyleLeft> {this.props.oModalFeature2}</CheckStyleLeft><CheckStyleRight>{this.props.modalFeature2}</CheckStyleRight>
                </span>
              </div>
              <br />
              <br />
              <div>

                <span style={{ fontSize: "x-small" }}><CheckStyleLeft className="GMO">GMO and Pesticide Free</CheckStyleLeft>  </span>
                {check}
                <span style={{ fontSize: "x-small" }}><CheckStyleRight className="GMO">GMO and Pesticide Free</CheckStyleRight> </span>
              </div>
              <br />
              <br />
              <div>
              <span style={{ fontSize: "x-small" }}><CheckStyleLeft>Machine Washable</CheckStyleLeft>  </span>
              {check}
                <span style={{ fontSize: "x-small" }}><CheckStyleRight>Machine Washable</CheckStyleRight> </span>
              <br /> <br />
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