export default class Board {
  constructor() {
    this.chessBoard = this.initializeBoard();
    this.graph = this.initializeGraph();
  }

  knightMoves(source, destination) {
    let minMoves = Infinity;
    let bestPath = null;

    const path = (start, end, moves = 0, currentPath = [start]) => {
      if (start === end) {
        // Prior issue where i was storing last viable path
        if (moves < minMoves) {
          minMoves = moves;
          bestPath = currentPath;
        }
        return;
      }

      if (moves >= minMoves) {
        return;
      }

      const adjacentVertices = this.graph[start];

      adjacentVertices.forEach((vertex) => {
        if (!currentPath.includes(vertex)) {
          path(vertex, end, moves + 1, [...currentPath, vertex]);
        }
      });
    };

    const start = this.chessBoard[source[0]][source[1]];
    const end = this.chessBoard[destination[0]][destination[1]];
    path(start, end);

    console.log(`You made it in ${minMoves} moves! Here's your path:`);
    bestPath.forEach((cell) => {
      outer: for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
          if (this.chessBoard[i][j] === cell) {
            console.log(`[${i}, ${j}]`);
            break outer;
          }
        }
      }
    });

    return;
  }

  initializeBoard() {
    const board = Array(8)
      .fill(null)
      .map(() => []);
    let square = 0;

    board.forEach((row) => {
      while (row.length < 8) {
        row.push(square);
        square += 1;
      }
    });

    return board;
  }

  initializeGraph() {
    const graph = [];
    const knightMoves = [
      [2, 1],
      [1, 2],
      [-1, 2],
      [-2, 1],
      [-2, -1],
      [-1, -2],
      [1, -2],
      [2, -1],
    ];

    this.chessBoard.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        const adjacentVertices = [];

        knightMoves.forEach((move) => {
          const row = rowIndex + move[0];
          const col = colIndex + move[1];

          if (this.chessBoard[row] && this.chessBoard[row][col] !== undefined) {
            adjacentVertices.push(this.chessBoard[row][col]);
          }

          graph[cell] = adjacentVertices;
        });
      });
    });

    return graph;
  }
}
