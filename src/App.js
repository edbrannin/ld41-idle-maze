import React, { Component } from 'react'
import mazeGenerator from 'generate-maze'

import logo from './logo.svg'
import './App.css'

class Controls extends Component {
  render () {
    return <p>Controls</p>
  }
}

const generateMaze = ({ cols, rows }) => mazeGenerator(cols, rows)

const wall = exists => exists && '2px solid black'

class Maze extends Component {
  constructor (props) {
    super(props)
    this.state = {
      maze: generateMaze(props),
    }
  }

  render () {
    return <table style={{
      borderCollapse: 'collapse',
      marginLeft: 'auto',
      marginRight: 'auto',
    }}>
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
                  whiteSpace: 'pre',
                  fontFamily: 'monospace',
                  textAlign: 'left',
                  borderCollapse: true,
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
  }
}

class App extends Component {
  render () {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <Controls />
        <Maze
          rows={8}
          cols={8}
        />
        <img src={logo} className="App-logo" alt="logo" />
      </div>
    )
  }
}

export default App
