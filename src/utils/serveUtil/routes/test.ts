const express = require('express');
const router = express.Router();
const { orderOptions, createTerminal } = require('../../index');
const { GetOrderList } = orderOptions;
const { sendTerminal } = require('../../../config/ipc');
const { parsePackageStr } = require('../../xlOrder');
router.post('/getOrderList', (req: any, res: any, next: any) => {
  let data = GetOrderList();
  res.json({
    status: 1,
    code: 200,
    data,
  });
});
router.post('/getOrderList/detail', (req: any, res: any, next: any) => {
  const { id } = req.body;
  if (id) {
    let resData = GetOrderList();
    let dataList = resData.filter((item: any) => item.id === id);
    if (dataList.length > 0) {
      const data = dataList[0];
      parsePackageStr(data.webFilePath)
        .then((results: any) => {
          res.json({
            status: 1,
            code: 200,
            data: results.data,
          });
        })
        .catch(() => {
          res.json({
            status: 0,
            code: 200,
            data: {},
          });
        });
    } else {
      res.json({
        status: 0,
        code: 200,
        data: {},
      });
    }
  } else {
    res.json({
      status: 0,
      code: 200,
      data: {},
    });
  }
});
module.exports = router;
