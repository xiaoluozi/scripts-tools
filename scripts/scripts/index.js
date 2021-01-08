const axios = require('axios');
axios.get('https://cws.qa.huohua.cn/api/courseware/structure?project_code=test-l1-c20191').then(function (response) {
  console.log(response.data);
});
