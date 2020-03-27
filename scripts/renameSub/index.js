const fs = require("fs");
const path = require("path");
const readline = require("readline");

const [rule = /s\d+e\d+/i] = process.argv.slice(2);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function renameSub(dir, files, videoFile) {
  const extname = path.extname(videoFile);
  const fileName = path.basename(videoFile, extname);
  const matchContext = fileName.match(rule)[0];

  for (const file of files) {
    if (/\.(ass|srt)$/.test(file) && file.indexOf(matchContext) !== -1) {
      const end = path.extname(file);
      const oldPath = path.resolve(dir, file);
      const newPath = path.resolve(dir, `${fileName}${end}`);
      fs.rename(oldPath, newPath, err => {
        if (err) throw err;
      });
    }
  }
}

rl.question("请输入文件夹路径(默认当前路径): ", dir => {
  dir = dir || process.cwd();
  const files = fs.readdirSync(dir);
  const allRename = [];
  for (const file of files) {
    if (/\.(mkv|mp4)$/.test(file) && rule.test(file)) {
      allRename.push(renameSub(dir, files, file));
    }
  }
  Promise.all(allRename)
    .then(() => {
      rl.close();
    })
    .catch(err => {
      console.log(err);
      rl.close();
    });
});
