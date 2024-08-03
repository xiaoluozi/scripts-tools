const board = [
    ['5', '3', '.', '.', '7', '.', '.', '.', '.'],
    ['6', '.', '.', '1', '9', '5', '.', '.', '.'],
    ['.', '9', '8', '.', '.', '.', '.', '6', '.'],
    ['8', '.', '.', '.', '6', '.', '.', '.', '3'],
    ['4', '.', '.', '8', '.', '3', '.', '.', '1'],
    ['7', '.', '.', '.', '2', '.', '.', '.', '6'],
    ['.', '6', '.', '.', '.', '.', '2', '8', '.'],
    ['.', '.', '.', '4', '1', '9', '.', '.', '5'],
    ['.', '.', '.', '.', '8', '.', '.', '7', '9'],
  ];
  
  const solveSudoku = function (board) {
    const defaultNumbers = new Set(
      Array.from({ length: 9 }, (v, i) => `${i + 1}`)
    );
    /**
     * 遍历每一行
     * 编译每一列
     * 变量rowAlready
     */
    const getSamePart = function (arr) {
      return arr.reduce((a, b) => a.filter((c) => b.includes(c)));
    };
  
    const getDiffPart = function (arr) {
      return arr.reduce((a, b) => a.filter((c) => !b.includes(c)));
    };
  
    let rows = [];
    let columns = [];
    let blocks = [];
    board.forEach((row, r) => {
      row.forEach((column, c) => {
        rows[r] = rows[r] || new Set();
        columns[c] = columns[c] || new Set();
        if (column !== '.') {
          rows[r].add(column);
          columns[c].add(column);
          const blockIndex = parseInt(r / 3) * 3 + parseInt(c / 3);
          blocks[blockIndex] = blocks[blockIndex] || new Set();
          blocks[blockIndex].add(column);
        }
      });
    });
    let boardMap = new Map();
    board.forEach((row, r) => {
      row.forEach((column, c) => {
        if (column === '.') {
          const blockIndex = parseInt(r / 3) * 3 + parseInt(c / 3);
          boardMap.set(
            `${r}-${c}`,
            new Set(
              getDiffPart([
                [...defaultNumbers],
                [...rows[r]],
                [...columns[c]],
                [...blocks[blockIndex]],
              ])
            )
          );
        }
      });
    });
  
    const calculateNewMap = (mapObj, list) => {
      let res = true;
      let dealList = [];
      let message = '';
      const arr = Array.from(mapObj).slice(0);
      for (const { row, column, value } of list) {
        const enterBlockIndex = parseInt(row / 3) * 3 + parseInt(column / 3);
        for (const config of arr) {
          const [newKey, newValue] = config;
          const [newRow, newCol] = newKey.split('-');
          const currentBlockIndex =
            parseInt(newRow / 3) * 3 + parseInt(newCol / 3);
          if (
            (newRow === row ||
              newCol === column ||
              enterBlockIndex === currentBlockIndex) &&
            newValue.has(value)
          ) {
            if (newRow === row && newCol === column) {
              mapObj.set(`${newRow}-${newCol}`, new Set([value]));
            } else {
              if (newValue.size <= 1) {
                message = `${newRow}-${newCol}的值为${[...newValue][0]}`;
                // console.log('error', message);
                res = false;
                return res;
              } else {
                newValue.delete(value);
                mapObj.set(`${newRow}-${newCol}`, newValue);
                if (newValue.size === 1) {
                  // if (newRow == 0 && newCol == 8) {
                  //   console.log('11111111111', newRow, newCol, [...newValue][0]);
                  // }
                  dealList.push({
                    row: newRow,
                    column: newCol,
                    value: [...newValue][0],
                  });
                }
              }
            }
          }
        }
      }
  
      if (!res) {
        // console.log('________________________', message);
        return res;
      } else if (!dealList.length) {
        return mapObj;
      } else {
        return calculateNewMap(mapObj, dealList);
      }
    };
  
    const getCurrentMap = (enterMap) => {
      const arr = Array.from(enterMap).sort((a, b) => a[1].size - b[1].size);
      const checked = arr.every((item) => item[1].size === 1);
      // console.log(arr);
      if (checked) {
        console.log('1111111111111', enterMap);
        return enterMap;
      } else {
        let result;
        for (const item of arr) {
          const [key, value] = item;
          const [row, column] = key.split('-');
          if (value.size < 1) {
            result = false;
            return false;
          } else if (value.size > 1) {
            for (const condition of [...value]) {
              const newEnterMap = new Map();
              for (const [key, value] of enterMap) {
                newEnterMap.set(key, new Set([...value]));
              }
              const res = calculateNewMap(newEnterMap, [
                { row, column, value: condition },
              ]);
              if (!res) {
                console.log('错误假设条件', res, row, column, condition);
                continue;
              } else {
                result = getCurrentMap(res);
                if (!result) {
                  continue;
                } else {
                  return result;
                }
              }
            }
          }
          continue;
        }
        return result;
      }
    };
    // getCurrentMap(boardMap);
    console.log(boardMap);
  };
  
  solveSudoku(board);
  