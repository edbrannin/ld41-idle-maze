import React, { Component } from 'react'

import Controls from './Controls'
import Maze from './Maze'
import logo from './logo.svg'
import './App.css'

const rowPrice = ({ rows }) => rows * rows
const colPrice = ({ cols }) => cols * cols
const solveAward = ({ rows, cols }) => rows * cols

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      money: 0,
      rows: 2,
      cols: 2,
      position: {
        row: 0,
        col: 0,
      },
    }

    this.buyRow = () => {
      this.setState((state) => {
        const price = rowPrice(state)
        if (state.money >= price) {
          return {
            money: state.money - price,
            rows: state.rows + 1,
          }
        }
      })
    }

    this.buyCol = () => {
      this.setState((state) => {
        const price = colPrice(state)
        if (state.money >= price) {
          return {
            money: state.money - price,
            cols: state.cols + 1,
          }
        }
      })
    }

    this.onSolve = () => {
      console.log(`Solved!  Money=${this.state.money}, rows=${this.state.rows}, cols=${this.state.cols}`)
      this.setState((oldState) => ({
        money: oldState.money + solveAward(oldState),
      }))
    }
  }

  render () {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to React</h1>
          <Controls
            money={this.state.money}
            buyRow={this.buyRow}
            buyCol={this.buyCol}
            rowPrice={rowPrice(this.state)}
            colPrice={colPrice(this.state)}
          />
        </header>
        <Maze
          rows={this.state.rows}
          cols={this.state.cols}
          onSolve={this.onSolve}
          solveAward={solveAward(this.state)}
        />
        <img src={logo} className="App-logo" alt="logo" />
      </div>
    )
  }
}

export default App
