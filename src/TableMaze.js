import React from 'react'

const wall = exists => exists && '2px solid black'
const isGoal = ({ x, y }, { rows, cols }) => (rows - 1 === y) && (cols - 1 === x)

const MazeCell = ({
  cell,
  solveAward,
  playerLocation,
  goalLocation,
}) => {
  const { x, y } = cell
  let child = (<span>&nbsp;</span>)
  let backgroundColor
  if (isGoal(cell, goalLocation)) {
    backgroundColor = 'gold'
    child = (<span>{ solveAward }</span>)
  } else if (x === playerLocation.col && y === playerLocation.row) {
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

const TableMaze = ({
  maze,
  playerLocation,
  solveAward,
  goalLocation,
}) => (
  <div>
    <table style={{
      borderCollapse: 'collapse',
      marginLeft: 'auto',
      marginRight: 'auto',
      marginTop: '1em',
      marginBottom: '1em',
    }}
    >
      <tbody>
        { maze.map(row => (
          <tr key={row[0].y}>
            { row.map(cell => (
              <MazeCell
                key={cell.x}
                cell={cell}
                solveAward={solveAward}
                playerLocation={playerLocation}
                goalLocation={goalLocation}
              />
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
)

export default TableMaze
export {
  isGoal,
}
