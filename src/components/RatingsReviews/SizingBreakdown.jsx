import React, { useState } from 'react';


function SizeBreakdown(props) {
  const [size, setSize] = useState([
    {
      notSure: 'hi',
      test: true
    }
  ]);


  return (
    <div className="sizeBreakdown">
      <div className="graph">

      </div>
    </div>
  )
}

export default SizeBreakdown;