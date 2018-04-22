import React from 'react'

import './Controls.css'

const BuyButton = ({ onClick, name, price, money }) => (
  <a
    onClick={onClick}
    className={`BuyButton ${money < price ? 'disabled' : ''}`}
  >
    Buy {name} ${price}
  </a>
)

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
      <BuyButton money={money} onClick={buyRow} price={rowPrice} name="Row" />
      <BuyButton money={money} onClick={buyCol} price={colPrice} name="Column" />
    </p>
  </div>
)

export default Controls
