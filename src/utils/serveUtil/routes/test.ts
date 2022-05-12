const express = require('express');
const router = express.Router();
const { orderOptions, createTerminal,getBatchRunsOrders, } = require('../../index');
const { GetOrderList } = orderOptions;
const { sendTerminal } = require('../../../config/ipc');
const { parsePackageStr } = require('../../xlOrder');
const { windowClass } = require('../mainWindow');
const {
  create_terminal_window,
  sendToTerminalWindow,
} = require('../../../electron/window');
router.post(
  '/createOrderWindow',
  (req: any, res: any, next: any) => {
    const { id = '', orderName } = req.body;
    if (id) {
      create_terminal_window(windowClass.mainWindow, {
        status: 'createOrder',
        id: id,
        orderName,
      });
      res.json({
        status: 1,
        code: 200,
        data: 'ok',
      });
    } else {
      res.json({
        status: 0,
        code: 200,
        data: '项目id未传入',
      });
    }
  }
);
router.post('/getBatchOrderList', (req: any, res: any, next: any) => {
  let data = getBatchRunsOrders();
  res.json({
    status: 1,
    code: 200,
    data,
  });
})
router.post('/runBatchOrder', (req: any, res: any, next: any) => { 
  let data = getBatchRunsOrders();
  const { id = '', } = req.body;
  if (id) {
    let filterData = data.filter((item: any) => (item.id === id));
    if (filterData.length > 0) {
      let res = filterData[0];
      create_terminal_window(windowClass.mainWindow, {
        status: 'batchRunOrders',
        selectList: res.batchData,
      });
    }
    res.json({
      status: 1,
      code: 200,
      data: 'ok',
    });
  } else {
    res.json({
      status: 0,
      code: 200,
      data: '项目id未传入',
    });
  }


})
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
      parsePackageStr(data.projectData.path)
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
