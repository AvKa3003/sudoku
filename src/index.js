const solveSudoku = function(matrix) {
  const fieldSize = 9;
  const boxSize = 3;

  const findEmpty = (matrix) => {
      for (let r = 0; r < fieldSize; r++) {
          for (let c = 0; c < fieldSize; c++) {
              if(matrix[r][c] === 0) {
                  return [r,c];
              }
          }
      }
      return null;
  }

  const validate = (num, pos, matrix) => {
      const [r,c] = pos;

      //Check rows
      for (let i = 0; i < fieldSize; i++) {
          if (matrix[i][c] === num && i !== r) {
              return false;
          }
      }

      //Check cols
      for (let i = 0; i < fieldSize; i++) {
          if (matrix[r][i] === num && i !== c) {
              return false;
          }
      }


      //Check box
      const boxRow = Math.floor( r/boxSize ) * boxSize;
      const boxCol = Math.floor( c/boxSize ) * boxSize;

      for (let i = boxRow; i < boxRow + boxSize; i++) {
          for (let j = boxCol; j < boxCol + boxSize; j++) {
              if (matrix[i][j] === num && i !== r && j !== c) {
                  return false;
              }
          }
      }

      return true;
  }

  const solve = () => {
      const currPos = findEmpty(matrix);

      if (currPos === null) {
          return true;
      }
      //console.log('------------------------------');
      for (let i = 1; i < fieldSize + 1; i++) {
          const currNum = i;
          const isValid = validate(currNum, currPos, matrix);
          //console.log('currPos ', currPos, 'currNum ',currNum, 'isValid ',isValid);
          if (isValid) {
              const [x,y] = currPos;
              matrix[x][y] = currNum;

              if(solve()) {
                  return true;
              }

              matrix[x][y] = 0;
          }
      }

      return false;
  }

  solve();
  return matrix;
};

module.exports = solveSudoku;