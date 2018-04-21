import React from 'react'

const Controls = ({
  money,
  rowPrice,
  buyRow,
  colPrice,
  buyCol,
}) => (
  <div>
    <p>$ {money}</p>
    <p>
      <button onClick={buyRow}>Buy Row ${rowPrice}</button>
      <button onClick={buyCol}>Buy Column ${colPrice}</button>
    </p>
  </div>
)

export default Controls
