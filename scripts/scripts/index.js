// const axios = require('axios');
const { v5 } = require('uuid');

// axios.get('https://cws.qa.huohua.cn/api/courseware/structure?project_code=test-l1-c20191').then(function (response) {
//   console.log(response.data);
// });

const getProjects = (index, code, res) => {
  res = res || [];
  axios({
    method: 'post',
    url: 'https://cws.bg.huohua.cn/api/courseware/queryProject',
    data: {
      query : {
        code
      },
      pageIndex: index,
      pageSize: 10
    }
  }).then(response => {
    const {data} = response;
    const {
      items,
      total
    } = data.data;
    items.forEach((item) => {
      res.push(item.code)
    })
    if(total > index * 10) {
      getProjects(index + 1, code, res)
    }else {
      console.log('res', res);
      return res;
    }

  });

}

const mUuid = v5('M0', v5.URL)
// const uuidStr = v5('math', '1b671a64-40d5-491e-99b0-da01ff1f3341');
const uuidStr = v5('math', mUuid)
const uuidStr1 = v5('chi', mUuid)
const sUuid = v5([uuidStr, uuidStr1], v5.URL)
// console.log(uuidStr)
console.log(uuidStr1)
// getProjects(1, 10)

