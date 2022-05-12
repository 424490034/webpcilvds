/**
 * @file electron对外提供的服务接口
 */
const express = require('express');
const path = require('path');
const testRouter = require('./routes/test');
const router = express.Router();
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const {windowClass} = require('./mainWindow');

export function openServe(mainWindow: any) {
  windowClass.setMainWindow(mainWindow)
  const app = express();
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'pug');
  app.use(function (req: any, res: any, next: any) {
    res.set('Access-Control-Allow-Origin', '*');
    res.set(
      'Access-Control-Allow-Headers',
      'Content-Type,X-Requested-With, auth-token'
    );
    next();
  });
  app.use(logger('dev'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, 'public')));
  // 注册路由
  app.use('/api', testRouter);
  // 注册端口
  app.listen(12580, () => console.log('12580!'));
}
