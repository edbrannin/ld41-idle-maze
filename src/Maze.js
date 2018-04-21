import React, { Component } from 'react'

import mazeGenerator from 'generate-maze'

const generateMaze = ({ cols, rows }) => mazeGenerator(cols, rows)
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

export default Maze
