import React from 'react';
import styled from 'styled-components';
class CompareModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
    this.onClose = this.onClose.bind(this)
  }
  onClose(e) {
    this.props.show = false;
  };
  renderTableData(){
    return(
      <ModOn>
  <tr>

      <td>{this.props.nameForCompare}</td>
      <td>Product is NonGMO</td>
  </tr>

  </ModOn>
       )

  }
render() {
console.log('modal', this.props)
  if(!this.props.show){
    return null;
}

const ModOn = styled.section`
  width: 500px;
  background: white;
  border: 1px solid #ccc;
  transition: 1.1s ease-out;

  filter: blur(0);
  transform: scale(1);
  opacity: 1;
  visibility: visible;
  margin:5px;
  `;


//var modalword =


  return (
    <div>
  {/* <div>{this.props.children}</div> */}
 {/* {modalword} */}
 <table id='students'>

 {this.renderTableData()}

 </table>
   </div>
  );
 }
};


export default CompareModal;