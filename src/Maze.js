import React, { Component } from 'react'

import mazeGenerator from 'generate-maze'

const generateMaze = ({ cols, rows }) => mazeGenerator(cols, rows)
const wall = exists => exists && '2px solid black'
const isGoal = ({ x, y }, { rows, cols }) => (rows - 1 === y) && (cols - 1 === x)

const delta = (col, row) => ({
  rows: row,
  cols: col,
})

/*
 * left = 37
 * up = 38
 * right = 39
 * down = 40
 */
const keyDirection = ({ keyCode }, walls = {}) => {
  console.log(`Moving by ${keyCode} with walls`, walls)
  if (keyCode === 37 && !walls.left) {
    return delta(-1, 0)
  } else if (keyCode === 38 && !walls.top) {
    return delta(0, -1)
  } else if (keyCode === 39 && !walls.right) {
    return delta(1, 0)
  } else if (keyCode === 40 && !walls.bottom) {
    return delta(0, 1)
  } else {
    return null
  }
}

const MazeCell = ({
  cell,
  solveAward,
  position,
  mazeSize,
}) => {
  const { x, y } = cell
  let child = (<span>&nbsp;</span>)
  let backgroundColor
  if (isGoal(cell, mazeSize)) {
    backgroundColor = 'gold'
    child = (<span>{ solveAward }</span>)
  } else if (x === position.col && y === position.row) {
    child = (
      <div style={{
        borderRadius: '50%',
        backgroundColor: 'RebeccaPurple',
        height: '1.5em',
        width: '1.5em',
      }}>&nbsp;</div>
    )
  }

  return (
    <td
      key={cell.x}
      style={{
        borderTop: wall(cell.top),
        borderBottom: wall(cell.bottom),
        borderLeft: wall(cell.left),
        borderRight: wall(cell.right),
        height: '2em',
        width: '2em',
        backgroundColor: backgroundColor,
      }}
    >
      {child}
    </td>
  )
}

class Maze extends Component {
  static getDerivedStateFromProps (nextProps, prevState) {
    if (nextProps.rows === prevState.rows && nextProps.cols === prevState.cols) {
      return null
    }
    return {
      rows: nextProps.rows,
      cols: nextProps.cols,
      maze: generateMaze(nextProps),
      position: {
        row: 0,
        col: 0,
      },
    }
  }

  constructor (props) {
    super(props)
    this.state = {
    }
    this.here = () => {
      const { maze, position } = this.state
      const { row, col } = position
      const rowValues = maze[row]
      if (rowValues) {
        return rowValues[col]
      }
      console.log('ERROR: Unknown maze position:', [row, col])
    }

    this.onKeyDown = (evt) => {
      console.log(`Got keypress: ${evt.keyCode}`)
      const direction = keyDirection(evt, this.here())
      if (direction) {
        console.log(`MOVE:`, direction)
        const newPosition = {
          row: this.state.position.row + direction.rows,
          col: this.state.position.col + direction.cols,
        }
        if (isGoal({y: newPosition.row, x: newPosition.col}, this.props)) {
          this.onSolve()
        } else {
          this.setState({
            position: newPosition,
          })
        }
      }
    }

    this.onSolve = () => {
      this.setState({
        maze: generateMaze(this.props),
        position: {
          row: 0,
          col: 0,
        },
      })
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
      tabIndex="0"
      >
        <tbody>
          { this.state.maze.map(row => (
            <tr key={row[0].y}>
              { row.map(cell => (
                <MazeCell
                  key={cell.x}
                  cell={cell}
                  solveAward={this.props.solveAward}
                  position={this.state.position}
                  mazeSize={this.props}
                />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <a
        onClick={this.props.onSolve}
        style={{
          display: 'block',
          margin: '1em',
          padding: '1em',
          borderRadius: '1em',
          backgroundColor: 'green',
          border: '2px solid darkgreen',
          width: '25%',
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
      >
        Solve!
      </a>
    </div>
  }
}

export default Maze
