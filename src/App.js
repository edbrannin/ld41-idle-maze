import React, { Component } from 'react'
import mazeGenerator from 'generate-maze'

import logo from './logo.svg'
import './App.css'

class Controls extends Component {
  render () {
    return <div>
      <p>$ {this.props.money}</p>
    </div>
  }
}

const generateMaze = ({ cols, rows }) => mazeGenerator(cols, rows)

const wall = exists => exists && '2px solid black'

class Maze extends Component {
  constructor (props) {
    super(props)
    this.state = {
      maze: generateMaze(props),
      position: {
        row: 0,
        col: 0,
      },
    }
    this.onKeyDown = (evt) => {
      // TODO
    }
  }

  render () {
    return <div>
      <table style={{
        borderCollapse: 'collapse',
        marginLeft: 'auto',
        marginRight: 'auto',
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
                  }}
                >
                  &nbsp;
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
    this.onSolve = () => {
      console.log(`Solved!  Money=${this.state.money}, rows=${this.state.rows}, cols=${this.state.cols}`)
      this.setState((oldState) => ({
        money: oldState.money + oldState.rows * oldState.cols,
      }))
    }
  }

  render () {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to React</h1>
          <Controls money={this.state.money} />
        </header>
        <Maze
          rows={this.state.rows}
          cols={this.state.cols}
          onSolve={this.onSolve}
        />
        <img src={logo} className="App-logo" alt="logo" />
      </div>
    )
  }
}

export default App
