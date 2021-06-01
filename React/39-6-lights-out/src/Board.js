import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows = 6, ncols = 6, chanceLightStartsOn = 0.5 }) {
    const [board, setBoard] = useState(createBoard());

    /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
    function createBoard() {
        let initialBoard = [];
        // Set up rows
        for (let i = 0; i < nrows; i++) {
            let newRow = [];
            // Set up columns within the row
            for (let j = 0; j < ncols; j++) {
                newRow.push(Math.random() > chanceLightStartsOn ? true : false);
            }
            // Push row in to initialBoard
            initialBoard.push(newRow);
        }
        return initialBoard;
    }

    function hasWon() {
        /** check the board in state to determine whether the player has won. */
        if (board === undefined) {
            return false;
        }
        let lights = false;
        for (let row of board) {
            for (let col of row) {
                if (col) {
                    lights = true;
                }
            }
        }
        if (lights) {
            return false;
        } else {
            return true;
        }
    }

    function flipCellsAround(coord) {
        // Flip the cell and those around it, return new board
        setBoard((oldBoard) => {
            const [y, x] = coord.split("-").map(Number);

            const flipCell = (y, x, boardCopy) => {
                // if this coord is actually on board, flip it
                if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
                    boardCopy[y][x] = !boardCopy[y][x];
                }
            };

            // Make a (deep) copy of the oldBoard
            let newBoard = oldBoard.map((row) => row.map((col) => col));

            // in the copy, flip this cell and the cells around it
            flipCell(y, x, newBoard);
            for (let flipY = y - 1; flipY < y + 2; flipY++) {
                flipCell(flipY, x, newBoard);
            }
            for (let flipX = x - 1; flipX < x + 2; flipX++) {
                flipCell(y, flipX, newBoard);
            }

            // return the copy
            return newBoard;
        });
    }

    // if the game is won, just show a winning msg & render nothing else
    if (hasWon()) {
        return <p className="App--win">You Won!</p>;
    }

    // make table board
    return (
        <div>
            <table>
                <tbody>
                    {/* Map over row arrays in board to make tr's */}
                    {board.map((row, rIdx) => {
                        return (
                            <tr key={"r" + rIdx.toString()}>
                                {/* Map over col values in row to make Cells */}
                                {row.map((col, cIdx) => {
                                    return (
                                        <Cell
                                            key={`${rIdx.toString()}-${cIdx.toString()}`}
                                            coord={`${rIdx.toString()}-${cIdx.toString()}`}
                                            flipCellsAroundMe={flipCellsAround}
                                            isLit={col ? true : false}
                                        />
                                    );
                                })}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default Board;
