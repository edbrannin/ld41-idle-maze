import React, { Component } from 'react'
import mazeGenerator from 'generate-maze'

import logo from './logo.svg'
import './App.css'

class Controls extends Component {
  render () {
    return <div>
      <p>$ {this.props.money}</p>
      <p>
        <button onClick={this.props.buyRow}>Buy Row ${this.props.rowPrice}</button>
        <button onClick={this.props.buyCol}>Buy Column ${this.props.colPrice}</button>
      </p>
    </div>
  }
}

const generateMaze = ({ cols, rows }) => mazeGenerator(cols, rows)
const rowPrice = ({ rows }) => rows * rows
const colPrice = ({ cols }) => cols * cols
const solveAward = ({ rows, cols }) => rows * cols

const wall = exists => exists && '2px solid black'

const isGoal = ({ x, y }, { rows, cols }) => (rows - 1 === y) && (cols - 1 === x)

class Maze extends Component {
  static getDerivedStateFromProps (nextProps, prevState) {
    if (nextProps.rows === prevState.rows && nextProps.cols === prevState.cols) {
      return null
    }
    return {
      rows: nextProps.rows,
      cols: nextProps.cols,
      maze: generateMaze(nextProps),
    }
  }

  constructor (props) {
    super(props)
    this.state = {
      position: {
        row: 0,
        col: 0,
      },
    }
    this.onKeyDown = (evt) => {
      // TODO
    }
    this.onSolve = () => {
      this.setState({ maze: generateMaze() })
      this.props.onSolve()
    }
  }

  render () {
    return <div>
      <table style={{
        borderCollapse: 'collapse',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: '1em',
      }}
      onKeyDown={this.onKeyDown}
      >
        <tbody>
          { this.state.maze.map(row => (
            <tr key={row.y}>
              { row.map(col => (
                <td
                  key={col.x}
                  style={{
                    borderTop: wall(col.top),
                    borderBottom: wall(col.bottom),
                    borderLeft: wall(col.left),
                    borderRight: wall(col.right),
                    height: '3em',
                    width: '3em',
                    backgroundColor: isGoal(col, this.props) ? 'gold' : undefined,
                  }}
                >
                  { isGoal(col, this.props) ? this.props.solveAward : <span>&nbsp;</span> }
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <button
        onClick={this.props.onSolve}
      >
        Solve!
      </button>
    </div>
  }
}

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
