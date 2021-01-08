const xlsx = require("node-xlsx");

const inputFile = "/Users/luoweiling/Downloads/EN-S1核心词表-0925.xlsx";

const parseExcel = (file) => {
  const workSheetsFromFile = xlsx.parse(file);
  const { data } = workSheetsFromFile[0];
  //   console.log(data);
  const res = {};
  let lastUnit;
  for (let [Unit, Core] of data) {
    if (!Unit && !Core) {
      continue;
    }
    if (Unit) {
      Unit = Unit.trim();
      lastUnit = Unit;
    }
    if (Core) {
      core = Core.trim();
    }
    res[lastUnit] = res[lastUnit] || [];
    res[lastUnit].push(Core);
  }
  console.log(res);
};

parseExcel(inputFile);
