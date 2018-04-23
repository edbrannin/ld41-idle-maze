import React, { Component } from 'react'
import EventListener from 'react-event-listener'
import mazeGenerator from 'generate-maze'
import TableMaze, { isGoal } from './TableMaze'

const generateMaze = ({ cols, rows }) => mazeGenerator(cols, rows)

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
      const direction = keyDirection(evt, this.here())
      if (direction) {
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
      <p>Move around the maze with the arrow keys.  Make it bigger to earn more points!</p>
      <EventListener
        target="window"
        onKeyDown={this.onKeyDown}
      />
      <TableMaze
        maze={this.state.maze}
        playerLocation={this.state.position}
        solveAward={this.props.solveAward}
        goalLocation={{
          cols: this.props.cols,
          rows: this.props.rows,
        }}
      />
    </div>
  }
}

export default Maze
