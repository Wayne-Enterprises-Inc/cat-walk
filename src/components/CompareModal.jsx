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
    var check = <i style={{textAlign: 'left'}}class="fas fa-check"></i>

    return(

      <div>


      <ModOn>
      <thead><tr>Comparing</tr></thead>
  <tr>

      <td>{this.props.nameForCompare    }</td>
<div><br/><br/>

<div>
      <td  style={{fontSize: 'x-small', textAlign: 'right'}}>GMO and Pesticide-free{check}</td>
      </div><br/><br/>
      <div>
      <td style={{fontSize: 'x-small'}}>{check}Made with 100% Genetic Modification</td>
      </div><br/><br/>
      <div >
      <td style={{fontSize: 'x-small'}}>{check} Made in USA </td>

      </div><br/><br/>
      <td style={{fontSize: 'x-small'}}>{check}Machine Washable</td>

</div>
      <td>{     this.props.nameForCompare}</td>
  </tr>

  </ModOn>
      </div>
       )

  }


render() {

  if(!this.props.show){
    return null;
}




//var modalword =


  return (

    <div >

  {/* <div>{this.props.children}</div> */}
 {/* {modalword} */}
 <table id='students'>
<tbody >


 {this.renderTableData()}

</tbody>

 </table>
   </div>
  )
 }
}

const ModOn = styled.section`

position: absolute;
top: 25rem;
left: 30rem;


  width: 300px;
  background: white;
  border: 1px solid #ccc;
  transition: 1.1s ease-out;

  filter: blur(0);
  transform: scale(1);
  opacity: 1;
  visibility: visible;
  margin:5px;
  `;


export default CompareModal;