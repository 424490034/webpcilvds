import React from 'react';
import { Router, Route, Switch, Redirect } from 'dva/router';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import Routes from 'config/router';
import CusRouter from './CusRouter';
const RouterConfig = ({ history }: any) => (
  <ConfigProvider locale={zhCN}>
    <Router history={history}>
      <Switch>
        <CusRouter />
        <Redirect path="/" to="/menu/home" />
      </Switch>
    </Router>
  </ConfigProvider>
);

export default RouterConfig;
